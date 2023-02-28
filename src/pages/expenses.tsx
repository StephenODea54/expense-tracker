import Link from "next/link";

import { api } from "../utils/api";
import { currencyFormatter } from "../utils/currencyFormatter";

import { useExpenseIdStore } from "../stores/expenseIdStore";
import { useDateFilterStore } from "../stores/dateFilterStore";

import { Layout } from "../components/Layout";
import { EditButton } from "../components/buttons/EditButton";
import { DeleteButton } from "../components/buttons/DeleteButton";
import { AddButton } from "../components/buttons/AddButton";
import { DeleteModal } from "../components/modals/DeleteModal";
import { EditModal } from "../components/modals/EditModal";
import { AddModal } from "../components/modals/AddModal";
import { DateSelector } from "../components/inputs/DateSelector";

const tableHeaders = [
  "Name",
  "Due Date",
  "Payment Status",
  "Remaining Balance",
  "Actions",
];

const determinePaidStatus = (isPaid: boolean): string => {
  if (isPaid) {
    return "text-[#219654] bg-[#EAF4EE] inline-flex rounded-full py-1 px-3 text-sm font-medium";
  } else {
    return "text-[#D33F53] bg-[#FCEDEE] inline-flex rounded-full py-1 px-3 text-sm font-medium"
  }
};

export default function expenses() {
  const { isLoading, isError, data } = api.expenses.getAll.useQuery();
  const setExpenseId = useExpenseIdStore((state) => state.setId);
  const selectedDate = useDateFilterStore((state) => state.date);

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error... check log</div>

  const filteredData = data?.filter(expense => expense.dueDate.toISOString().slice(0, 7) === selectedDate);

  return(
    <Layout>
      <div className="w-full h-screen mx-auto p-4 md:p-6 2xl:p-10 bg-[#F1F5F9]">
        <div className="flex flex-col items-center sm:flex-row sm:justify-between gap-3 mb-6">
          <h2 className="font-semibold text-2xl text-black ">
            Expenses
          </h2>
          <nav>
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/">
                  Dashboard /
                </Link>
              </li>
              <li className="text-[#3C50E0]">Table</li>
            </ol>
          </nav>
        </div>
        <div className="shadow-lg rounded-sm border border-gray-300 bg-white pt-6 pb-1 px-5">
          <div className="flex justify-between mb-6">
            <DateSelector />
            <AddButton />
          </div>
          {/* Add Conditional Logic for a length of zero from date filter here */}
          <div className="shadow-default rounded-sm">
            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-100">
                    {tableHeaders.map((header, index) => (
                      <th
                        key={index}
                        className="py-4 px-4 font-medium text-black text-left xl:pl-5"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {filteredData?.map((expense, index) => (
                    <tr
                      key={expense.id}
                      onClick={() => setExpenseId(expense.id)}
                      className={filteredData.length === index + 1 ? "" : "border-b"}
                    >
                      <td className="py-3 px-5 sm:px-7.5">
                        <h5 className="font-medium text-black dark:text-white">
                          {expense.name}
                        </h5>
                        <p className="text-sm">
                          {currencyFormatter.format(expense.amount)}
                        </p>
                      </td>
                      <td className="py-3 px-5 sm:px-7.5">
                        <p className="text-black dark:text-white">
                          {expense.dueDate.toLocaleDateString()}
                        </p>
                      </td>
                      <td className="py-3 px-5 sm:px-7.5">
                        <p className={determinePaidStatus(expense.isPaid)}>
                          {expense.isPaid ? "Paid" : "Unpaid"}
                        </p>
                      </td>
                      <td className="py-3 px-5 sm:px-7.5">
                        <p className="text-sm">
                          {currencyFormatter.format(expense.remainingBalance)}
                        </p>
                      </td>
                      <td className="py-3 px-5 sm:px-7.5">
                        <EditButton />
                        <DeleteButton />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </div>
        </div>
        <AddModal />
        <DeleteModal />
        <EditModal />
      </div>
    </Layout>
  );
}
