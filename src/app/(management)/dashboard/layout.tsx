import React from "react";
import Sidebar from "../_ui/sidebar";
import { Background } from "../_ui/background";

const title = "Softwarefull Dashboard";

export const metadata = {
  title,
};

export const Layout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <>
      <div className="flex h-screen">
        <div className="w-1/10">
          <Sidebar />
        </div>
        <div className="flex flex-col flex-1">
          <main className={"flex-1 w-full mx-auto md:px-8 xl:px-0"}>
            <Background>{children}</Background>
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
