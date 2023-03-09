import { Layout } from "../components/Layout";
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  HomeModernIcon,
} from "@heroicons/react/24/outline";

import { api } from "../utils/api";
import { add, format, isBefore, isAfter } from "date-fns";
import { currencyFormatter } from "../utils/currencyFormatter";

const Home = () => {
  const { isLoading, isError, data } = api.expenses.getAll.useQuery();

  const today = format(new Date(), "LLLL yyyy");
  
  const selectedDate = new Date().toISOString().slice(0, 7);

  const dateFilter = data?.filter(expense => expense.dueDate.toISOString().slice(0, 7) === selectedDate);

  const totalIncome = 7560;

  const totalExpenses = dateFilter && currencyFormatter.format(dateFilter.reduce((acc, curVal) => (
    acc + curVal.amount
  ), 0));

  const firstHalfSurplus = dateFilter && currencyFormatter.format(totalIncome/2 - dateFilter?.filter(expense => isBefore(expense.dueDate, add(new Date(today), { days: 14 })))
  .reduce((acc, accVal) => (
    acc + accVal.amount
  ), 0));

  const secondHalfSurplus = dateFilter && currencyFormatter.format(totalIncome/2 - dateFilter.filter(expense => isAfter(expense.dueDate, add(new Date(today), { days: 14 })))
  .reduce((acc, accVal) => (
    acc + accVal.amount
  ), 0));

  const cards = [
    { name: "Total Income", icon: ArrowTrendingUpIcon, amount: currencyFormatter.format(totalIncome) },
    { name: "Total Expenses", icon: ArrowTrendingDownIcon, amount: totalExpenses },
    { name: "Estimated First Half Surplus", icon: HomeModernIcon, amount: firstHalfSurplus },
    { name: "Estimated Second Half Surplus", icon: HomeModernIcon, amount: secondHalfSurplus },
  ];

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error... go yell at your husband.</div>

  return (
    <Layout>
      <div className="mt-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-medium leading-6 text-gray-900">Overview</h2>
          <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Card */}
            {cards.map((card) => (
              <div key={card.name} className="overflow-hidden rounded-lg bg-white shadow">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <card.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="truncate text-sm font-medium text-gray-500">{card.name}</dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">{card.amount}</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
