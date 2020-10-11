export type Config = {
  name: string;
  alias: string[];
  registry?: string;
  image: string;
  tag: string;
  env: { [key: string]: string };
  secrets: { [key: string]: string };
  ports: { [key: string]: string };
  volumes: { [key: string]: string };
};
