export type Response<T> = {
  success: boolean;
  code: number;
  data: T;
};

export type ResponseMany<T> = {
  success: boolean;
  code: number;
  data: T[];
};
