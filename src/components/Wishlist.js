import { useContext, useEffect, useState } from 'react';
import {MdDeleteForever} from 'react-icons/md'
import HeaderUser from './HeaderUser'
import axios from 'axios'
import {AppContext} from './Context'

function Cart() {

    const {state, dispatchState} = useContext(AppContext)

    const [wishlist, setWishlist] = useState([])

    useEffect(() => {

      async function getData() {

        const response = await axios.get('/users/wishlist/list/' + state.user._id)
        console.log("🚀 ~ response", response)

        if (response.data.success) setWishlist([...response.data.wishlist])
      }

      getData()

    }, [])

    const handleDelete = async (id) => {
      if (!state.user._id) return alert('You must be logged in to use the wishlist feature')

  const response = await axios.post('/users/wishlist/remove', {
    user: state.user._id,
    product: id
  })
  console.log("🚀 ~ handleWishlist ~ response", response)

  if (response.data.success) {
          dispatchState({
    type: 'deleteFromWishlist',
    payload: response.data.wishlist
  })
  
      const oldData = wishlist.filter(item => item._id !== id)

      setWishlist([...oldData])

      }
  }


    return ( 
      <div className='flex items-center w-full h-[100vh] bg-slate-50 flex-col gap-[20px]'>
        <HeaderUser />


        <div className="w-full max-w-md p-4 bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Wishlist</h5>
          </div>
        <div className="flow-root">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {
                
                  wishlist.length ? 

                    wishlist?.map((item, idx) => <li key={item._id} className="py-3 sm:py-4">
                    <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                            <img className="w-8 h-8 rounded-full" src={`/images/${item.image}`} alt="Neil" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                {item.name}
                            </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white text-[2rem]">
                            ${item.price}
                            <MdDeleteForever className='hover:text-red-500 hover:cursor-pointer text-[2rem]'
                              onClick={() => handleDelete(item._id)}
                            />
                        </div>
                    </div>
                </li>)

                    :

                    <p className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">Your wishlist is empty</p>
              }
                  
                 
              </ul>
        </div>
      </div>






    </div>
     );
}

export default Cart;