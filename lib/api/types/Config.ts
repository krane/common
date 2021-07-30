export type Registry = {
  url: string;
  username?: string;
  password?: string;
};

export type Config = {
  name: string;
  registry?: Registry;
  image: string;
  tag: string;
  alias?: string[];
  labels?: { [key: string]: string };
  env?: { [key: string]: string };
  secrets?: { [key: string]: string };
  ports?: { [key: string]: string };
  target_port?: string;
  volumes?: { [key: string]: string };
  command?: string;
  entrypoint?: string;
  scale?: number;
  secure?: boolean;
  internal?: boolean;
  rate_limit?: number;
};
