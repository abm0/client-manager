export type ClientStatus = {
  id: number;
  name: string;
}

export type TransactionStatus = {
  id: number;
  name: string;
}

export type Client = {
  company: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  full_name: string;
  patronymic: string;
  phone: string;
  status: number;
  user: number;
}

export type Note = {
  content: string;
  id: number;
  client_id: number;
  created_at: string;
}

export type Transaction = {
  id: number;
  value: number;
  date: string;
  status: number;
}
