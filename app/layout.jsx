import "@/assets/styles/globals.css";
import Nav from "@/components/HomePage/Nav";
import AuthProvider from "@/components/RestComponents/AuthProvider";
import Notification from "@/components/RestComponents/Notification";
import { ErrorBoundaryHandler } from "next/dist/client/components/error-boundary";

const MainLayout = async ({ children }) => {
  return (
    <AuthProvider>
      <ErrorBoundaryHandler>
        <html lang="en">
          <body
            suppressHydrationWarning={true}
            className="text-white font-playfair bg-black2 "
          >
            {/* <Nav /> */}
            <main>{children}</main>
            <div id="nav-modal"></div>
            <Notification />
          </body>
        </html>
      </ErrorBoundaryHandler>
    </AuthProvider>
  );
};

export default MainLayout;
