import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const resultincome = this.transactions.filter(
      item => item.type === 'income',
    );
    const resultoutcome = this.transactions.filter(
      item => item.type === 'outcome',
    );

    const income = resultincome.reduce((acc, curr) => acc + curr.value, 0);
    const outcome = resultoutcome.reduce((acc, curr) => acc + curr.value, 0);

    const balance: Balance = {
      income,
      outcome,
      total: income - outcome,
    };
    return balance;
  }

  public create({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
