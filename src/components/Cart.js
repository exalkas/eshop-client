import { useContext, useEffect, useState } from 'react';

import HeaderUser from './HeaderUser'
import axios from 'axios'
import {AppContext} from './Context'
import CartCard from './CartCard'
import { baseUrl } from '../utils/baseUrl';

function Cart() {

    const {state, dispatchState} = useContext(AppContext)

    const [cart, setCart] = useState([])

    const deleteFromLocalState = id => {
    console.log("🚀 ~ deleteFromLocalState", id)
    console.log("🚀 ~ deleteFromLocalState", cart)

      const oldData = cart.filter(item => item.product._id !== id)

      setCart(oldData)
    }

    useEffect(() => {

      if (!state.user._id) return 

      async function getData() {

        const response = await axios.get(baseUrl + '/users/listcart/' + state.user._id)
        console.log("🚀 ~ response", response)

        if (response.data.success) setCart([...response.data.products])
      }

      getData()

    }, [])

    return ( 
        <div className='flex items-center w-full h-[100vh] bg-slate-50 flex-col gap-[20px]'>
      <HeaderUser />

      {
        
        cart.length ? 

          cart.map((item, idx) => <CartCard 
            key={idx} 
            product={item}
            cbDelete={deleteFromLocalState}  
          />)

          :

          'Your cart is empty'
      }


    </div>
     );
}

export default Cart;