import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { QrCodeIcon } from "@heroicons/react/24/outline";
import { CreditCardIcon } from "@heroicons/react/24/outline";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";

export const Sidebar = () => {
  const pathname = useRouter().pathname;

  const determineClassName = (href: string): string => {
    if (href === pathname) {
      return "bg-[#333A48]"
    } else {
      return "transition-all duration-300 hover:bg-[#333A48]"
    }

  };

  return(
    <aside className="flex flex-col absolute left-0 top-0 lg:static lg:translate-x-0 bg-[#1C2434] w-72 z-100">
      <div className="flex items-center gap-2 py-4 px-4 md:px-6 2xl:px-11">
        <Image
          src="/appLogo.png"
          width={48}
          height={48}
          alt="Logo"
        />
        <div className="text-white text-2xl">
          Budgeting App
        </div>
      </div>
      <div className="flex flex-col overflow-y-auto no-scrollbar">
        <nav className="px-4 lg:px-6 mt-12">
          <h3 className="font-semibold text-[#8695AB] mb-4 ml-4">
            MENU
          </h3>
          <ul className="flex flex-col gap-1.5 mb-6">
            <Link
              className={determineClassName("/")}
              href="/"
            >
              <li className="font-medium flex items-center gap-2.5 rounded-sm py-2 px-4 text-[#DDE3ED]">
                <QrCodeIcon height={24} width={24} />
                Dashboard
              </li>
            </Link>
            <Link
              className={determineClassName("/expenses")}
              href="/expenses"
            >
              <li className="font-medium flex items-center gap-2.5 rounded-sm py-2 px-4 text-[#DDE3ED]">
                <CreditCardIcon height={24} width={24} />
                Expenses
              </li>
            </Link>
            <Link
              className={determineClassName("/calendar")}
              href="/calendar"
            >
              <li className="font-medium flex items-center gap-2.5 rounded-sm py-2 px-4 text-[#DDE3ED]">
                <CalendarDaysIcon height={24} width={24} />
                Calendar
              </li>
            </Link>
          </ul>
        </nav>
      </div>
    </aside>
  );
};
