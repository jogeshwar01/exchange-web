import axios from "axios";
import { CreateOrder, Depth, KLine, Ticker, Trade, UserId } from "./types";

const BASE_URL = "https://exchange.jogeshwar.xyz/backend/api/v1";

export async function getDepth(market: string): Promise<Depth> {
  const response = await axios.get(`${BASE_URL}/depth?symbol=${market}`);
  return response.data;
}
export async function getTrades(market: string): Promise<Trade[]> {
  const response = await axios.get(`${BASE_URL}/trades?symbol=${market}`);
  return response.data;
}

export async function getKlines(
  market: string,
  interval: string,
  startTime: number
): Promise<KLine[]> {
  const response = await axios.get(
    `${BASE_URL}/klines?symbol=${market}&interval=${interval}&startTime=${startTime}`
  );
  const data: KLine[] = response.data;
  return data.sort((x, y) => (Number(x.end) < Number(y.end) ? -1 : 1));
}

export async function getTicker(market: string): Promise<Ticker> {
  const tickers = await getTickers();
  const ticker = tickers.find((t) => t.symbol === market);
  if (!ticker) {
    throw new Error(`No ticker found for ${market}`);
  }
  return ticker;
}

export async function getTickers(): Promise<Ticker[]> {
  const response = await axios.get(`${BASE_URL}/tickers`);
  return response.data;
}

export async function createOrder(order: CreateOrder): Promise<string> {
  const response = await axios.post(`${BASE_URL}/order`, {
    market: order.market,
    side: order.side,
    quantity: order.quantity,
    price: order.price,
    user_id: order.userId,
  });
  return response.data;
}

export async function createUser(): Promise<UserId> {
  const response = await axios.post(`${BASE_URL}/users`);
  return response.data;
}
