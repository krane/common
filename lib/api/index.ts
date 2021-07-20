import axios, { AxiosInstance } from "axios";
import { KraneApiException } from "./exceptions";
import {
  Config,
  Container,
  Deployment,
  DeploymentEvent,
  DeploymentEventType,
  Job,
  LoginResponse,
  Secret,
  Session,
} from "./types";

const WebSocket = require("ws");

export class KraneClient {
  private client: AxiosInstance;
  private endpoint: string;
  private token?: string;

  constructor(endpoint: string, token?: string) {
    this.endpoint = endpoint;
    this.token = token;
    this.client = axios.create({
      baseURL: endpoint,
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async login() {
    const path = "/login";
    const { data } = await this.client.get<LoginResponse>(path);
    return data;
  }

  async auth(request_id: string, token: string) {
    const path = "/auth";
    const body = { request_id, token };
    const { data } = await this.client.post<Session>(path, body);
    return data;
  }

  async getSessions() {
    const path = "/sessions";
    const { data } = await this.client.get<Session[]>(path);
    return data;
  }

  async createSession(user: string) {
    const path = `/sessions?user=${user}`;
    const { data } = await this.client.post<Session>(path);
    return data;
  }

  async deleteSession(sessionId: string) {
    const path = `/sessions/${sessionId}`;
    const { status } = await this.client.delete(path);

    if (status != 200) {
      throw new KraneApiException("Unable to delete session");
    }
  }

  async getDeployment(deployment: string) {
    const path = `/deployments/${deployment}`;
    const { data } = await this.client.get<Deployment>(path);
    return data;
  }

  async getDeployments() {
    const path = "/deployments";
    const { data } = await this.client.get<Deployment[]>(path);
    return data;
  }

  async saveDeployment(config: Config) {
    const path = "/deployments";
    const { status } = await this.client.post<Config>(path, config);

    if (status != 200) {
      throw new KraneApiException("Unable to save deployment");
    }
  }

  async deleteDeployment(deployment: string) {
    const path = `/deployments/${deployment}`;
    const { status } = await this.client.delete(path);

    if (status != 202) {
      throw new KraneApiException("Unable to delete deployment");
    }
  }

  async runDeployment(deployment: string) {
    const path = `/deployments/${deployment}`;
    const { status } = await this.client.post(path);

    if (status != 202) {
      throw new KraneApiException("Unable to run deployment");
    }
  }

  async startDeployment(deployment: string) {
    const path = `/deployments/${deployment}/containers/start`;
    const { status } = await this.client.post(path);

    if (status != 202) {
      throw new KraneApiException("Unable to start deployment");
    }
  }

  async stopDeployment(deployment: string) {
    const path = `/deployments/${deployment}/containers/stop`;
    const { status } = await this.client.post(path);

    if (status != 202) {
      throw new KraneApiException("Unable to stop deployment");
    }
  }

  async restartDeployment(deployment: string) {
    const path = `/deployments/${deployment}/containers/restart`;
    const { status } = await this.client.post(path);

    if (status != 202) {
      throw new KraneApiException("Unable to restart deployment");
    }
  }

  async getContainers(deployment: string) {
    const path = `/deployments/${deployment}/containers`;
    const { data } = await this.client.get<Container[]>(path);
    return data;
  }

  async getSecrets(deployment: string) {
    const path = `/secrets/${deployment}`;
    const { data } = await this.client.get<Secret[]>(path);
    return data;
  }

  async addSecret(deployment: string, key: string, value: string) {
    const path = `/secrets/${deployment}`;
    const { data } = await this.client.post<Secret>(path, { key, value });
    return data;
  }

  async deleteSecret(deployment: string, key: string) {
    const path = `/secrets/${deployment}/${key}`;
    const { status } = await this.client.delete(path);

    if (status != 200) {
      throw new KraneApiException("Unable to delete secret");
    }
  }

  async getJobs(deployment: string) {
    const path = `/jobs/${deployment}`;
    const { data } = await this.client.get<Job[]>(path);
    return data;
  }

  async getJobById(deployment: string, jobId: string) {
    const path = `/jobs/${deployment}/${jobId}`;
    const { data } = await this.client.get<Job>(path);
    return data;
  }

  subscribeToDeploymentEvents(
    deployment: string,
    eventHandler: {
      [key in DeploymentEventType]?: (
        event: DeploymentEvent,
        stopListening: () => void
      ) => void;
    },
    onError?: (event: Event) => void
  ) {
    const wsEndpoint = this.endpoint.replace(/(http)(s)?\:\/\//, "ws$2://");
    const ws: WebSocket = new WebSocket(
      `${wsEndpoint}/ws/deployments/${deployment}/events`,
      {
        headers: { Authorization: `Bearer ${this.token}` },
      }
    );

    ws.onerror = (event: Event) => {
      onError && onError(event);
      ws.close();
    };

    ws.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data) as DeploymentEvent;
      switch (data.type) {
        case DeploymentEventType.CONTAINER_CREATE:
          eventHandler.CONTAINER_CREATE &&
            eventHandler.CONTAINER_CREATE(data, () => ws.close());
          break;
        case DeploymentEventType.CONTAINER_START:
          eventHandler.CONTAINER_START &&
            eventHandler.CONTAINER_START(data, () => ws.close());
          break;
        case DeploymentEventType.DEPLOYMENT_CLEANUP:
          eventHandler.DEPLOYMENT_CLEANUP &&
            eventHandler.DEPLOYMENT_CLEANUP(data, () => ws.close());
          break;
        case DeploymentEventType.DEPLOYMENT_DONE:
          eventHandler.DEPLOYMENT_DONE &&
            eventHandler.DEPLOYMENT_DONE(data, () => ws.close());
          break;
        case DeploymentEventType.DEPLOYMENT_HEALTHCHECK:
          eventHandler.DEPLOYMENT_HEALTHCHECK &&
            eventHandler.DEPLOYMENT_HEALTHCHECK(data, () => ws.close());
          break;
        case DeploymentEventType.DEPLOYMENT_SETUP:
          eventHandler.DEPLOYMENT_SETUP &&
            eventHandler.DEPLOYMENT_SETUP(data, () => ws.close());
          break;
        case DeploymentEventType.PULL_IMAGE:
          eventHandler.PULL_IMAGE &&
            eventHandler.PULL_IMAGE(data, () => ws.close());
          break;
        case DeploymentEventType.DEPLOYMENT_ERROR:
          eventHandler.DEPLOYMENT_ERROR &&
            eventHandler.DEPLOYMENT_ERROR(data, () => ws.close());
          break;
      }
    };
  }

  subscribeToDeploymentLogs(deployment: string): WebSocket {
    const wsEndpoint = this.endpoint.replace(/(http)(s)?\:\/\//, "ws$2://");
    return new WebSocket(`${wsEndpoint}/ws/deployments/${deployment}/logs`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  subscribeToContainerLogs(container: string): WebSocket {
    const wsEndpoint = this.endpoint.replace(/(http)(s)?\:\/\//, "ws$2://");
    return new WebSocket(`${wsEndpoint}/ws/containers/${container}/logs`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }
}
