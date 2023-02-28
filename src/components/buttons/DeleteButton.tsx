import { TrashIcon } from "@heroicons/react/24/outline";

import { useDeleteModalStore } from "../../stores/deleteModalStore";

export const DeleteButton = () => {
  const setOpen = useDeleteModalStore((state) => state.setOpen);

  return(
    <button onClick={() => setOpen()}>
      <TrashIcon className="h-6 w-6 text-[#64738B] hover:text-[#3C50E0]" />
    </button>
  );
};
