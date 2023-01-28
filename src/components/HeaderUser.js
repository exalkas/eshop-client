import {BsCart2} from 'react-icons/bs'
import {CiLogin, CiLogout} from 'react-icons/ci'
import {FaUserCog} from 'react-icons/fa'
import {AiFillHeart} from 'react-icons/ai'
import Logo from '../images/big-cat.png'
import {Link, useNavigate} from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from './Context'

function HeaderUser() {

    const {state, dispatchState} = useContext(AppContext)

    const navigate = useNavigate()

    const handleLogout = () => {
        dispatchState({
            type: 'logoutUser'
        })

        navigate('/')
    }

    return ( 
        <header className="header sticky top-0 bg-white shadow-md flex items-center justify-between px-8 py-02 w-[80%]">

    <h1 className="w-3/12">

         <Link to='/'><img src={Logo} className='w-[50px] h-[50px] object-contain' alt=''/></Link>
    </h1>


    <nav className="nav font-semibold text-lg">
        <ul className="flex items-center">

            <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
            <Link to='/'>Products</Link>
            </li>
            <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
              Categories
            </li>
            <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
              Contact
            </li>
        </ul>
    </nav>


    <div className="w-3/12 flex justify-end items-center gap-[20px]">
        <Link to='/cart'><BsCart2 className='text-[2rem]  hover:text-green-500 duration-200 cursor-pointer'/><span>{
            state.user._id ?

             state.user.cart.reduce((total, item) => total += item.quantity, 0)

             : 0
        }</span></Link>
        {
            state.user._id ?

            <>
                <CiLogout className="text-[2rem]  hover:text-green-500 duration-200 cursor-pointer" onClick={handleLogout}/>
                <Link to='/dashboard'><FaUserCog className="text-[2rem] hover:text-green-500 duration-200 cursor-pointer" /></Link>
            </>
            :
            <Link to='/login'><CiLogin className="text-[2rem] hover:text-green-500 duration-200 cursor-pointer"/></Link>
        }
        <Link to='/wishlist'><AiFillHeart  className="text-[2rem] hover:text-green-500 duration-200 cursor-pointer"/></Link>
    </div>
</header>
     );
}

export default HeaderUser;