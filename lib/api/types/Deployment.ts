import { Config, Container, Job } from "./";

type DeploymentProps = {
  containers: Container[];
  recent_activity: Job[];
};

export type Deployment = DeploymentProps & Config;
