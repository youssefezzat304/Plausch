import { ErrorMessage, ErrorTitle, HttpStatusCode } from "@shared/exceptions";

export abstract class BaseError extends Error {
  public readonly title: ErrorTitle | string;
  public readonly httpCode: HttpStatusCode;
  public readonly message: string;

  constructor(
    title: ErrorTitle | string,
    httpCode: HttpStatusCode,
    message: ErrorMessage | string,
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.title = title;
    this.httpCode = httpCode;
    this.message = message;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends BaseError {
  constructor(message: ErrorMessage | string = ErrorMessage.GENERIC_ERROR) {
    super(ErrorTitle.VALIDATION_ERROR, HttpStatusCode.BAD_REQUEST, message);
  }
}

export class NotFoundError extends BaseError {
  constructor(message: ErrorMessage | string = "Resource not found.") {
    super(ErrorTitle.ERROR, HttpStatusCode.NOT_FOUND, message);
  }
}

export class AuthError extends BaseError {
  constructor(message: ErrorMessage | string = ErrorMessage.WRONG_CRED) {
    super(ErrorTitle.AUTH_FAILED, HttpStatusCode.UNAUTHORIZED, message);
  }
}

export class InternalServerError extends BaseError {
  constructor(message: ErrorMessage | string = ErrorMessage.GENERIC_ERROR) {
    super(ErrorTitle.ERROR, HttpStatusCode.INTERNAL_SERVER, message);
  }
}
