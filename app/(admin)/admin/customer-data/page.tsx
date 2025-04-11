import React from "react";

const CustomerSecretData = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen mx-auto">
      This is a Admin route that should never be accessed by none authenticated
      users
    </div>
  );
};

export default CustomerSecretData;
