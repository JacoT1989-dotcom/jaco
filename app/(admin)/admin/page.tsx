"use client";

import React from "react";
import { useSession } from "@/app/SessionProvider";

const AdminDashboard = () => {
  const { user } = useSession();

  if (!user) return null;
  return (
    <div className="flex flex-col justify-center items-center h-screen mx-auto">
      {user.displayName}
    </div>
  );
};

export default AdminDashboard;
