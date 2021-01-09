import { Config, Container, Job } from "./";

export type Deployment = {
  config: Config;
  containers: Container[];
  jobs: Job[];
};
