export interface Transaction {
    id: number;
    merchant: string;
    amount: number;
    date: Date;
    status: string;
    logo?: string;
  }
  
  export interface Bill {
    id: number;
    name: string;
    amount: number;
    dueDate: Date;
    category: string;
    logo?: string;
  }
  
  export interface Wallet {
    id: number;
    name: string;
    balance: number;
    type: string;
  }