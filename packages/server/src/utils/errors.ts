export class APIError extends Error {
  constructor(public status: number, public message: string) {
    super(message);
  }
}

export class MissingUserInput extends APIError {
  constructor(message = 'Missing required data') {
    super(422, message);
  }
}

export class FlagNotFoundError extends APIError {
  constructor(message = 'Specified flag not in manifest') {
    super(404, message);
  }
}

export class ConflictError extends APIError {
  constructor(message = 'Specified flag already exists') {
    super(409, message);
  }
}

export class AuthorizationError extends APIError {
  constructor(message = 'You are not authorized to access the requested resource') {
    super(401, message);
  }
}

export class BadUserInput extends APIError {
  constructor(message = 'Provided data does not matched the expected format') {
    super(422, message);
  }
}
