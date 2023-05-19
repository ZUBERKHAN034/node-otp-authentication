import type { CreateUser, Login } from '../types/request/user';
import { CodeRepository, UserRepository } from '../db/repositories';
import { ServiceReturnVal } from '../types/common';
import { RespError } from '../lib/wr_response';
import { IUser } from '../db/models/user';
import jwt from 'jsonwebtoken';
import utility from '../lib/utility';
import constants from '../common/constants';
import moment from 'moment';
import Emailer from '../common/emailer';

export default class UserService {
  private userRepo = new UserRepository();
  private emailer = new Emailer(process.env.SEND_IN_BLUE_API_KEY, {
    name: constants.SEND_IN_BLUE.SENDER_NAME,
    email: constants.SEND_IN_BLUE.SENDER_EMAIL,
  });

  /**
   * Function for generate OTP for users
   *
   * @param {CreateUser}
   * @returns {ServiceReturnVal}
   */
  public async generateOtp(params: CreateUser): Promise<ServiceReturnVal<string>> {
    const returnVal: ServiceReturnVal<string> = {};
    try {
      const codeRepo = new CodeRepository();
      let user = await this.userRepo.findOne({ email: params.email });

      if (utility.isEmpty(user)) {
        const newUserParams = {
          username: params.email.split('@')[0] as string,
          email: params.email,
        } as IUser;

        user = await this.userRepo.create(newUserParams);
      }

      const code = await codeRepo.findOne({ email: user.email });

      if (!utility.isEmpty(code)) {
        const createdTime = moment.utc(code.createdAt);
        const currentTime = moment().utc();

        const diffInTime = currentTime.diff(createdTime, 'minutes');
        const expiresIn = constants.ENUMS.HASH_EXPIRES_IN.OTP_REQUEST_EXPIRY;

        if (diffInTime <= expiresIn) {
          returnVal.error = new RespError(constants.RESP_ERR_CODES.ERR_429, constants.ERROR_MESSAGES.OTP_REQUEST_LIMIT);
          return returnVal;
        }
      }

      // send mail to verify account
      await codeRepo.deactivateOldCodes(user.email, constants.ENUMS.HASH_TYPES.CREATE_NEW_ACCT);

      const otp = utility.generateOTP();
      await codeRepo.add(otp, constants.ENUMS.HASH_TYPES.CREATE_NEW_ACCT, undefined, user.email);

      const varsToReplace = { OTP_CODE: otp, USERNAME: user.username };
      const otpEmailHtml = this.emailer.renderEmailTemplate('otp_email', varsToReplace, 'email-templates');
      await this.emailer.sendEmail(
        user.email,
        `One-Time Password for ${constants.SEND_IN_BLUE.SENDER_NAME} account`,
        otpEmailHtml
      );

      returnVal.data = constants.SUCCESS_MESSAGES.OTP_EMAIL_SEND;
    } catch (error) {
      returnVal.error = new RespError(constants.RESP_ERR_CODES.ERR_500, error.message);
    }
    return returnVal;
  }

  /**
   * Function for login with email and OTP (one-time-password)
   *
   * @param {Login}
   * @returns {ServiceReturnVal}
   */
  public async login(params: Login): Promise<ServiceReturnVal<object>> {
    const returnVal: ServiceReturnVal<object> = {};
    try {
      const codeRepo = new CodeRepository();
      const user = await this.userRepo.findOne({ email: params.email });

      //If user exists
      if (!utility.isEmpty(user)) {
        if (user.blockedUntil !== null) {
          const createdTime = moment.utc(user.blockedUntil);
          const currentTime = moment().utc();

          const diffInTime = currentTime.diff(createdTime, 'minutes');
          const expiresIn = constants.ENUMS.HASH_EXPIRES_IN.USER_BLOCK_EXPIRY;

          if (diffInTime <= expiresIn) {
            returnVal.error = new RespError(
              constants.RESP_ERR_CODES.ERR_429,
              constants.ERROR_MESSAGES.USER_ACCOUNT_BLOCK
            );
            return returnVal;
          }
        }

        const code = await codeRepo.findOne({ code: params.otp });

        if (!utility.isEmpty(code)) {
          const createdTime = moment.utc(code.createdAt);
          const currentTime = moment().utc();

          const diffInTime = currentTime.diff(createdTime, 'minutes');
          const expiresIn = constants.ENUMS.HASH_EXPIRES_IN.OTP_DEFAULT_EXPIRY;

          if (diffInTime <= expiresIn) {
            user.wrongOtpAttempts = 0;
            user.blockedUntil = null;
            await user.save();

            const usr = {
              _id: user._id,
              username: user.username,
              email: user.email,
            };

            const token = jwt.sign(usr, process.env.JWT!, { expiresIn: '24h' });
            returnVal.data = { user, token: token };
          } else {
            returnVal.error = new RespError(constants.RESP_ERR_CODES.ERR_410, constants.ERROR_MESSAGES.OTP_EXPIRED);
          }

          // if expired remove otp
          await codeRepo.deactivateCode(params.otp);
          return returnVal;
        } else {
          returnVal.error = new RespError(constants.RESP_ERR_CODES.ERR_401, constants.ERROR_MESSAGES.INVALID_OTP);
        }

        // if invalid otp
        if (user.wrongOtpAttempts >= 5) {
          user.wrongOtpAttempts = 1;
          user.blockedUntil = null;
        } else {
          user.wrongOtpAttempts += 1;
          if (user.wrongOtpAttempts === 5) user.blockedUntil = new Date();
        }
        await user.save();
      } else {
        returnVal.error = new RespError(constants.RESP_ERR_CODES.ERR_404, constants.ERROR_MESSAGES.USER_NOT_FOUND);
      }
    } catch (error) {
      returnVal.error = new RespError(constants.RESP_ERR_CODES.ERR_500, error.message);
    }
    return returnVal;
  }
}
