import { Config, Container, Job } from "./";

export type Deployment = {
  config: Config;
  containers: Container[];
  jobs: Job[];
};

export enum DeploymentEventType {
  DEPLOYMENT_CONTAINER_CREATE = "DEPLOYMENT_CONTAINER_CREATE",
  DEPLOYMENT_CONTAINER_START = "DEPLOYMENT_CONTAINER_START",
  DEPLOYMENT_CLEANUP = "DEPLOYMENT_CLEANUP",
  DEPLOYMENT_DONE = "DEPLOYMENT_DONE",
  DEPLOYMENT_HEALTHCHECK = "DEPLOYMENT_HEALTHCHECK",
  DEPLOYMENT_SETUP = "DEPLOYMENT_SETUP",
  DEPLOYMENT_PULL_IMAGE = "DEPLOYMENT_PULL_IMAGE",
  DEPLOYMENT_ERROR = "DEPLOYMENT_ERROR",
}

export type DeploymentEvent = {
  job_id: string;
  deployment: string;
  type: DeploymentEventType;
  message: string;
};

export interface DeploymentEventHandlers {
  onContainerCreate: (event: DeploymentEvent) => void;
  onContainerStart: (event: DeploymentEvent) => void;
  onCleanup: (event: DeploymentEvent) => void;
  onDone: (event: DeploymentEvent) => void;
  onHealtcheck: (event: DeploymentEvent) => void;
  onSetup: (event: DeploymentEvent) => void;
  onPullImage: (event: DeploymentEvent) => void;
  onError: (event: DeploymentEvent) => void;
  close: () => void;
}
