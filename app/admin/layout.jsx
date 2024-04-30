import { redirect } from "next/navigation";
import AdminSidebar from "@/components/AdminPage/AdminSideBar";
import { getIsAdmin } from "@/utils/getIsAdmin";

const AdminLayout = async ({ children }) => {
  // const isAdmin = await getIsAdmin();

  // if (!isAdmin) return redirect("/");

  return (
    <>
      <div className="font-sans text-black bg-white">
        <AdminSidebar>{children}</AdminSidebar>
      </div>
    </>
  );
};

export default AdminLayout;
