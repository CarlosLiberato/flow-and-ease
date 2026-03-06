import PageHeader from '@/components/PageHeader';
import ExpenseItem from '@/components/ExpenseItem';
import { mockPaidExpenses } from '@/data/mockData';

const PaidBills = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="Contas Pagas" subtitle="Histórico" />

      <div className="px-5">
        {mockPaidExpenses.map(expense => (
          <ExpenseItem key={expense.id} expense={expense} isPaid />
        ))}
      </div>
    </div>
  );
};

export default PaidBills;
