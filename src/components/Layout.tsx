import { Navbar } from "./navbar/Navbar";

import { Sidebar } from "./sidebar/Sidebar";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return(
    <main className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 relative overflow-x-hidden overflow-y-auto">
        <Navbar />
        {children}
      </div>
    </main>
  );
};
