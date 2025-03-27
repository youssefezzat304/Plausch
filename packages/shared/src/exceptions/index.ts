export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
}

export enum ErrorTitle {
  ERROR = "Error",
  AUTH_FAILED = "Authentication Failed",
  EMAIL_USED = "Email Already Used",
  VALIDATION_ERROR = "Validation Error",
}

export enum ErrorMessage {
  GENERIC_ERROR = "Something went wrong. Please try again later.",
  WRONG_CRED = "Wrong email or password.",
  EMAIL_USED = "This email is already in use.",
  PASSWORD_MISMATCH = "Passwords do not match.",
  ACC_TOKEN = "Something went wrong, please refresh the page and try again.",
}
