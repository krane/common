import { Config, Container, Job } from "./";

export type Deployment = {
  config: Config;
  containers: Container[];
  jobs: Job[];
};

export enum DeploymentEventType {
  CONTAINER_CREATE = "CONTAINER_CREATE",
  CONTAINER_START = "CONTAINER_START",
  CONTAINER_STOP = "CONTAINER_STOP",
  CONTAINER_REMOVE = "CONTAINER_REMOVE",
  DEPLOYMENT_CLEANUP = "DEPLOYMENT_CLEANUP",
  DEPLOYMENT_DONE = "DEPLOYMENT_DONE",
  DEPLOYMENT_HEALTHCHECK = "DEPLOYMENT_HEALTHCHECK",
  DEPLOYMENT_SETUP = "DEPLOYMENT_SETUP",
  DEPLOYMENT_ERROR = "DEPLOYMENT_ERROR",
  PULL_IMAGE = "PULL_IMAGE",
}

export type DeploymentEvent = {
  job_id: string;
  deployment: string;
  type: DeploymentEventType;
  message: string;
};
