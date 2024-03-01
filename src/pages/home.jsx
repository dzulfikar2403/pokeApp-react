import React, { useEffect, useRef, useState } from "react";
import InputComp from "../components/element/InputComp";
import Card from "../components/fragment/Card";
import Api from "../api/Api";
import Aos from "aos";
import "aos/dist/aos.css";
import ScrollToTop from "react-scroll-to-top";
import DetailLayout from "../components/layout/DetailLayout";

function Home() {
  const [pokemon, setPokemon] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const [pokemonSelect, setPokemonSelect] = useState({});
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(0);
  const inputRef = useRef();
  const [toggle, setToggle] = useState(false);

  const getDataApi = async () => {
    const poke = await Api.get(`pokemon?offset=${page * 20}&limit=10`);
    setPokemon(poke.data.results);
  };

  useEffect(() => {
    getDataApi();
    Aos.init({ once: true, duration: 1500 });
  }, [page]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

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

  const toggleMode = () => {
    setToggle(!toggle);
  };

  return (
    <>
      {!isOpen && (
        <div className={`flex min-h-screen flex-col justify-center py-5 mx-auto ${toggle ? "bg-white" : "bg-slate-900"}`}>
          <div className="flex flex-col justify-center w-1/2 mx-auto">
            <div className="flex justify-end">
              <button className={`w-20 rounded-md shadow-md  font-semibold ${!toggle ? "text-blue-200 bg-blue-900 shadow-blue-800" : "text-yellow-200 bg-yellow-900 shadow-yellow-800"}`} onClick={toggleMode}>
                {toggle ? "Dark" : "Light"}
              </button>
            </div>
            <img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="source" className="w-40 py-4 mx-auto" onClick={() => window.location.reload()} />
            <InputComp ref={inputRef} aos="fade-right" name="input" SearchAPI={SearchAPI} />
            <p className="text-red-600 mx-auto">{message}</p>
            <small className="pt-2 mx-auto text-[#ccc] grayscale">Src: Pokeapi.co</small>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 py-8 place-items-center">{pokemon && pokemon.map((el, i) => <Card key={i + 1} data={el} aos="fade-up" onClick={() => infoPokemon(el.name)} />)}</div>
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
      {isOpen && <DetailLayout pokemonSelect={pokemonSelect} setOpen={setOpen} isOpen={isOpen} />}
    </>
  );
}

export default Home;
