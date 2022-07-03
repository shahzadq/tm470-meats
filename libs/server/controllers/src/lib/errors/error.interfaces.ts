export interface IServerResponseError {
  message: string;
  description?: string;
  status: 400 | 401 | 404 | 405 | 500;
}
