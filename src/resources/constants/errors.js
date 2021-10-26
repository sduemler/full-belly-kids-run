//Error codes from Firebase
export const EMAIL_EXISTS = 'auth/email-already-in-use';
export const AUTH_INTERAL_ERROR = 'auth/internal-error';
export const INVALID_PASSWORD = 'auth/invalid-password';
export const WRONG_PASSWORD = 'auth/wrong-password';
export const INVALID_EMAIL = 'auth/invalid-email';
export const WEAK_PASSWORD = 'auth/weak-password';
export const TOO_MANY_ATTEMPTS_TRY_LATER = 'auth/too-many-requests';

//Error Messages shown to users
export const EMAIL_EXISTS_MSG =
  'Someone is already using this email, please try a different one.';
export const AUTH_INTERAL_ERROR_MSG =
  'Something went wrong on our side. Please try again later.';
export const INVALID_PASSWORD_MSG = 'Login or password is invalid.';
export const WRONG_PASSWORD_MSG = 'Login or password is invalid.';
export const INVALID_EMAIL_MSG = 'Login or password is invalid.';
export const WEAK_PASSWORD_MSG =
  'Your password needs to be at least 6 characters.';
export const TOO_MANY_ATTEMPTS_TRY_LATER_MSG =
  'You have tried to log in too many times, please try again later.';

//Error map for all errors and messages
export const errorMap = {
  'auth/email-already-in-use':
    'Someone is already using this email, please try a different one.',
  'auth/internal-error':
    'Something went wrong on our side. Please try again later.',
  'auth/invalid-password': 'Login or password is invalid.',
  'auth/wrong-password': 'Login or password is invalid.',
  'auth/invalid-email': 'Please input a valid email addresss.',
  'auth/weak-password': 'Your password needs to be at least 6 characters.',
  'auth/too-many-requests':
    'You have tried to log in too many times, please try again later.',
};
