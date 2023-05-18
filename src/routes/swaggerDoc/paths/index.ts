import { generateOtp, login } from './users';

const paths = {
  '/services/generate-otp': {
    post: generateOtp,
  },
  '/services/login': {
    post: login,
  },
};

export default paths;
