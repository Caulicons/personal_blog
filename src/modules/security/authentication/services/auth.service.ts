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

  async login(
    userInput: UserLoginDto,
  ): Promise<Omit<User, 'password'> & { access_token: string }> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.valideUser(userInput);

    const payload = {
      id: user.id,
      username: user.username,
      type: user.type,
    };

    return {
      ...user,
      access_token: this.jwtService.sign(payload),
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

  async profile(id: number) {
    if (!id)
      throw new HttpException('You are not logged in', HttpStatus.UNAUTHORIZED);

    return await this.userService.findOne(id);
  }
}
