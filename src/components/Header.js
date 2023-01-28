import {FiUsers, FiLogOut} from 'react-icons/fi'
import {FaProductHunt, FaHome} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from './Context';

function Header() {

    const {dispatchState} = useContext(AppContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatchState({
            type: 'logoutAdmin'
        })

        navigate('/login')
    }

    return ( <div className="flex justify-center items-center gap-[30px] h-[100px] w-full bg-green-500 text-white text-[2rem] p-[20px]">
        <Link to='/'><FaHome className='cursor-pointer hover:text-red-500'/></Link>
        <Link to='/dashboard'><FiUsers className='cursor-pointer hover:text-red-500'/></Link>
        <Link to='/dashboard/products'><FaProductHunt className='cursor-pointer hover:text-red-500'/></Link>
        <FiLogOut 
            className='cursor-pointer hover:text-red-500'
            onClick={handleLogout}    
        />

    </div>  );
}

export default Header;