export interface IServerResponseError {
  message?: string;
  status: 400 | 401 | 404 | 405 | 500;
}
