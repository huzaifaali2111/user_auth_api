import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { catchAsync } from '../utils/catchAsync';

const userService = new UserService();

export const register = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const { user, token } = await userService.registerUser(req.body);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
});

import { AppError } from '../middlewares/error.middleware';

export const getProfile = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const userId = req.user?.id;

  if (!userId) {
     throw new AppError('User ID not found in request', 400); 
  }
  
  const user = await userService.getUserProfile(userId);

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

export const login = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const { email, password } = req.body;
  const { user, token } = await userService.loginUser(email, password);

  res.status(200).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
});

export const getAllUsers = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  if (req.user?.role !== 'admin') {
    throw new AppError('Only admins can view all users', 403);
  }

  const users = await userService.getAllUsers();

  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
});

export const getUserById = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;
  const requesterId = req.user?.id;
  const requesterRole = req.user?.role;

  if (requesterRole !== 'admin' && requesterId !== id) {
    throw new AppError('You can only view your own profile or be an admin', 403);
  }

  const user = await userService.getUserById(id);

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

export const blockUser = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;
  const requesterId = req.user?.id;
  const requesterRole = req.user?.role;

  if (requesterRole !== 'admin' && requesterId !== id) {
    throw new AppError('You can only block your own account or be an admin', 403);
  }

  const user = await userService.blockUser(id);

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});
