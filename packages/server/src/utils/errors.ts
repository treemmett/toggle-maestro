export class APIError extends Error {
  constructor(public message: string, public status: number) {
    super(message);
  }
}

export class MissingUserInput extends APIError {
  constructor(message = 'Missing required data', status = 422) {
    super(message, status);
  }
}

export class FlagNotFoundError extends APIError {
  constructor(message = 'Specified flag not in manifest', status = 404) {
    super(message, status);
  }
}

export class ConflictError extends APIError {
  constructor(message = 'Specified flag already exists', status = 409) {
    super(message, status);
  }
}

export class AuthorizationError extends APIError {
  constructor(message = 'You are not authorized to access the requested resource', status = 401) {
    super(message, status);
  }
}

export class BadUserInput extends APIError {
  constructor(message = 'Provided data does not matched the expected format', status = 422) {
    super(message, status);
  }
}

export class UnknownError extends APIError {
  constructor(message = 'Something went wrong', status = 500) {
    super(message, status);
  }
}
