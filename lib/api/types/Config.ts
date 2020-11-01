export type Config = {
  name: string;
  registry?: string;
  image: string;
  tag: string;
  alias?: string[];
  env?: { [key: string]: string };
  secrets?: { [key: string]: string };
  ports?: { [key: string]: string };
  volumes?: { [key: string]: string };
  command?: string[];
};
