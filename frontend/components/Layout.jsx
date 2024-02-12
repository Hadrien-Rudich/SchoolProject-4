"use client";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="w-full">
      <Header />
      <section className="flex w-full px-24 gap-x-20"></section>
      <div className="">{children}</div>
    </div>
  );
};

export default Layout;
