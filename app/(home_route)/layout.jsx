import Nav from "@/components/HomePage/Nav";

const AdminLayout = async ({ children }) => {
  return (
    <div className="bg-black2">
      <Nav />
      {children}
    </div>
  );
};

export default AdminLayout;
