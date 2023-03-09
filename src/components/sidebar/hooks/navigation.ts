import { useRouter } from "next/router";

import {
  // BanknotesIcon,
  CalendarIcon,
  CreditCardIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";

export const useNavigation = () => {
  const pathname = useRouter().pathname;

  const navigation = [
    { name: "Dashboard", href: "/", icon: HomeIcon, current: "/" === pathname },
    { name: "Expenses", href: "/expenses", icon: CreditCardIcon, current: "/expenses" === pathname },
    // { name: "Income", href: "/income", icon: BanknotesIcon, current: "/income" === pathname},
    { name: "Calendar", href: "/calendar", icon: CalendarIcon, current: "/calendar" === pathname },
  ];

  return navigation;
};
