export type Job = {
  id: string;
  namespace: string;
  type: string;
  status: Status;
  state: State;
  start_time_epoch: number;
  end_time_epoch: number;
  retry_policy: number;
};

export type Status = {
  execution_count: number;
  failure_count: number;
  failures: number;
};

export enum State {
  STARTED,
  COMPLETED,
}
