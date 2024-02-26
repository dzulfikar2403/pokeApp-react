import React from "react";

function InputComp({ onChange, aos }) {
  return (
    <input
      type="text"
      name=""
      id=""
      className="w-1/2 px-4 py-1 mx-auto rounded-md shadow-md shadow-slate-500 focus:outline-none focus:border-none focus:shadow-lg focus:shadow-slate-500"
      placeholder="Search..."
      onChange={onChange}
      data-aos={aos}
      data-aos-duration="800"
    />
  );
}

export default InputComp;
