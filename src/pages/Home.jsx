
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import { setNameTrainer } from '../store/slices/nameTrainer.slice'
import { useDispatch } from 'react-redux'

const Home = () => {

const dispatch = useDispatch()
const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(setNameTrainer(e.target.nameTrainer.value))
    navigate("/pokedex")
  }

  return (
    <section className='min-h-screen grid grid-rows-[1fr_auto]'>
      <section>
        <article className='grid justify-center'>

          <div className='w-[300px] h-[80px] mt-14 md:w-[500px] md:h-[150px]'>
            <img src="/images/pokedex-logo.png" alt="" />
          </div>

          <h2 className='text-red-500  text-3xl text-center font-bold md:text-4xl'>Hello trainer!</h2>

          <p className='pb-5 md:pb-12 text-center text-1xl font-semibold md:text-[20px]'>Give me your name to start:</p>

          <form onSubmit={handleSubmit} className='flex justify-center p-2 '>
            <input className='p-2 w-[230px] shadow-md shadow-gray-200 bg-zinc-50 
            border border-gray-300 md:w-[400px]' id="nameTrainer" type="text" placeholder='your name...' />
            <button className='p-2 w-[50px]  text-white border bg-red-500
             border-red-500 md:w-[80px]'>Start</button>
          </form>

        </article>
      </section>
      <Footer />
    </section>
  )
}

export default Home