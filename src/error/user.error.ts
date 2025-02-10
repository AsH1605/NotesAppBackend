import { ApiError } from "./ApiError";

// User Errors: 5XX
enum UserErrorCodes {
    USER_DOES_NOT_EXIST = 600, // User does not exist in the database, needs register
    USER_ALREADY_EXISTS = 601, // User with username/email already exists in the database, register not required
    USER_WRONG_PASSWORD = 602, // Provided password does not match the stored password
    USER_INVALID_EMAIL = 603, // email does not match required format
    USER_INVALID_PASSWORD = 604,  // password does not match required format
    MISSING_USER_ID_IN_HEADER = 605, // User_id is missing in the request headers
    UNKNOWN_USER_ERROR = 699, // Unknown error related to user
}

export const userAlreadyExistError = new ApiError(601, "User with username/email already exists in the database, register not required")
export const userDoesNotExistError = new ApiError(600, "User does not exist in the database, needs register")
export const userWrongPasswordError = new ApiError(602, "Provided password does not match the stored password")
export const userInvalidEmailError = new ApiError(603, "email does not match required format")
export const userInvalidPasswordError = new ApiError(604, "password does not match required format")
export const missingUserIdInHeaderError = new ApiError(605, "User_id is missing in the request headers")

export class UnknownUserError extends ApiError {
    constructor(
        message:string
    ) {
        super(UserErrorCodes.UNKNOWN_USER_ERROR,message)
    }
}