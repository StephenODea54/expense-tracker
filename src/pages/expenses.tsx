import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'

import { api } from "../utils/api";
import { currencyFormatter } from "../utils/currencyFormatter";

import { useExpenseIdStore } from "../stores/expenseIdStore";
import { useDateFilterStore } from "../stores/dateFilterStore";
import { useDeleteModalStore } from "../stores/deleteModalStore";
import { useEditModalStore } from "../stores/editModalStore";

import { Layout } from "../components/Layout";
import { AddButton } from "../components/buttons/AddButton";
import { DeleteModal } from "../components/modals/DeleteModal";
import { EditModal } from "../components/modals/EditModal";
import { AddModal } from "../components/modals/AddModal";
import { DateSelector } from "../components/inputs/DateSelector";

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ')
};

const tableHeaders = [
  {
    id: 1,
    label: "Name",
  },
  {
    id: 2,
    label: "Amount",
  },
  {
    id: 3,
    label: "Due Date",
  },
  {
    id: 4,
    label: "Payment Status",
  },
  {
    id: 5,
    label: "Remaining Balance",
  },
  {
    id: 6,
    label: "",
  },
];

const determinePaidStatus = (isPaid: boolean): string => {
  if (isPaid) {
    return "inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800";
  } else {
    return "inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800"
  }
};

export default function Expenses() {
  const { isLoading, isError, data } = api.expenses.getAll.useQuery();

  const setExpenseId = useExpenseIdStore((state) => state.setId);
  const selectedDate = useDateFilterStore((state) => state.date);
  const setDeleteModalOpen = useDeleteModalStore((state) => state.setOpen);
  const setEditModalOpen = useEditModalStore((state) => state.setOpen);

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error... check log</div>

  const filteredData = data?.filter(expense => expense.dueDate.toISOString().slice(0, 7) === selectedDate);

  return(
    <Layout>
      <div className="mt-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-medium leading-6 text-gray-900">Expenses</h2>
          <div className="mt-10 shadow-lg rounded-md border border-gray-300 bg-white pt-6 px-5">
            <div className="flex justify-between mb-6">
              <DateSelector />
              <AddButton />
            </div>
            {/* Add Conditional Logic for a length of zero from date filter here */}

            {/* Expenses Table */}
            <div className="overflow-x-scroll">
              <div className="inline-block min-w-full border-b border-gray-200 align-middle">
                <table className="min-w-full">
                  <thead>
                    <tr className="border border-gray-200">
                      {tableHeaders.map(header => (
                        <th
                          className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                          scope="col"
                          key={header.id}
                        >
                          {header.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {filteredData?.map(expense => (
                      <tr key={expense.id}>
                        <td className="px-6 py-3 text-sm font-medium text-gray-500">
                          {expense.name}
                        </td>
                        <td className="px-6 py-3 text-sm font-medium text-gray-500">
                          {currencyFormatter.format(expense.amount)}
                        </td>
                        <td className="px-6 py-3 text-sm font-medium text-gray-500">
                          {expense.dueDate.toLocaleDateString()}
                        </td>
                        <td className="px-6 py-3 text-sm font-medium text-gray-500">
                          <span className={determinePaidStatus(expense.isPaid)}>
                            {expense.isPaid ? "Paid" : "Unpaid"}
                          </span>
                        </td>
                        <td className="px-6 py-3 text-sm font-medium text-gray-500">
                          {currencyFormatter.format(expense.remainingBalance)}
                        </td>
                        <td className="px-6 py-3 text-sm font-medium text-gray-500">
                        <div className="flex items-center">
                          <Menu as="div" className="relative ml-3">
                            <div>
                            <Menu.Button className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                              <span className="sr-only">Open options</span>
                              <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
                            </Menu.Button>
                            </div>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                  <Menu.Item>
                                    {({ active }) => (
                                      <a
                                        className={classNames(
                                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                          'block px-4 py-2 text-sm'
                                        )}
                                        onClick={() => {
                                          setExpenseId(expense.id);
                                          setEditModalOpen();
                                        }}
                                      >
                                        Edit
                                      </a>
                                    )}
                                  </Menu.Item>
                                  <Menu.Item>
                                    {({ active }) => (
                                      <a
                                        className={classNames(
                                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                          'block px-4 py-2 text-sm'
                                        )}
                                        onClick={() => {
                                          setExpenseId(expense.id);
                                          setDeleteModalOpen();
                                        }}
                                      >
                                        Delete
                                      </a>
                                    )}
                                  </Menu.Item>
                                </div>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          <AddModal />
          <DeleteModal />
          <EditModal />
        </div>
        </div>
      </div>
    </Layout>
  );
}
