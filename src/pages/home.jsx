import React, { useEffect, useState } from "react";
import InputComp from "../components/element/InputComp";
import Card from "../components/fragment/Card";
import Api from "../api/Api";
import Aos from "aos";
import "aos/dist/aos.css";
import ScrollToTop from "react-scroll-to-top";
import backIcon from "../assets/back.png";

function Home() {
  const [pokemon, setPokemon] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const [pokemonSelect, setPokemonSelect] = useState({});
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(0);

  const getDataApi = async () => {
    const poke = await Api.get(`pokemon?offset=${page * 20}&limit=20`);
    setPokemon(poke.data.results);
  };

  useEffect(() => {
    getDataApi();
    Aos.init({ once: true, duration: 1500 });
  }, [page]);

  const infoPokemon = async (data) => {
    const dataInfo = await Api.get(`pokemon/${data}`);
    const obj = {};
    obj.name = dataInfo.data.name;
    obj.id = dataInfo.data.id;
    obj.type = dataInfo.data.types.map((el) => el.type.name);
    obj.hp = dataInfo.data.stats[0].base_stat;
    obj.attack = dataInfo.data.stats[1].base_stat;
    obj.defense = dataInfo.data.stats[2].base_stat;
    obj.weight = dataInfo.data.weight;
    obj.height = dataInfo.data.height;
    obj.abilities = dataInfo.data.abilities.map((el) => el.ability.name);

    const desc = await Api.get(dataInfo.data.species.url);
    obj.desc = desc.data.flavor_text_entries[0].flavor_text;

    console.log(desc);
    setPokemonSelect(obj);
    setOpen(!isOpen);
  };

  const SearchAPI = async (e) => {
    if (e.target.value.length >= 3) {
      try {
        const pokeSearch = await Api.get(`pokemon/${e.target.value}`);
        console.log("get data..");
        console.log([pokeSearch.data]);
        setPokemon([pokeSearch.data]);
        setMessage("");
      } catch (error) {
        setMessage(`${error.response.data}`);
      }
    } else if (e.target.value.length === 0) {
      getDataApi();
      setMessage("");
    }
  };

  const pages = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <>
      {!isOpen && (
        <div className="flex min-h-screen flex-col justify-center py-5 mx-auto bg-slate-900">
          <div className="flex flex-col justify-center w-1/2 mx-auto">
            <img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="source" className="w-40 py-4 mx-auto" onClick={() => window.location.reload()} />
            <InputComp aos="fade-right" name="input" SearchAPI={SearchAPI} />
            <p className="text-red-600 mx-auto">{message}</p>
            <small className="pt-2 mx-auto text-gray-500 grayscale">Src: Pokeapi.co</small>
          </div>
          <div className="grid grid-cols-4 px-4 py-8 place-items-center">{pokemon && pokemon.map((el, i) => <Card key={i + 1} data={el} aos="fade-up" onClick={() => infoPokemon(el.name)} />)}</div>
          <ScrollToTop
            smooth
            color="teal"
            style={{ border: "2px solid teal", borderRadius: "20%", display: "flex", justifyContent: "center", transform: "rotate(180deg)" }}
            viewBox="0 0 24 25"
            svgPath="M.305,12.293a1,1,0,0,1,1.414,0l8.172,8.171a3,3,0,0,0,4.242,0l8.172-8.171a1,1,0,0,1,1.414,1.414l-8.172,8.171a5,5,0,0,1-7.07,0L.305,13.707a1,1,0,0,1,0-1.414Z "
          />
          <footer className="text-center w-full">
            <div className="flex justify-center gap-2 pb-4">
              {pages.map((el, i) => (
                <button key={i} className="p-2 bg-black text-teal-500 rounded cursor-pointer" onClick={() => setPage(el)}>
                  {el}
                </button>
              ))}
            </div>
            <p className="font-semibold text-white">Created by @Dzulfikar </p>
          </footer>
        </div>
      )}

      {/* info detail */}
      {isOpen && (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900">
          <button className="absolute rounded bg-cyan-400 left-40 top-10" onClick={() => setOpen(!isOpen)}>
            <img src={backIcon} alt="back" className="w-8" />
          </button>
          <div className="w-[1000px] px-4 py-6">
            <div className="flex justify-between gap-5">
              <div className="flex items-center justify-center m-auto bg-white border-2 border-teal-700 shadow-2xl w-96 h-96 shadow-teal-700 animate-fuush">
                <img src={`https://img.pokemondb.net/artwork/large/${pokemonSelect.name}.jpg`} alt={`img-${pokemonSelect.id}`} className="w-48 mx-auto" />
              </div>
              <div className="w-1/2 px-4 py-6 bg-white rounded-lg">
                <h1 className="text-2xl font-semibold text-yellow-600">{pokemonSelect.name}</h1>
                <div className="flex gap-4 pt-1 pb-3">
                  <h3 className="font-mono text-slate-300">#{pokemonSelect.id}</h3>
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
