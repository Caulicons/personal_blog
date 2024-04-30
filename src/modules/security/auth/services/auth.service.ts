import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../../../entities/user/services/user.service';
import { Bcrypt } from '../bcrypt/brypt';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from '../dto/user.login.dto';
import { User } from '../../../entities/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly bcrypt: Bcrypt,
    private readonly jwtService: JwtService,
  ) {}

  async login(userInput: UserLoginDto): Promise<{ access_token: string }> {
    const user = await this.valideUser(userInput);

    const payload = {
      id: user.id,
      username: user.username,
    };

    return {
      access_token: `Bearer ${this.jwtService.sign(payload)}`,
    };
  }

  private async valideUser(userInput: UserLoginDto): Promise<User> {
    const user = await this.userService.findByEmail(userInput.email);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const isValidPassword = await this.bcrypt.compare(
      userInput.password,
      user.password,
    );
    if (!isValidPassword)
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);

    return user;
  }
}
