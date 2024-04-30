import "@/assets/styles/globals.css";
import Nav from "@/components/HomePage/Nav";
import AuthProvider from "@/components/RestComponents/AuthProvider";
import Notification from "@/components/RestComponents/Notification";

const MainLayout = async ({ children }) => {
  return (
    <AuthProvider>
      <html lang="en">
        <body
          suppressHydrationWarning={true}
          className="text-white font-playfair "
        >
          {/* <Nav /> */}
          <main>{children}</main>
          <div id="nav-modal"></div>
          <Notification />
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
