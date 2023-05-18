const security = [
  {
    bearerAuth: [],
  },
];

const generateOtp = {
  tags: ['Users'],
  description: 'Generate OTP for User Account',
  operationId: 'generateOtp',
  requestBody: {
    content: {
      'application/x-www-form-urlencoded': {
        schema: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              example: 'john@gmail.com',
            },
          },
        },
      },
    },
    required: true,
  },
  responses: {
    '200': {
      description: 'one-time password (OTP) email sent successfully',
    },
    '400': {
      description: 'Validation error',
    },
    '429': {
      description: 'Please wait at least 1 minute before requesting a new OTP.',
    },
    '500': {
      description: 'Internal server error',
    },
  },
};

const login = {
  tags: ['Users'],
  description: 'Login user in the system',
  operationId: 'login',
  requestBody: {
    content: {
      'application/x-www-form-urlencoded': {
        schema: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              example: 'john@gmail.com',
            },
            otp: {
              type: 'number',
              example: 123456,
            },
          },
        },
      },
    },
    required: true,
  },
  responses: {
    '201': {
      description: 'User login successfully!',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              _id: {
                type: 'string',
                example: '6374e19dac314421985f43f5',
              },
              username: {
                type: 'string',
                example: 'john',
              },
              email: {
                type: 'string',
                example: 'john@gmail.com',
              },
              token: {
                type: 'string',
                example:
                  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiQmh1dmEiLCJsYXN0X25hbWUiOiJCaGF2aW4iLCJmdWxsX25hbWUiOiJCaHV2YSBCaGF2aW4iLCJlbWFpbCI6ImJoYXZpbi5iMkBnbWFpbC5jb20iLCJyb2xlX25hbWUiOiJ1c2VyIiwiaWF0IjoxNjY1NzQxNjE5LCJleHAiOjE2NjU4MjgwMTl9.CCi2PeTODj4hEDavdwbpC5WHxbe9NLRE79n9aQrciKw',
              },
            },
          },
        },
      },
    },
    '400': {
      description: 'Validation error',
    },
    '401': {
      description: 'Invalid OTP or Email',
    },
    '404': {
      description: 'User not exist.',
    },
    '410': {
      description: 'OTP expired',
    },
    '429': {
      description: 'Account Blocked: 5 wrong OTP attempts. Please try again after 1 hour.',
    },
    '500': {
      description: 'Internal server error',
    },
  },
};

export { generateOtp, login, security };
