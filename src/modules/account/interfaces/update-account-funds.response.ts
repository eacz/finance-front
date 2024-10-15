export interface UpdateAccountFundsResponse {
  id:        number;
  funds:     number;
  updatedAt: Date;
  currency:  Currency;
}

export interface Currency {
  id: number;
}
