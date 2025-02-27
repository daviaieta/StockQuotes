import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

interface GlobalQuote {
  '01. symbol': string;
  '05. price': string;
  '06. volume': string;
  '07. latest trading day': string;
}

interface StockApiResponse {
  'Global Quote': GlobalQuote;
}

export interface StockQuote {
  symbol: string;
  price: string;
  volume: string;
  lastUpdated: string;
}

@Injectable()
export class StockQuotesService {
  private readonly API_URL = process.env.BASE_URL;
  private readonly API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

  constructor(private readonly httpService: HttpService) {}

  async getStockQuote(symbol: string): Promise<StockQuote> {
    try {
      const url = `${this.API_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${this.API_KEY}`;
      const response = await firstValueFrom(
        this.httpService.get<StockApiResponse>(url),
      );

      if (!response.data || !response.data['Global Quote']) {
        throw new HttpException('Stock not found', HttpStatus.NOT_FOUND);
      }

      return {
        symbol: response.data['Global Quote']['01. symbol'],
        price: response.data['Global Quote']['05. price'],
        volume: response.data['Global Quote']['06. volume'],
        lastUpdated: response.data['Global Quote']['07. latest trading day'],
      };
    } catch {
      throw new HttpException(
        'Error fetching stock data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getTrendQuote() {}
}
