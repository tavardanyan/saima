export enum Methods {
  GET = 'get',
  POST = 'post'
}

export type Route = {
  method: Methods,
  url: string,
  handler: any;
}

export type Response = {
  code?: number;
  message?: string;
  data?: any;
  errors?: any;
}
