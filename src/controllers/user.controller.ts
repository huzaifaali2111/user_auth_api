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
