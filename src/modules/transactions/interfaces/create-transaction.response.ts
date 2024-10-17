export interface CreateTransactionResponse {
  type:        string;
  title:       string;
  amount:      number;
  account:     number;
  currency:    number;
  user:        User;
  description: null;
  id:          number;
  createdAt:   Date;
  updatedAt:   Date;
}

export interface User {
  id:        number;
  username:  string;
  firstName: string;
  lastName:  string;
  email:     string;
  active:    boolean;
  country:   string;
  createdAt: Date;
  updatedAt: Date;
}
