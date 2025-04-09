//TODO: Change location of these files, move them to server db
import { db } from '../src/lib/server/db/index'; 
import { transactions, bills, wallets } from '../src/lib/server/db/schema';

async function seed() {
  console.log('🌱 Seeding database...');
  
  try {
    // Clear existing data
    await db.delete(transactions);
    await db.delete(bills);
    await db.delete(wallets);
    
    // Insert wallets
    console.log('Inserting wallets...');
    await db.insert(wallets).values([
      { name: 'Main Account', balance: '1636500', type: 'checking' },
      { name: 'Savings', balance: '109795', type: 'savings' }
      
    ]);
    
    // Insert transactions
    console.log('Inserting transactions...');
    await db.insert(transactions).values([
      { 
        merchant: 'Mailchimp', 
        amount: '-350', 
        date: new Date(), 
        status: 'hold',
        logo: '/logos/mailchimp.svg'
      },
      { 
        merchant: 'Atlassian', 
        amount: '-1469', 
        date: new Date(Date.now() - 86400000 * 5), 
        status: 'completed',
        logo: '/logos/atlassian.svg'
      },
      { 
        merchant: 'DigitalOcean', 
        amount: '-150', 
        date: new Date(Date.now() - 86400000 * 7), 
        status: 'completed',
        logo: '/logos/digitalocean.svg'
      }
    ]);
    
    // Insert bills
    console.log('Inserting bills...');
    await db.insert(bills).values([
      { 
        name: 'Starlink', 
        amount: '105', 
        dueDate: new Date(Date.now() + 86400000 * 5), 
        category: 'internet',
        logo: '/logos/starlink.svg'
      },
      { 
        name: 'Office', 
        amount: '730', 
        dueDate: new Date(Date.now() + 86400000 * 9), 
        category: 'rent',
        logo: '/logos/office.svg'
      },
      { 
        name: 'Electricity', 
        amount: '149', 
        dueDate: new Date(Date.now() + 86400000 * 20), 
        category: 'utilities',
        logo: '/logos/electricity.svg'
      }
    ]);
    
    console.log('✅ Seed completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    process.exit(0);
  }
}

seed();
