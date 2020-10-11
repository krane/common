import axios, { AxiosInstance } from "axios";
import {
  Config,
  Container,
  LoginResponse,
  Response,
  ResponseMany,
  Session,
} from "./types";

export class KraneClient {
  client: AxiosInstance;

  constructor(endpoint: string, token?: string) {
    if (!token) {
      throw new Error("Token not provided");
    }

    this.client = axios.create({
      baseURL: endpoint,
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async login() {
    return this.client
      .get<Response<LoginResponse>>("/login")
      .then((res) => res.data);
  }

  async auth(request_id: string, token: string) {
    return this.client
      .post<Response<Session>>("/auth", { request_id, token })
      .then((res) => res.data);
  }

  async getDeployments() {
    return this.client
      .get<ResponseMany<Config>>("/deployments")
      .then((res) => res.data);
  }

  async getContainers(deploymentName: string) {
    return this.client
      .get<ResponseMany<Container[]>>(
        `/deployments/${deploymentName}/containers`
      )
      .then((res) => res.data);
  }

  async getDeployment(deploymentName: string) {
    return this.client
      .get<Response<Config>>(`/deployments/${deploymentName}`)
      .then((res) => res.data);
  }
}
