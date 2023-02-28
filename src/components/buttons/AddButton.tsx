import { useAddModalStore } from "../../stores/addModalStore";

export const AddButton = () => {
  const setOpen = useAddModalStore((state) => state.setOpen);

  return(
    <button
      onClick={() => setOpen()}
      className="text-white bg-[#3C50E0] hover:bg-blue-900 focus:ring-4 focus:ring-[#3C50E0] font-medium rounded-lg text-sm px-3 py-1.5"
    >
      Add Expense
    </button>
  );
};
