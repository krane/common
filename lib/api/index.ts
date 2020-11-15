import { Secret } from "./types/Secret";
import axios, { AxiosInstance } from "axios";
import { Config, Container, LoginResponse, Session } from "./types";
import { KraneApiException } from "./exceptions";

export class KraneClient {
  private client: AxiosInstance;

  constructor(endpoint: string, token?: string) {
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

  async getDeployments() {
    const path = "/deployments";
    const { data } = await this.client.get<Config[]>(path);
    return data;
  }

  async getContainers(deploymentName: string) {
    const path = `/deployments/${deploymentName}/containers`;
    const { data } = await this.client.get<Container[]>(path);
    return data;
  }

  async getDeployment(deploymentName: string) {
    const path = `/deployments/${deploymentName}`;
    const { data } = await this.client.get<Config>(path);
    return data;
  }

  async applyDeployment(config: Config) {
    const path = "/deployments";
    const { status } = await this.client.post(path, config);
    if (status != 202) {
      throw new KraneApiException("Unable to apply deployment");
    }
  }

  async deleteDeployment(deploymentName: string) {
    const path = `/deployments/${deploymentName}`;
    const { status } = await this.client.delete(path);

    if (status != 202) {
      throw new KraneApiException("Unable to delete deployment");
    }
  }

  async addSecret(deploymentName: string, key: string, value: string) {
    const path = `/secrets/${deploymentName}`;
    const { data } = await this.client.post<Secret>(path, { key, value });
    return data;
  }

  async deleteSecret(deploymentName: string, key: string) {
    const path = `/secrets/${deploymentName}/${key}`;
    const { status } = await this.client.delete(path);

    if (status != 200) {
      throw new KraneApiException("Unable to delete secret");
    }
  }

  async getSecrets(deploymentName: string) {
    const path = `/secrets/${deploymentName}`;
    const { data } = await this.client.get<Secret[]>(path);
    return data;
  }
}
