import { ServerRespond } from './DataStreamer';

export interface Row {
  ratio: number,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number | undefined,
  timestamp: Date,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]) {
    const priceABC = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price) / 2;
    const priceDEF = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price) / 2;
    const r = priceABC/priceDEF;
    const upper_bound = 1 + 0.1;
    const lower_bound = 1 - 0.1;
    const trigger_alert = (r > upper_bound || r < lower_bound) ? r : undefined;
      return {
        ratio: r,
        upper_bound: upper_bound,
        lower_bound: lower_bound,
        trigger_alert: trigger_alert,
        timestamp: serverResponds[0].timestamp > serverResponds[1].timestamp ? serverResponds[0].timestamp : serverResponds[1].timestamp
      };
    }
}
