import Sidebar from "./sidebar/index";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return(
    <>
      <Sidebar>
        {children}
      </Sidebar>
    </>
  );
};
