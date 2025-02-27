import { Controller, Get, Query } from '@nestjs/common';
import { StockQuotesService, StockQuote } from './stock-quotes.service';

@Controller('stock-quotes')
export class StockQuotesController {
  constructor(private readonly stockQuotesService: StockQuotesService) {}

  @Get()
  async getStock(@Query('symbol') symbol: string): Promise<StockQuote> {
    return this.stockQuotesService.getStockQuote(symbol);
  }
}
