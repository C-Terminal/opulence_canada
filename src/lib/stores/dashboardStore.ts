// src/lib/stores/dashboardStore.ts
import { writable, derived } from 'svelte/store';
import type { Transaction, Bill, Wallet } from '$lib/types';

// Initial demo data
export const transactionsStore = writable<Transaction[]>([
  { id: 1, merchant: 'Mailchimp', amount: -350, date: new Date(), status: 'hold', logo: '/logos/mailchimp.svg' },
  { id: 2, merchant: 'Atlassian', amount: -1469, date: new Date(Date.now() - 86400000 * 5), status: 'completed', logo: '/logos/atlassian.svg' },
  { id: 3, merchant: 'DigitalOcean', amount: -150, date: new Date(Date.now() - 86400000 * 7), status: 'completed', logo: '/logos/digitalocean.svg' }
]);

export const billsStore = writable<Bill[]>([
  { id: 1, name: 'Starlink', amount: 105, dueDate: new Date(Date.now() + 86400000 * 5), category: 'internet', logo: '/logos/starlink.svg' },
  { id: 2, name: 'Office', amount: 730, dueDate: new Date(Date.now() + 86400000 * 9), category: 'rent', logo: '/logos/office.svg' },
  { id: 3, name: 'Electricity', amount: 149, dueDate: new Date(Date.now() + 86400000 * 20), category: 'utilities', logo: '/logos/electricity.svg' }
]);

export const walletsStore = writable<Wallet[]>([
  { id: 1, name: 'Main Account', balance: 1636500, type: 'checking' },
  { id: 2, name: 'Savings', balance: 109795, type: 'savings' }
]);

// Derived stores for calculations
export const totalBalance = derived(walletsStore, ($wallets) => 
    $wallets.reduce((sum, wallet) => sum + wallet.balance, 0)
  );
  
  export const upcomingBillsTotal = derived(billsStore, ($bills) => 
    $bills.reduce((sum, bill) => sum + bill.amount, 0)
  );

  // For chart data
export const transactionHistory = writable([
    { date: '01 Mar', amount: 1520000 },
    { date: '03 Mar', amount: 1480000 },
    { date: '05 Mar', amount: 1550000 },
    { date: '07 Mar', amount: 1600000 },
    { date: '09 Mar', amount: 1580000 },
    { date: '12 Mar', amount: 1650000 },
    { date: '15 Mar', amount: 1620000 },
    { date: '18 Mar', amount: 1700000 },
    { date: '21 Mar', amount: 1620000 },
    { date: '24 Mar', amount: 1580000 },
    { date: '27 Mar', amount: 1630000 },
    { date: '30 Mar', amount: 1660000 },
    { date: '02 Apr', amount: 1636500 }
  ]);


  //TODO: implement actions to update stores
  // Actions to update stores - would connect to API/DB in a real app
export async function fetchTransactions() {
    // Would normally fetch from API with:
    // const response = await fetch('/api/transactions');
    // const data = await response.json();
    // transactionsStore.set(data);
  }
  
  export async function fetchBills() {
    // Similar to above
  }
  
  export async function fetchWallets() {
    // Similar to above
  }