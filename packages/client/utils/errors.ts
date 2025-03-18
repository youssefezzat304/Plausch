import {
  ErrorTitle,
  ErrorMessage,
  HttpStatusCode,
} from "@shared/exceptions/exceptions";

export class ClientError extends Error {
  public readonly title: ErrorTitle | string;
  public readonly httpCode: HttpStatusCode;
  public readonly message: string;

  constructor(
    title: ErrorTitle | string,
    httpCode: HttpStatusCode,
    message: ErrorMessage | string,
  ) {
    super(message);
    this.title = title;
    this.httpCode = httpCode;
    this.message = message;
  }
}
