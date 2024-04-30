import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

@Injectable()
export class Bcrypt {
  async encrypt(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  async compare(password: string, secretPassword: string): Promise<boolean> {
    return bcrypt.compareSync(password, secretPassword);
  }
}
