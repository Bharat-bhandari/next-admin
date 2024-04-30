"use client";

import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await getServerSession(authOptions);
        setIsAdmin(session?.user?.role === "admin");

        console.log("kdjcnb", session);
      } catch (error) {
        // Handle error, e.g., redirect to an error page
        console.error("Error fetching session:", error);
      }
    };

    fetchSession();
  }, []);

  if (!isAdmin) {
    // Handle the case where user is not an admin
    return <div>You need to be an admin to access this page.</div>;
  }

  return <div>Dashboard</div>;
};

export default Dashboard;
