import React from "react";
import backIcon from "../../assets/back.png";
import Blob from "../fragment/Bloby";
import DetailBox from "../fragment/DetailBox";

function DetailLayout({ pokemonSelect, setOpen, isOpen }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900">
      <button className="absolute rounded bg-cyan-400 left-40 top-10" onClick={() => setOpen(!isOpen)}>
        <img src={backIcon} alt="back" className="w-8" />
      </button>
      <div className="w-[1000px] px-4 py-6">
        <div className="flex justify-between gap-5 flex-col lg:flex-row">
          {/* blob */}
          <Blob pokemonSelect={pokemonSelect} />
          <DetailBox pokemonSelect={pokemonSelect} />
        </div>
      </div>
    </div>
  );
}

export default DetailLayout;
