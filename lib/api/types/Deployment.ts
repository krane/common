import { Config, Container, Job } from "./";

type DeploymentProps = {
  containers: Container[];
  jobs: Job[];
};

export type Deployment = DeploymentProps & Config;
