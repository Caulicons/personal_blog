import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Bcrypt } from '../../../security/auth/bcrypt/brypt';
import { UpdateUserDto } from '../dto/user.update.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly BcryptServices: Bcrypt,
  ) {}

  async create(user: User) {
    const usernameAlreadyExist = await this.usersRepository.findOne({
      where: { username: user.username },
    });

    if (usernameAlreadyExist)
      throw new HttpException(
        'Username already exists',
        HttpStatus.BAD_REQUEST,
      );

    const emailAlreadyExist = await this.usersRepository.findOne({
      where: { email: user.email },
    });

    if (emailAlreadyExist)
      throw new HttpException('Email already register', HttpStatus.BAD_REQUEST);
    const encryptedPasswords = await this.BcryptServices.encrypt(user.password);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const userCreated = await this.usersRepository.save({
      ...user,
      password: encryptedPasswords,
    });

    return userCreated;
  }

  // (Find all users can be only used by admin users s)
  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find();

    return users;
  }
  // (Find all users can be only used by admin users)
  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: { posts: true },
    });

    if (!user) throw new HttpException(`User with id ${id} not found`, 404);

    return user;
  }

  // Can be used only by login users
  async findByUsername(username: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: {
        username,
      },
    });
  }

  // Can be used only by login users
  async findByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async update(user: UpdateUserDto): Promise<User> {
    const userExists = await this.usersRepository.findOne({
      where: { id: user.id },
    });
    if (!userExists)
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);

    // Check email
    const userEmail = await this.findByEmail(userExists.email);
    if (userEmail && userEmail.id !== userExists.id)
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);

    // Check username
    const userUsername = await this.findByUsername(userExists.username);
    if (userUsername && userUsername.id !== userExists.id)
      throw new HttpException(
        'Username already exists',
        HttpStatus.BAD_REQUEST,
      );

    // Encrypt password if exists
    if (user.password)
      user.password = await this.BcryptServices.encrypt(user.password);

    // update user
    return await this.usersRepository.save({ ...userExists, ...user });
  }

  async delete(user: User): Promise<{ statusCode: number; message: string }> {
    // Verify if the post exists
    const userExist = await this.findOne(user.id);
    if (!userExist)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return await this.usersRepository.delete({ id: user.id }).then(() => {
      return { statusCode: 200, message: 'User deleted' };
    });
  }
}
