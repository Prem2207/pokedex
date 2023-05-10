import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const PokemonCard = ({ pokemonUrl }) => {



    const bordeByType = {
        grass: "border-green-400",
        fire: "border-red-400",
        water: "border-blue-400",
        bug: "border-yellow-400",
        normal: "border-pink-600",
        poison: "border-emerald-500",
        fighting:"border-red-700",
        ground:"border-amber-500",
        rock:"border-gray-400",
        ghost:"border-purple-600",
        steel:"border-slate-300",
        electric:"border-amber-300",
        psychic:"border-violet-700",
        ice:"border-indigo-400",
        dragon:"border-red-500",
        dark:"border-zinc-700",
        fairy:"border-rose-400"
    }
    const backgroundByType = {
        grass: "from-green-500 to-black",
        fire: "from-red-500 to-black",
        water: "from-blue-500 to-black",
        bug: "from-yellow-500 to-black",
        normal: "from-pink-800 to-black",
        poison: "from-emerald-700 to-black",
        fighting:"from-red-900 to-black",
        ground:"from-amber-700 to-black",
        rock:"from-gray-600 to-black",
        ghost:"from-purple-800 to-black",
        steel:"from-slate-400 to-black",
        electric:"from-amber-400 to-black",
        psychic:"from-violet-900 to-black",
        ice:"from-indigo-600 to-black",
        dragon:"from-red-600 to-black",
        dark:"from-zinc-950 to-black",
        fairy:"from-rose-600 to-black"
    }
    const textByType = {
        grass: "text-green-500",
        fire: "text-red-500",
        water: "text-blue-500",
        bug: "text-yellow-500",
        normal: "text-pink-800",
        poison: "text-emerald-700",
        fighting:"text-red-700",
        ground:"text-amber-700",
        rock:"text-gray-600",
        ghost:"text-purple-800",
        steel:"text-slate-400",
        electric:"text-amber-400",
        psychic:"text-violet-900",
        ice:"text-indigo-600",
        dragon:"text-red-600",
        dark:"text-zinc-950",
        fairy:"text-rose-600"

    }

    const [pokemon, setPokemon] = useState()
    console.log(pokemon)
    const types = pokemon?.types?.slice(0, 2)?.map(type => type.type.name).join(" / ")
    useEffect(() => {

        axios.get(pokemonUrl)
            .then((res) => setPokemon(res.data))
            .catch((err) => console.log(err))
    }, [])


    return (
        <section className='grid gap-1 p-2 grid-cols-[280px]  sm:mx-auto   '>
            <Link to={`/pokedex/${pokemon?.id}`} className={`text-center border-8 rounded-md ${bordeByType[pokemon?.types[0]?.type.name]}`}>
                <section className={`bg-gradient-to-b ${backgroundByType[pokemon?.types[0]?.type.name]} relative h-[150px]`}>
                    <div className='absolute -bottom-14 w-[200px] left-1/2 -translate-x-1/2'>
                        <img src={pokemon?.sprites?.other["official-artwork"].front_default
                        } alt="" />
                    </div>
                </section>


                <section>
                    <h3 className={`mt-12 text-3xl ${textByType[pokemon?.types[0]?.type?.name]}
         font-bold capitalize`}>{pokemon?.name}</h3>
                    <h4 className='text-1xl font-semibold text-black uppercase'>{types}</h4>
                    <span className='text-gray-500'>Type</span>
                    <hr />
                </section>

                <section className='grid grid-cols-3 gap-2 p-2'>
                    {
                        pokemon?.stats?.map((stat) => (
                            <div key={stat.stat.url}>
                                <h5 className='text-gray-500 text-[12px]'>{stat.stat.name.toUpperCase()}</h5>
                                <span className='text-2xl font-semibold text-black'>{stat.base_stat}</span>
                            </div>
                        ))
                    }
                </section>
            </Link>
        </section>

    )
}

export default PokemonCard