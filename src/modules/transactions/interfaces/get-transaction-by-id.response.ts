export interface GetTransactionByIdResponse {
  id:          number;
  type:        string;
  title:       string;
  description: string;
  amount:      number;
  createdAt:   Date;
  updatedAt:   Date;
  account:     Account;
  currency:    Currency;
}

export interface Account {
  id:        number;
  primary:   boolean;
  funds:     number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Currency {
  id:                  number;
  code:                string;
  name:                string;
  primary:             boolean;
  valueAgainstPrimary: number;
  createdAt:           Date;
  updatedAt:           Date;
}
