import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StockQuotesModule } from './stock-quotes/stock-quotes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    StockQuotesModule,
  ],
})
export class AppModule {}
