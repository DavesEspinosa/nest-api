import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  signin() {
    return { message: 'Hello' };
  }
  signup() {
    return 'I am sign up';
  }
}
