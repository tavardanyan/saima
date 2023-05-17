export enum Methods {
  GET = 'get',
  POST = 'post'
}

export type Route = {
  method: Methods,
  url: string,
  handler: any;
  validator: any;
}

export type Response = {
  status?: number;
  message?: string;
  data?: any;
  errors?: any;
}

export enum VideoSources {
  Youtube = 'youtube',
  Coursera = 'coursera',
}

export type Video = {
  id?: string;
  url: string;
  source?: VideoSources;
  time: number;
}

export type ValidationErrorObject = { 
  where: string;
  message: string;
}