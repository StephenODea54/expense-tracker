import { Layout } from "../components/Layout";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";
import { ArrowTrendingDownIcon } from "@heroicons/react/24/outline";
import { HomeModernIcon } from "@heroicons/react/24/solid";

import { api } from "../utils/api";
import { add, format, isBefore, isAfter } from "date-fns";
import { currencyFormatter } from "../utils/currencyFormatter";

const Home = () => {
  const { isLoading, isError, data } = api.expenses.getAll.useQuery();

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error... go yell at your husband.</div>

  const today = format(new Date(), "LLLL yyyy");
  
  const selectedDate = new Date().toISOString().slice(0, 7);

  const dateFilter = data?.filter(expense => expense.dueDate.toISOString().slice(0, 7) === selectedDate);

  const totalIncome = 7560;

  return (
    <Layout>
      <div className="py-6 px-4">
      <h2 className="font-semibold text-3xl text-slate-900">Summary for {today}</h2>
        <div className="grid grid-cols-4 gap-x-8 mt-4">
          <div className="shadow-lg rounded-sm border border-gray-300 bg-white py-6 px-7 w-full">
            <div className="flex items-center justify-center w-11 h-11 rounded-full bg-[#F0F2F6]">
              <ArrowTrendingUpIcon
                color={"#3E50E0"}
                width={16}
                height={16}
              />
            </div>
            <div className="flex items-end justify-between mt-4">
              <div>
                <h4 className="font-bold text-xl text-slate-900">
                  {currencyFormatter.format(totalIncome)}
                </h4>
                <span className="font-medium text-sm text-[#64758B]">
                  Total Income
                </span>
              </div>
            </div>
          </div>
          <div className="shadow-lg rounded-sm border border-gray-300 bg-white py-6 px-7 w-full">
            <div className="flex items-center justify-center w-11 h-11 rounded-full bg-[#F0F2F6]">
              <ArrowTrendingDownIcon
                color={"#3E50E0"}
                width={16}
                height={16}
              />
            </div>
            <div className="flex items-end justify-between mt-4">
              <div>
                <h4 className="font-bold text-xl text-slate-900">
                  {dateFilter && currencyFormatter.format(dateFilter.reduce((acc, curVal) => (
                    acc + curVal.amount
                  ), 0))}
                </h4>
                <span className="font-medium text-sm text-[#64758B]">
                  Total Expenses
                </span>
              </div>
            </div>
          </div>
          <div className="shadow-lg rounded-sm border border-gray-300 bg-white py-6 px-7 w-full">
            <div className="flex items-center justify-center w-11 h-11 rounded-full bg-[#F0F2F6]">
              <HomeModernIcon
                color={"#3E50E0"}
                width={16}
                height={16}
              />
            </div>
            <div className="flex items-end justify-between mt-4">
              <div>
                <h4 className="font-bold text-xl text-slate-900">
                  {dateFilter && currencyFormatter.format(totalIncome/2 - dateFilter?.filter(expense => isBefore(expense.dueDate, add(new Date(today), { days: 14 })))
                    .reduce((acc, accVal) => (
                      acc + accVal.amount
                    ), 0))}
                </h4>
                <span className="font-medium text-sm text-[#64758B]">
                  Estimated First Half Surplus
                </span>
              </div>
            </div>
          </div>
          <div className="shadow-lg rounded-sm border border-gray-300 bg-white py-6 px-7 w-full">
            <div className="flex items-center justify-center w-11 h-11 rounded-full bg-[#F0F2F6]">
              <HomeModernIcon
                color={"#3E50E0"}
                width={16}
                height={16}
              />
            </div>
            <div className="flex items-end justify-between mt-4">
              <div>
                <h4 className="font-bold text-xl text-slate-900">
                  {dateFilter && currencyFormatter.format(totalIncome/2 - dateFilter.filter(expense => isAfter(expense.dueDate, add(new Date(today), { days: 14 })))
                    .reduce((acc, accVal) => (
                      acc + accVal.amount
                    ), 0))}
                </h4>
                <span className="font-medium text-sm text-[#64758B]">
                  Estimated Second Half Surplus
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
