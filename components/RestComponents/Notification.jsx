"use client";
import React from "react";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Notification = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
  );
};

export default Notification;
