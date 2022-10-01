import React from 'react';

export const AuthLayout = ({ title, children }) => {
  return (
    <div className="w-full h-screen bg-[#F1F5F9] flex justify-center items-center">
      <div className="w-[95%] sm:w-[75%] md:w-[55%] lg:w-[45%] xl:w-[35%] min-h-[20rem] bg-white shadow-xl p-4 flex flex-col rounded-md">
        <h1 className="text-center my-6 text-2xl">{title}</h1>
        {children}
      </div>
    </div>
  );
};
