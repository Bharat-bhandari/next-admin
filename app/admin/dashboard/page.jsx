"use client";

import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await getServerSession(authOptions);
        console.log("Session in dashboard:", session);

        if (!session?.user?.role === "admin") {
          router.push("/");
        }
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };

    fetchSession();
  }, []);

  return <div>Dashboard</div>;
};

export default Dashboard;
