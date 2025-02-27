import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { StockQuotesService } from './stock-quotes.service';
import { StockQuotesController } from './stock-quotes.controller';

@Module({
  imports: [HttpModule],
  providers: [StockQuotesService],
  controllers: [StockQuotesController],
})
export class StockQuotesModule {}
