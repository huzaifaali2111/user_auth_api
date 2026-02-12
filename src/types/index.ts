export interface IAppError {
  statusCode: number;
  message: string;
  isOperational?: boolean;
}

export interface IJwtPayload {
  id: string;
  role: string;
}
