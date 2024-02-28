import React from "react";

function InputComp({ SearchAPI, aos, name }) {
  return (
    <input
      type="text"
      id="input"
      className="w-1/2 px-4 py-1 rounded-md mx-auto shadow-md shadow-slate-500 focus:outline-none focus:border-none focus:shadow-lg focus:shadow-slate-500"
      placeholder="Search..."
      onChange={SearchAPI}
      name={name}
      data-aos={aos}
      data-aos-duration="800"
    />
  );
}

export default InputComp;
