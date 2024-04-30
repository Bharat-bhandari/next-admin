import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  console.log("sesssssiom in dashborad", session);

  const isAdmin = session?.user?.role === "admin";

  if (!isAdmin) return redirect("/");
  return <div>Dashboard</div>;
};

export default Dashboard;
