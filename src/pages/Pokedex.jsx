import React, { useEffect, useState } from 'react'
import Header from '../components/pokedex/Header'
import { useSelector } from 'react-redux'
import axios from 'axios'
import PokemonCard from '../components/pokedex/PokemonCard'

const Pokedex = () => {
    const [pokemonName, setPokemonName] = useState("")
    const [pokemons, setPokemons] = useState([])
    const [types, setTypes] = useState()
    const [currentType, setCurrentType] = useState()
    const [currentPage, setCurrentPage] = useState(1)



    const handleSubmit = (e) => {
        e.preventDefault()
        setPokemonName(e.target.pokemonName.value)
    }

    const pokemonByName = pokemons.filter
        (pokemon => pokemon.name.includes(pokemonName))

    const nameTrainer = useSelector((store) => store.nameTrainerSlice)

    useEffect(() => {
        if (!currentType) {
            const URL = "https://pokeapi.co/api/v2/pokemon?limit=1281"
            axios.get(URL)
                .then((res) => setPokemons(res.data.results))
                .catch((err) => console.log(err))
        }
    }, [currentType])

    useEffect(() => {
        const URL = "https://pokeapi.co/api/v2/type"
        axios.get(URL)
            .then((res) => {
                const newType = res.data.results.map((type) => type.name)
                setTypes(newType)
            })
            .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        if (currentType) {
            const URL = `https://pokeapi.co/api/v2/type/${currentType}/`
            axios.get(URL)
                .then((res) => {
                    const pokemonByType = res.data.pokemon.map(pokemon =>
                        pokemon.pokemon)
                    setPokemons(pokemonByType)
                })
                .catch((err) => console.log(err))
        }

    }, [currentType])

    useEffect(() => {
        setCurrentPage(1)
    }, [pokemonName, currentType])
    const paginationLogic = () => {
        //CANTIDAD DE POKEMON POR PAGINA
        const POKEMON_PER_PAGE = 16

        //POKEMONES QUE SE MUESTRAN POR PAGINA
        const sliceStart = (currentPage - 1) * POKEMON_PER_PAGE
        const sliceEnd = sliceStart + POKEMON_PER_PAGE
        const pokemonInPage = pokemonByName.slice(sliceStart, sliceEnd)

        //ULTIMA PAGINA
        const lastPage = Math.ceil(pokemonByName.length / POKEMON_PER_PAGE) || 1

        //BLOQUE ACTUAL
        const PAGES_PER_BLOCK = 5
        const actualBlock = Math.ceil(currentPage / PAGES_PER_BLOCK)

        //PAGINAS QUE SE VAN A MOSTRAR EN LA PAGINA ACTUAL
        const pagesInBlock = []
        const minPages = (actualBlock - 1) * PAGES_PER_BLOCK + 1
        const maxPages = actualBlock * PAGES_PER_BLOCK
        for (let i = minPages; i <= maxPages; i++) {
            if (i <= lastPage) {
                pagesInBlock.push(i)
            }

        }
        return { pokemonInPage, lastPage, pagesInBlock }

    }
    const { pokemonInPage, lastPage, pagesInBlock } = paginationLogic()

    const handleClickPreviusPage = () => {
        const newCurrentPage = currentPage - 1
        if (newCurrentPage >= 1) {
            setCurrentPage(newCurrentPage)
        }
    }

    const handleClickNextPage = () => {
        const newCurrentPage = currentPage + 1
        if (newCurrentPage <= lastPage) {
            setCurrentPage(newCurrentPage)
        }
    }
    return (
        <section className='min-h-screen'>
            <Header />
            <section className='py-6 px-2'>
                <h3 className='text-2xl text-center p-2'><span className='text-red-500 font-semibold'>Welcome {nameTrainer},</span> hare you can find your favorite pokemon</h3>
                <form onSubmit={handleSubmit} className='grid gap-3 p-3 sm:flex sm justify-evenly'>
                    <div>
                        <input className=' p-2 px-5 border border-gray-300 md:w-[250px]' id='pokemonName' type="text" placeholder='Search your pokemon' />
                        <button className=' p-2 border border-red-500 text-white bg-red-500 md:w-[100px]'>Search</button>
                    </div>
                    <div>
                        <select className=' p-2 border border-gray-300 w-[290px] md:w-[350px]' onChange={(e) => setCurrentType(e.target.value)} >
                            <option value="">All</option>
                            {
                                types?.map((type) =>
                                    <option className='capitalize' value={type} key={type}>
                                        {type}
                                    </option>)
                            }
                        </select>
                    </div>
                </form>
            </section>
            {/* Paginacion */}

            <ul className='flex gap-1 justify-center  py-4 mx-auto md:gap-6 sm:gap-3'>
                <li onClick={() => setCurrentPage(1)} className='p-1 bg-red-600 font-bold text-white 
                    rounded-md cursor-pointer md:p-4 '>{"<<"}</li>
                <li onClick={handleClickPreviusPage} className='p-1 bg-red-600 font-bold text-white 
                    rounded-md cursor-pointer md:p-4 '>{"<"}</li>
                {
                    pagesInBlock.map((numberPage) =>
                        <li onClick={() => setCurrentPage(numberPage)}
                            className={`p-2 bg-red-600 font-bold text-white 
                    rounded-md cursor-pointer md:p-4 ${numberPage === currentPage && "bg-red-400 text-gray-800"} `} key={numberPage}>{numberPage}</li>)
                }
                <li onClick={handleClickNextPage} className='p-1 bg-red-600 font-bold text-white 
                    rounded-md cursor-pointer md:p-4'>{">"}</li>
                <li onClick={() => setCurrentPage(lastPage)} className='p-1 bg-red-600 font-bold text-white 
                    rounded-md cursor-pointer md:p-4'>{">>"}</li>
            </ul>



            <section className='grid gap-4 justify-center sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4'>
                {
                    pokemonInPage?.map(pokemon =>
                        <PokemonCard key={pokemon.url}
                            pokemonUrl={pokemon.url} />)
                }
            </section>


        </section>


    )
}

export default Pokedex