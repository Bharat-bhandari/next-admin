import Nav from "@/components/HomePage/Nav";

const AdminLayout = async ({ children }) => {
  return (
    <div className="text-black">
      <Nav />
      {children}
    </div>
  );
};

export default AdminLayout;
