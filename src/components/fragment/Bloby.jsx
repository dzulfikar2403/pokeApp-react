import React from "react";

const Bloby = ({ pokemonSelect }) => {
  return (
    <div className="flex items-center justify-center m-auto bg-white border-2 border-teal-700 shadow-2xl w-64 h-64 lg:w-96 lg:h-96 shadow-teal-700 animate-fuush">
      <img src={`https://img.pokemondb.net/artwork/large/${pokemonSelect.name}.jpg`} alt={`img-${pokemonSelect.id}`} className="w-32 lg:w-48 mx-auto" />
    </div>
  );
};

export default Bloby;
