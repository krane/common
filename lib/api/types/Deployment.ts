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
