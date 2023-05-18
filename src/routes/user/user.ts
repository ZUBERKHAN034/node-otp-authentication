import { Router } from 'express';
import UserController from '../../controller/user';

export default class UserRoute {
  public router: Router;
  public controller = new UserController();

  constructor(router: Router) {
    this.router = router;
    this.routes();
  }

  routes() {
    this.router.post('/services/generate-otp', this.controller.generateOtp.bind(this.controller));
    this.router.post('/services/login', this.controller.login.bind(this.controller));
  }
}
