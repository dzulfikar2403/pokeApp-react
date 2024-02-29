import React from "react";
import IdText from "../element/IdText";

const Card = ({ data, aos, onClick = () => {} }) => {
  return (
    <div data-aos={aos}>
      <div className="px-4 py-2 mb-12 bg-white shadow-md rounded-lg transition-all duration-500 border shadow-teal-300 border-teal-400 hover:border-2 hover:shadow-xl hover:shadow-teal-400">
        <img src={`https://img.pokemondb.net/artwork/avif/${data.name}.avif`} alt="index" className="w-44 h-44 xl:w-40 xl:h-40" />
        <h2 className="text-2xl ">{data.name.substring(0, 1).toUpperCase() + data.name.substring(1)}</h2>
        <IdText>#Not Found</IdText>
        <div className="flex justify-center">
          <button className="border rounded-md px-4 py-1 transition-all duration-300 text-lg font-semibold border-teal-600 hover:text-white hover:bg-teal-600" onClick={onClick}>
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
