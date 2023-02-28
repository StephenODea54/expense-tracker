import { useDateFilterStore } from "../../stores/dateFilterStore";

export const DateSelector = () => {
  const currentSelectedDate = useDateFilterStore((state) => state.date);
  const setSelectedDate = useDateFilterStore((state) => state.setDate);

  return(
    <div className="relative max-w-sm">
      <input
        type="month"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#3C50E0] focus:border-[#3C50E0] block w-full px-3 py-1.5"
        defaultValue={currentSelectedDate}
        onChange={(event) => setSelectedDate(event.target.value)}
      />
    </div>
  );
};
