import { Secret } from "./Secret";

export declare type Container = {
  id: string;
  name: string;
  namespace: string;
  image: string;
  image_id: string;
  created_at: number;
  status: string; // ex: Up 17 hours
  state: ContainerState;
  labels: { [key: string]: string };
  env: { [key: string]: string };
  ports: Port[];
  volumes: Volume[];
  secrets: Secret[];
};
export declare type Port = {
  ip: string;
  type: string;
  host_port: string;
  container_port: string;
};
export declare type Volume = {
  host_volume: string;
  container_volume: string;
};

export declare enum ContainerState {
  Running = "running",
  Unknown = "unknown",
}
