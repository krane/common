export declare type Container = {
  id: string;
  namespace: string;
  name: string;
  network_id: string;
  image: string;
  image_id: string;
  created_at: number;
  labels: { [key: string]: string };
  state: ContainerState;
  ports: Port[];
  volumes: Volume[];
  command: string[];
  entrypoint: string[];
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

export declare type ContainerState = {
  status: string;
  running: string;
  paused: boolean;
  restarting: boolean;
  oom_killed: boolean;
  dead: boolean;
  pid: number;
  exit_code: number;
  error: string;
  started: string;
  finished_at: string;
};
