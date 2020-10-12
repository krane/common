export type Container = {
  id: string;
  name: string;
  namespace: string;
  image: string;
  image_id: string;
  created_at: number;
  status: string; // todo: map to enum
  state: string; // todo: map to enum
  labels: { [key: string]: string };
  env: { [key: string]: string };
  ports: Port[];
  volumes: Volume[];
  secrets: Secret[];
};

export type Port = {
  ip: string;
  type: string;
  host_port: string;
  containeR_port: string;
};

export type Volume = {
  host_volume: string;
  containeR_volume: string;
};

export type Secret = {
  namespace: string;
  key: string;
  value: string;
  alias: string;
};
