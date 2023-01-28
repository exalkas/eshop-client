import axios from 'axios';
import { useContext, useState } from 'react';
import {MdDeleteForever} from 'react-icons/md'
import {BsCartCheckFill} from 'react-icons/bs'
import { AppContext } from './Context';
import { baseUrl } from '../utils/baseUrl';

function CartCard({product, cbDelete}) {

    const {state, dispatchState} = useContext(AppContext)

    const [quantity, setQuantity] = useState(product.quantity || 0)

    const handleDecrease = () => {
        if (quantity === 0) return

        setQuantity(prev => prev - 1)
    }
    const handleIncrease = () => setQuantity(prev => prev + 1)

    const handleDelete = async (productId) => {

        const response = await axios.post(baseUrl + '/users/removefromcart', {
            _id: state.user._id,
            product: product.product._id
        })
        console.log("🚀 ~ handleDelete ~ response", response)

        if (response.data.success) {

            cbDelete(productId)

            dispatchState({
                type: 'deleteFromCart',
                payload: response.data.cart
            })
        }
    }
    const handleUpdate = async () => {

        const response = await axios.post(baseUrl + '/users/updatecart', {
            _id: state.user._id,
            product: product.product._id,
            quantity
        })
        console.log("🚀 ~ handleDelete ~ response", response)

        if (response.data.success) {
            dispatchState({
                type: 'addToCart',
                payload: response.data.cart
            })
        }
    }

    return (
        <div 

            className='flex width-full items-center 
            justify-center
            gap-[20px] mb-[20px]'

        > 

    <span>{product.product.name}</span>
    <span>{product.product.price}</span>
    <img  
        className='w-[40px] h-[40px] rounded-full object-cover'
        src={`/images/${product.product.image}`} alt=''/>

    <div className="flex items-center gap-[20px]">

    <button 
        type="button" 
        onClick={handleDecrease}
        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-[2rem] ">-</button>
    
    <input type="text" id="base-input" disabled className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center" value={quantity}/>
    
    <button 
        type="button" 
        onClick={handleIncrease}
        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-[1rem]"
    >
        +
    </button>

    </div>

    <BsCartCheckFill className='hover:text-red-500 hover:cursor-pointer text-[2rem]'
        onClick={() => handleUpdate(product._id)}
    />

    <MdDeleteForever className='hover:text-red-500 hover:cursor-pointer text-[2rem]'
        onClick={() => handleDelete(product.product._id)}
    />


    </div>
      );
}

export default CartCard;