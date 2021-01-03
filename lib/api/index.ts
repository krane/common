import axios, { AxiosInstance } from "axios";

import { KraneApiException } from "./exceptions";
import {
  Config,
  Container,
  LoginResponse,
  Session,
  Secret,
  Job,
} from "./types";

const WebSocket = require("ws");

export class KraneClient {
  private client: AxiosInstance;
  private endpoint: string;

  constructor(endpoint: string, token?: string) {
    this.endpoint = endpoint;
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

  async getDeployment(deployment: string) {
    const path = `/deployments/${deployment}`;
    const { data } = await this.client.get<Config>(path);
    return data;
  }

  async getDeployments() {
    const path = "/deployments";
    const { data } = await this.client.get<Config[]>(path);
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

  async getDeploymentContainers(deployment: string) {
    const path = `/deployments/${deployment}/containers`;
    const { data } = await this.client.get<Container[]>(path);
    return data;
  }

  async getDeploymentSecrets(deployment: string) {
    const path = `/secrets/${deployment}`;
    const { data } = await this.client.get<Secret[]>(path);
    return data;
  }

  async addDeploymentSecret(deployment: string, key: string, value: string) {
    const path = `/secrets/${deployment}`;
    const { data } = await this.client.post<Secret>(path, { key, value });
    return data;
  }

  async deleteDeploymentSecret(deployment: string, key: string) {
    const path = `/secrets/${deployment}/${key}`;
    const { status } = await this.client.delete(path);

    if (status != 200) {
      throw new KraneApiException("Unable to delete secret");
    }
  }

  streamContainerLogs(container: string) {
    const wsEndpoint = this.endpoint.replace(/(http)(s)?\:\/\//, "ws$2://");
    return new WebSocket(`${wsEndpoint}/containers/${container}/logs`);
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
}
