import axios, { AxiosInstance } from "axios";
import { Config, Container, LoginResponse, Session } from "./types";

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

  async saveDeployment(config: Config) {
    const path = "/deployments";
    const { status } = await this.client.post(path, config);
    return status == 201 ? null : new Error("Unable to save deployment");
  }

  async deleteDeployment(deploymentName: string) {
    const path = `/deployments/${deploymentName}`;
    const { status } = await this.client.delete(path);
    return status == 201 ? null : new Error("Unable to delete deployment");
  }
}
