import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository';
import { IUser } from '../models/user.model';
import { AppError } from '../middlewares/error.middleware';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async registerUser(userData: any): Promise<{ user: IUser; token: string }> {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new AppError('Email already in use', 400);
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    const newUser = await this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });

const token = this.generateToken((newUser._id as unknown as string), newUser.role);

    return { user: newUser, token };
  }

  async getUserProfile(userId: string): Promise<IUser> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    return user;
  }

  async loginUser(email: string, password: string): Promise<{ user: IUser; token: string }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Invalid email or password', 400);
    }

    if (user.status === 'blocked') {
      throw new AppError('Your account has been blocked', 403);
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password!);
    if (!isPasswordCorrect) {
      throw new AppError('Invalid email or password', 400);
    }

    const token = this.generateToken((user._id as unknown as string), user.role);

    return { user, token };
  }

  async getAllUsers(): Promise<IUser[]> {
    const users = await this.userRepository.findAll();
    return users;
  }

  async getUserById(id: string): Promise<IUser> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    return user;
  }

  async blockUser(id: string): Promise<IUser> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const updatedUser = await this.userRepository.update(id, { status: 'blocked' });
    return updatedUser;
  }

  private generateToken(id: string, role: string): string {
    return jwt.sign({ id, role }, process.env.JWT_SECRET as string, {
      expiresIn: '1d',
    });
  }
}
