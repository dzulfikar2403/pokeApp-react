import React from "react";

function Button({ children, aos }) {
  return (
    <button type="submit" className="px-2 py-1 text-teal-500 rounded-lg transition-all duration-700 hover:bg-black hover:border-none" data-aos={aos}>
      {children}
    </button>
  );
}

export default Button;
