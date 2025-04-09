import { transactionsStore, billsStore, walletsStore } from './stores/dashboardStore';


export async function refreshTransactions() {
    try {
        const response = await fetch('/api/transactions');
        const data = await response.json();
        transactionsStore.set(data);
        return data;
    } catch (error) {
        console.error('Error refreshing transactions:', error);
        return null;
    }
}

export async function refreshBills() {
    try {
        const response = await fetch('/api/bills');
        const data = await response.json();
        billsStore.set(data);
        return data;
    } catch (error) {
        console.error('Error refreshing bills:', error);
        return null;
    }
}

export async function refreshWallets() {
    try {
        const response = await fetch('/api/wallets');
        const data = await response.json();
        walletsStore.set(data);
        return data;
    } catch (error) {
        console.error('Error refreshing wallets:', error);
        return null;
    }
}