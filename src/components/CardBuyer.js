import {AppContext} from './Context'
import { useContext } from 'react'
import axios from 'axios'
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai'
import { baseUrl } from '../utils/baseUrl';

function CardBuyers({product}) {

	const {state, dispatchState} = useContext(AppContext)

	const handleAdd = async () => {

		if (!state.user._id) {
			alert('You must log in first')
			return
		}

		const response = await axios.post(baseUrl + '/users/addtocart',
		{
			_id: state.user._id,
			product: product._id
		})
		console.log("🚀 ~ handleAdd ~ response", response)

		if (response.data.success) dispatchState({

			type: 'addToCart',
			payload: response.data.cart
		})
	}

	const handleWishlistAdd = async () => {

		if (!state.user._id) return alert('You must login in order to use the wishlist feature')

		const response = await axios.post(baseUrl + '/users/wishlist/add', {
			user: state.user._id,
			product: product._id
		})
		console.log("🚀 ~ response", response)

		if (response.data.success) {
			dispatchState({

				type: 'addToWishlist',
				payload: product._id
			})
		}
	}

	const handleWishlistRemove = async () => {

		if (!state.user._id) return alert('You must login in order to use the wishlist feature')

		const response = await axios.post(baseUrl + '/users/wishlist/remove', {
			user: state.user._id,
			product: product._id
		})
		console.log("🚀 ~ response", response)

		if (response.data.success) {
			dispatchState({

				type: 'deleteFromWishlist',
				payload: response.data.wishlist
			})
		}
	}

	return ( 
        <div className="max-w-2xl mx-auto">


	<div className="bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
			<img className="rounded-t-lg p-8 h-[400px] object-cover" src={`${baseUrl}/images/${product.image}`} alt="product" />
			<div className="px-5 pb-5">
				<div className='flex justify-between items-center mb-4'>
					<h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white">{product.name}</h3>

					{
						state.user._id && state.user.wishlist.includes(product._id) ?
						<AiFillHeart 
							className='relative text-red-500 text-[2rem] 
							cursor-pointer hover:text-white'
							onClick={handleWishlistRemove}
						/>
						:
						<AiOutlineHeart 
							className='relative text-red-500 text-[2rem] 
							cursor-pointer hover:text-white'
							onClick={handleWishlistAdd}
						/>
					}


				</div>
				<div className="flex items-center justify-between relative">
					<span className="text-3xl font-bold text-gray-900 dark:text-white">{product.price}€</span>
					<button
						className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						onClick={handleAdd}
					>
						Add to cart
					</button>
				</div>
				
			</div>
	</div>
</div>
     );
}

export default CardBuyers;