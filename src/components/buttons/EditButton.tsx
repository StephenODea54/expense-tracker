import { PencilSquareIcon } from "@heroicons/react/24/outline";

import { useEditModalStore } from "../../stores/editModalStore";

export const EditButton = () => {
  const setOpen = useEditModalStore((state) => state.setOpen);

  return(
    <button onClick={() => setOpen()}>
      <PencilSquareIcon className="h-6 w-6 text-[#64738B] hover:text-[#3C50E0]" />
    </button>
  );
};
