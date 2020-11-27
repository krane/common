export type Config = {
  name: string;
  registry?: string;
  image: string;
  tag: string;
  alias?: string[];
  env?: { [key: string]: string };
  secrets?: { [key: string]: string };
  ports?: string[];
  volumes?: { [key: string]: string };
  command?: string[];
  scale?: number;
  secured?: boolean;
};
