const constants = {
  ENUMS: {
    ORDER: {
      ASC: 'asc',
      DESC: 'desc',
    },

    ROLE: {
      USER: 'user',
      ADMIN: 'admin',
      BUYER: 'buyer',
      SELLER: 'seller',
    },

    HASH_TYPES: {
      CREATE_NEW_ACCT: 'CREATE_NEW_ACCT',
      RESET_PASSWORD: 'RESET_PASSWORD',
      UPDATE_EMAIL: 'UPDATE_EMAIL',
    },

    USER_GENDER: {
      FEMALE: 'female',
      MALE: 'male',
      OTHER: 'other',
    },

    LOGIN_TYPE: {
      GOOGLE: 'GOOGLE',
      CUSTOM: 'CUSTOM',
    },

    HASH_EXPIRES_IN: {
      OTP_DEFAULT_EXPIRY: 5,
      OTP_REQUEST_EXPIRY: 1,
      USER_BLOCK_EXPIRY: 60,
    },
  },

  RESP_ERR_CODES: {
    ERR_400: 400,
    ERR_401: 401,
    ERR_422: 422,
    ERR_500: 500,
    ERR_403: 403,
    ERR_404: 404,
    ERR_405: 405,
    ERR_409: 409,
    ERR_410: 410,
    ERR_412: 412,
    ERR_429: 429,
  },

  ERROR_MESSAGES: {
    USER_NOT_VERIFIED: 'Your account not verified',
    NOT_AUTHORIZED: 'You are not authorized',
    USER_NOT_FOUND: 'User not exist.',
    FILE_NOT_FOUND: 'File not found.',
    USER_ALREADY_EXISTS: 'User already exists',
    INVALID_OTP: 'Invalid OTP or Email',
    RECORD_NOT_FOUND: 'Record not found.',
    PASSWORD_NOT_MATCHED: 'Password not matched',
    SAME_OLD_PASSWORD: 'Same as old',
    LIMIT_REACHED: 'Limit reached',
    OTP_EXPIRED: 'OTP expired',
    INVALID_LINK: 'Invalid link',
    FORGOT_PASSWORD_REQUEST: `The account currently has no password set. We recommend requesting a 'Forgot Password'.`,
    OTP_REQUEST_LIMIT: 'Please wait at least 1 minute before requesting a new OTP.',
    USER_ACCOUNT_BLOCK: 'Account Blocked: 5 wrong OTP attempts. Please try again after 1 hour.',
  },

  SUCCESS_MESSAGES: {
    EMAIL_SEND: 'Email send successfully',
    OK: 'OK',
    REGISTERED: 'Registered',
    PASSWORD_CHANGED: 'Password changed successfully',
    PASSWORD_SET: 'Password set successfully',
    PASSWORD_RESET: 'Password reset successfully',
    EMAIL_UPDATED: 'Email updated successfully',
    OTP_EMAIL_SEND: 'one-time password (OTP) email sent successfully',
  },

  INS_EXCLUDE_COLS: ['created_at', 'updated_at', 'deleted_at'],

  DB_STATES: {
    0: 'DISCONNECTED',
    1: 'CONNECTED',
    2: 'CONNECTING',
    3: 'DISCONNECTING',
  },

  SEND_IN_BLUE: {
    SENDER_NAME: 'OTP Auth',
    SENDER_EMAIL: `no-reply@${process.env.SEND_IN_BLUE_DOMAIN}`,
  },
} as const;

export default constants;
