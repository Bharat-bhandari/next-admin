import { redirect } from "next/navigation";
import AdminSidebar from "@/components/AdminPage/AdminSideBar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

const AdminLayout = async ({ children }) => {
  // const session = await getServerSession(authOptions);

  // console.log(session);

  // if (session.user.role !== "admin") {
  //   return <div>You are not admin</div>;
  // }

  return (
    <>
      <div className="font-sans text-black bg-white">
        <AdminSidebar>{children}</AdminSidebar>
      </div>
    </>
  );
};

export default AdminLayout;
