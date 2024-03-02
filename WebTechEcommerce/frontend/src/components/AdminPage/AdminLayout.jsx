import DashboardHeader from "./DashboardHeader";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";

const AdminLayout = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex h-screen overflow-hidden">
        {/* <div className="h-screen hidden lg:block fixed top-0 w-1/6"> */}
        <div className="fixed">
          <DashboardSidebar />
        </div>
        <main className="w-full pt-16 overflow-y-auto lg:ml-72 md:overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
