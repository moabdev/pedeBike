import { CartItem } from '@prisma/client';

export class CartDto {
  id: number;
  userId: number;
  items: CartItem[];
  createdAt: Date;
  updatedAt: Date;
}
