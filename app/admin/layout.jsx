import AdminSidebar from "@/components/AdminPage/AdminSideBar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

const AdminLayout = async ({ children }) => {
  const session = await getServerSession(authOptions);

  const isAdmin = session?.user.role === "admin";

  if (!isAdmin) {
    throw new Error("You need to be an admin");
  }

  return (
    <>
      <div className="font-sans text-black bg-white">
        <AdminSidebar>{children}</AdminSidebar>
      </div>
    </>
  );
};

export default AdminLayout;
