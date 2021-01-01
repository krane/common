export type Job = {
  id: string;
  deployment: string;
  type: string;
  status: JobStatus;
  state: JobState;
  start_time_epoch: number;
  end_time_epoch: number;
  retry_policy: number;
};

export type JobStatus = {
  execution_count: number;
  failure_count: number;
  failures: JobError[];
};

export enum JobState {
  STARTED,
  COMPLETED,
}

export type JobError = {
  execution: number;
  message: string;
};
