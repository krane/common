export type Job = {
  id: string;
  namespace: string;
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
  failures: number;
};

export enum JobState {
  STARTED,
  COMPLETED,
}
