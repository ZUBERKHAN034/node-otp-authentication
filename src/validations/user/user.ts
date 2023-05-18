import Joi, { ObjectSchema, PartialSchemaMap } from 'joi';
import Base from '../base';

export default class User extends Base {
  public getGenerateOtpVS(): ObjectSchema {
    const schema: PartialSchemaMap = {
      email: this.isEmail(true),
    };

    return Joi.object(schema);
  }

  public getLoginVS(): ObjectSchema {
    const schema: PartialSchemaMap = {
      email: this.isEmail(true),
      otp: this.isNumber(true),
    };
    return Joi.object(schema);
  }
}
