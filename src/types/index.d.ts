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

export interface Log {
  file: File;
}

export interface File {
  path: string;
}

export interface Event {
  original: string;
}

export interface Host {
  name: string;
}

export interface LogDocument {
  _id: string;

  log: Log;

  bytes: string;

  http_method: string;

  "@timestamp": string;

  message: string;

  remote_ip: string;

  timestamp: string;

  response_code: string;

  referrer: string;

  event: Event;

  user_agent: string;

  "@version": string;

  tags: string[];

  host: Host;

  http_version: string;
  request_path: string;
}
