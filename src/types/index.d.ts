
export interface User{
  _id?: string;
  email: string;
  role?: 'admin' | 'apache' | 'nginx';
}

export interface ErrorResponseBody{
  error?: string;
  message: string;
  statusCode: number;
}

export interface LoginResponse{
  message: string;
  user: User;
}
