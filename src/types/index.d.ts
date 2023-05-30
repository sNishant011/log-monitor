export interface User {
  _id?: string;
  email: string;
  role?: "admin" | "apache" | "nginx";
}

export interface ErrorResponseBody {
  error?: string;
  message: string;
  statusCode: number;
}

export interface LoginResponse {
  message: string;
  user: User;
}

export type valueCount = {
  count: number;
  value: string | null;
};

export type prettyResponse = {
  count: number;
  uniqueIPCount: number;
  mostCommonIP: valueCount[];
  mostCommonHTTPMethod: valueCount[];
  requestByTime: valueCount[];
  requestCountByStatus: valueCount[];
  requestCountByResponseSize: valueCount[];
  requestCountByUserAgent: valueCount[];
};
