import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/pokedex/Header'
import axios from 'axios'

const PokemonId = () => {
    const { id } = useParams()
    const [pokemon, setPokemon] = useState()
    const getPercentStatBar = (stat_base) => {
        const percentBarProgres = Math.floor(stat_base * 100) / 255
        return `${percentBarProgres}%`
    }
    useEffect(() => {

        const URL = `https://pokeapi.co/api/v2/pokemon/${id}/`
        axios.get(URL)
            .then((res) => setPokemon(res.data))
            .catch((err) => console.log(err))
    }, [])

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
    const backgroundWithoutgradient = {
        grass: "bg-green-500",
        fire: "bg-red-500",
        water: "bg-blue-500",
        bug: "bg-yellow-500",
        normal: "bg-pink-800",
        poison: "bg-emerald-700",
        fighting:"bg-red-700",
        ground:"bg-amber-700",
        rock:"bg-gray-600",
        ghost:"bg-purple-800",
        steel:"bg-slate-400",
        electric:"bg-amber-400",
        psychic:"bg-violet-900",
        ice:"bg-indigo-600",
        dragon:"bg-red-600",
        dark:"bg-zinc-950",
        fairy:"bg-rose-600"
    }



    return (
        <section>
            <Header />


            <section className='px-1 py-10 mt-5'>

                <article className=' boder-gray-300 rounded shadow shadow-gray-600 max-w-[900px] mx-auto '>


                    <section className={` bg-gradient-to-b rounded-t ${backgroundByType[pokemon?.types[0]?.type.name]} relative h-[150px]`}>
                        <div className='absolute -top-14 w-[200px] left-1/2 -translate-x-1/2'>
                            <img src={pokemon?.sprites.other["official-artwork"].front_default
                            } alt="" />
                        </div>
                    </section>


                    <section className='max-w-[750px] mx-auto pt-5 px-2'>
                        <div className='grid text-center justify-center' >
                            <h3 className='text-gray-500 font-semibold text-xl p-1 m-2 border-[2px]  rounded-[5px] border-gray-300 w-15 h-10'>#{pokemon?.id}</h3>
                        </div>
                        <div className='grid grid-cols-[1fr_auto_1fr] items-center gap-2'>
                            <hr />
                            <h2 className=' text-3xl font-semibold text-gray-500 capitalize'>{pokemon?.name}</h2>
                            <hr />
                        </div>
                        <div className='flex  justify-center gap-6 text-center m-3'>
                            <div>
                                <h6 className='text-gray-500'>Weight</h6>
                                <span>{pokemon?.weight}</span>
                            </div>
                            <div>
                                <h6 className='text-gray-500'>Height</h6>
                                <span>{pokemon?.height}</span>
                            </div>
                        </div>
                               
                        <section className='grid sm:grid-cols-2 gap-10'>
                            {/*tipo de pokemon*/}
                            <section className='text-center mb-2 mt-2  '>
                                <h3 className='m-1  font-semibold text-gray-500'>Types</h3>
                                <section className={`grid grid-cols-2 gap-4 grow-0 items-center `}>
                                    {
                                        pokemon?.types.map((type) =>
                                            <article className={`p-2 px-8 border-[1px] border-gray-300 ${backgroundWithoutgradient[type.type?.name]}
                                    capitalize`} key={type.type?.name}>{type.type?.name}</article>)
                                    }
                                </section>

                            </section>
                                {/*habilidades*/}
                            <section className='text-center mb-2 mt-2'>
                                <h3 className='m-1  font-semibold text-gray-500'>Abilities</h3>
                                <section className={`grid grid-cols-2 gap-4`}>
                                    {
                                        pokemon?.abilities.map((ability) =>
                                            <article className="p-2 px-8 border-[1px] border-gray-300
                                    capitalize truncate" key={ability.ability?.name}>{ability.ability?.name}</article>)
                                    }
                                </section>

                            </section>

                            
                        </section>

                    </section>


                    <section className='max-w-[750px] mx-auto  pb-3 pt-10 px-2'>
                        <h3 className='text-3xl font-semibold pb-2'>Stats</h3>


                        <section className='grid gap-4 '>
                            {
                                pokemon?.stats.map(stat => (
                                    <article key={stat.stat?.name}>
                                        <section className='flex justify-between'>
                                            <h4 className='capitalize'>{stat?.stat.name}</h4>
                                            <span>{stat?.base_stat}/255</span>
                                        </section>
                                        <div className='bg-gray-300 h-6 rounded-sm'>
                                            <div style={{ "width": getPercentStatBar(stat?.base_stat) }} className={`h-full bg-gradient-to-r
                                             from-yellow-300 to-yellow-500`}></div>
                                        </div>
                                    </article>
                                ))
                            }
                        </section>
                    </section>
                </article>

            </section>
        </section>
    )
}

export default PokemonId