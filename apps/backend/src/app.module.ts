import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BikesModule } from './bikes/bikes.module';
import { RentalsModule } from './rentals/rentals.module';
import { CartsModule } from './carts/carts.module';
import { CartItemsModule } from './cart-items/cart-items.module';
import { PaymentsModule } from './payments/payments.module';
import { ReservationsModule } from './reservations/reservations.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, BikesModule, RentalsModule, CartsModule, CartItemsModule, PaymentsModule, ReservationsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
