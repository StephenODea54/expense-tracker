import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CreditCardIcon } from "@heroicons/react/24/outline";

import { api } from "../../utils/api";

import { useAddModalStore } from "../../stores/addModalStore";
import { add } from "date-fns";

export const AddModal = () => {
  const open = useAddModalStore((state) => state.open);
  const setOpen = useAddModalStore((state) => state.setOpen);

  const utils = api.useContext();

  const mutation = api.expenses.postExpense.useMutation({
    onSettled() {
      utils.expenses.getAll.invalidate()
      .then(() => console.log("It Worked!"))
      .catch(err => console.log("It didn't work: ", err));
    },
  });

  const [inputs, setInputs] = useState({
    name: "",
    dueDate: "",
    amount: 0,
    isPaid: false,
    remainingBalance: 0,
  });

  const [frequency, setFrequency] = useState({
    annually: 0,
    monthly: 0,
    biweekly: 0,
    weekly: 0,
  });

  const [repeats, setRepeats] = useState(false);

  const [iterations, setIterations] = useState(1);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    for (let iteration = 0; iteration < iterations; iteration++) {
      const dates = add(new Date(inputs.dueDate), {
        years: frequency.annually * iteration,
        months: frequency.monthly * iteration,
        weeks: frequency.biweekly !== 0 ? frequency.biweekly * 2*iteration : frequency.weekly * iteration,
      });

      mutation.mutate({
        name: inputs.name,
        dueDate: dates,
        amount: inputs.amount,
        isPaid: inputs.isPaid,
        remainingBalance: inputs.remainingBalance,
      });
    }

    const resettedInputs = {
      name: "",
      dueDate: "",
      amount: 0,
      isPaid: false,
      remainingBalance: 0,
    };

    setInputs(resettedInputs);

    setFrequency({
      annually: 0,
      monthly: 0,
      biweekly: 0,
      weekly: 0,
    });
    setRepeats(false);
    setIterations(0);

    setOpen();
  };

  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <form onSubmit={handleSubmit}>
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#DEE2FA] sm:mx-0 sm:h-10 sm:w-10">
                        <CreditCardIcon className="h-6 w-6 text-[#3C50E0]" aria-hidden="true" />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                          Add New Expense
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Please fill out the following fields to add a new expense.
                          </p>
                        </div>
                      </div>
                    </div>
                      {/* Name */}
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 mt-4"
                        >
                          Name
                        </label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            className="block w-full rounded-md border border-gray-300 py-2 pl-3 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Name Here"
                            onChange={(event) => {
                              event.preventDefault();

                              const newInput = {
                                ...inputs,
                                name: event.target.value,
                              };

                              setInputs(newInput);
                            }}
                          />
                        </div>
                      </div>
                      {/* Amount */}
                      <div>
                        <label
                          htmlFor="amount"
                          className="block text-sm font-medium text-gray-700 mt-4"
                        >
                          Amount
                        </label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="text-gray-500 sm:text-sm">$</span>
                          </div>
                          <input
                            type="text"
                            name="amount"
                            id="amount"
                            className="block w-full rounded-md border border-gray-300 py-2 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="0.00"
                            onChange={(event) => {
                              event.preventDefault();

                              const newInput = {
                                ...inputs,
                                amount: parseInt(event.target.value),
                              };

                              setInputs(newInput);
                            }}
                          />
                        </div>
                      </div>
                      {/* Due Date */}
                      <div>
                        <label
                          htmlFor="dueDate"
                          className="block text-sm font-medium text-gray-700 mt-4"
                        >
                          Due Date
                        </label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                          <input
                            type="date"
                            name="dueDate"
                            id="dueDate"
                            className="block w-full rounded-md border border-gray-300 py-2 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            defaultValue="2023-01-01"
                            onChange={(event) => {
                              event.preventDefault();

                              const newInput = {
                                ...inputs,
                                dueDate: event.target.value,
                              };

                              setInputs(newInput);
                            }}
                          />
                        </div>
                      </div>
                      {/* Paid? */}
                      <div>
                        <label
                          htmlFor="paid"
                          className="block text-sm font-medium text-gray-700 mt-4"
                        >
                          Paid?
                        </label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                          <select
                            name="paid"
                            id="paid"
                            className="block w-full rounded-md border border-gray-300 py-2 pl-3 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            onChange={(event) => {
                              event.preventDefault();

                              const determinePaidStatus = (status: string) => {
                                let isPaid = false;

                                if (status === "No") {
                                  isPaid = false;
                                } else {
                                  isPaid = true;
                                }

                                return isPaid
                              };

                              const newInput = {
                                ...inputs,
                                isPaid: determinePaidStatus(event.target.value),
                              };

                              setInputs(newInput);
                            }}
                          >
                            <option defaultValue="false">
                              No
                            </option>
                            <option defaultValue="true">Yes</option>
                          </select>
                        </div>
                      </div>
                      {/* Remaining Balance */}
                      <div>
                        <label
                          htmlFor="remainingBalance"
                          className="block text-sm font-medium text-gray-700 mt-4"
                        >
                          Remaining Balance
                        </label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="text-gray-500 sm:text-sm">$</span>
                          </div>
                          <input
                            type="text"
                            name="remainingBalance"
                            id="remainingBalance"
                            className="block w-full rounded-md border border-gray-300 py-2 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="0.00"
                            onChange={(event) => {
                              event.preventDefault();

                              const newInput = {
                                ...inputs,
                                remainingBalance: parseInt(event.target.value),
                              };

                              setInputs(newInput);
                            }}
                          />
                        </div>
                      </div>
                      {/* Repeats? */}
                      <div>
                        <label
                          htmlFor="paid"
                          className="block text-sm font-medium text-gray-700 mt-4"
                        >
                          Repeats?
                        </label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                          <select
                            name="repeats"
                            id="repeats"
                            className="block w-full rounded-md border border-gray-300 py-2 pl-3 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            defaultValue={"No"}
                            onChange={(event) => {
                              event.preventDefault();
                              if (event.target.value === "Yes") {
                                setRepeats(true);
                              } else {
                                setRepeats(false);
                                setFrequency({
                                  annually: 0,
                                  biweekly: 0,
                                  monthly: 0,
                                  weekly: 0,
                                });
                                setIterations(1);
                              }
                            }}
                          >
                            <option value="No">
                              No
                            </option>
                            <option value="Yes">
                              Yes
                            </option>
                          </select>
                        </div>
                      </div>
                      {/* Repeat Duration */}
                      <div
                        className={repeats? "flex justify-between" : "hidden"}
                      >
                        <div>
                          <label
                            htmlFor="frequency"
                            className="block text-sm font-medium text-gray-700 mt-4"
                          >
                            Frequency
                          </label>
                          <div className="relative mt-1 rounded-md shadow-sm">
                            <select
                              name="frequency"
                              id="frequency"
                              className="block w-full rounded-md border border-gray-300 py-2 pl-3 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              defaultValue={"Weekly"}
                              onChange={(event) => {
                                event.preventDefault();
                                if (event.target.value === "Weekly") {
                                  setFrequency({
                                    annually: 0,
                                    biweekly: 0,
                                    monthly: 0,
                                    weekly: 1,
                                  });
                                } else if (event.target.value === "Bi-Weekly") {
                                  setFrequency({
                                    annually: 0,
                                    biweekly: 1,
                                    monthly: 0,
                                    weekly: 0,
                                  });
                                } else if (event.target.value === "Monthly") {
                                  setFrequency({
                                    annually: 0,
                                    biweekly: 0,
                                    monthly: 1,
                                    weekly: 0,
                                  });
                                } else {
                                  setFrequency({
                                    annually: 1,
                                    biweekly: 0,
                                    monthly: 0,
                                    weekly: 0,
                                  });
                                }
                              }}
                            >
                              <option value="Weekly">
                                Weekly
                              </option>
                              <option value="Bi-Weekly">
                                Bi-Weekly
                              </option>
                              <option value="Monthly">
                                Monthly
                              </option>
                              <option value="Annually">
                                Annually
                              </option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="iterations"
                            className="block text-sm font-medium text-gray-700 mt-4"
                          >
                            And for how long?
                          </label>
                          <div className="relative mt-1 rounded-md shadow-sm">
                            <input
                              type="number"
                              name="iterations"
                              id="iterations"
                              className="block w-full rounded-md border border-gray-300 py-2 pl-3 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              min={1}
                              defaultValue={1}
                              onChange={(event) => {
                                event.preventDefault();
                                setIterations(parseInt(event.target.value));
                              }}
                            />
                          </div>
                        </div>
                      </div>            
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-[#3C50E0] px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-900 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setOpen()}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </form>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
