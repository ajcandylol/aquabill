export interface RateSettings {
  ratePerUnit: number;
  taxPercentage: number;
  discountPercentage: number;
}

export interface BillEntry {
  id: string;
  date: string;
  period: string;
  consumption: number;
  amount: number;
}
