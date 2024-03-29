import React, { forwardRef } from "react";

const InputComp = forwardRef(({ SearchAPI, aos, name }, ref) => {
  return (
    <input
      ref={ref}
      type="text"
      id="input"
      className="w-2/3 lg:w-1/2 px-4 py-1 rounded-md mx-auto shadow-md shadow-slate-500 focus:outline-none focus:border-none focus:shadow-lg focus:shadow-slate-500"
      placeholder="Search..."
      onChange={SearchAPI}
      name={name}
      data-aos={aos}
      data-aos-duration="800"
    />
  );
})

export default InputComp;
