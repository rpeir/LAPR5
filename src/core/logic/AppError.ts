import { Result } from "./Result";
import { UseCaseError } from "./UseCaseError";

export namespace GenericAppError {
  export class UnexpectedError extends Result<UseCaseError> {
    public constructor (err: any) {
      super(false, {
        message: `An unexpected error occurred.`,
        error: err
      } as UseCaseError)
      console.log(`[AppError]: An unexpected error occurred`);
      console.error(err);
    }

    public static create (err: any): UnexpectedError {
      return new UnexpectedError(err);
    }
  }

  export interface IRequestError {
    statusCode: number;
    message : string;
    error: any;
  }

  export class InvalidRequestError extends Result<IRequestError> {

    public constructor (err: IRequestError) {
      super(false, err)
      console.log(`[AppError]: Invalid request.`);
      console.error(err);
    }

    public static create (err: IRequestError): InvalidRequestError {
      return new InvalidRequestError(err);
    }

  }
}
