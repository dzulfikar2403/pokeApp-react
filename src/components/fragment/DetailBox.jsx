import React from "react";
import IdText from "../element/IdText";

const DetailBox = ({ pokemonSelect }) => {
  return (
    <div className="w-1/2 px-4 py-6 bg-white rounded-lg">
      <h1 className="text-2xl font-semibold text-yellow-600">{pokemonSelect.name.substring(0, 1).toUpperCase() + pokemonSelect.name.substring(1)}</h1>
      <div className="flex gap-4 pt-1 pb-3">
        <IdText>#{pokemonSelect.id}</IdText>
        {pokemonSelect.type.map((el, i) => (
          <span className="px-2 font-sans text-sm border rounded-xl border-cyan-700 text-cyan-900" key={i}>
            {el}
          </span>
        ))}
      </div>
      <hr />
      <div className="pt-1 pb-3">
        <small className="inline-block py-3">{pokemonSelect.desc}</small>
        <p className="font-semibold">
          abilities:{" "}
          {pokemonSelect.abilities.map((el, i) => (
            <span className="px-2 mx-1 font-sans text-sm font-normal border rounded-full border-rose-700 text-rose-700" key={i}>
              {el}
            </span>
          ))}
        </p>
      </div>
      <hr />
      <div className="flex justify-around py-2 text-left">
        <p className="w-16">HP</p>
        <p className="w-16">{pokemonSelect.hp}</p>
      </div>
      <hr />
      <div className="flex justify-around py-2">
        <p className="w-16">Attack</p>
        <p className="w-16">{pokemonSelect.attack}</p>
      </div>
      <hr />
      <div className="flex justify-around py-2">
        <p className="w-16">Defense</p>
        <p className="w-16">{pokemonSelect.defense}</p>
      </div>
      <hr />
      <div className="flex justify-around py-2">
        <p className="w-16">height</p>
        <p className="w-16">{pokemonSelect.height / 10} m</p>
      </div>
      <hr />
      <div className="flex justify-around py-2">
        <p className="w-16">weight</p>
        <p className="w-16">{pokemonSelect.weight / 10} kg</p>
      </div>
      <hr />
    </div>
  );
}

export default DetailBox;
