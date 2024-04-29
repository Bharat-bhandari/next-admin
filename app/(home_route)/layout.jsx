import Nav from "@/components/HomePage/Nav";

const AdminLayout = async ({ children }) => {
  return (
    <div>
      <Nav />
      {children}
    </div>
  );
};

export default AdminLayout;
