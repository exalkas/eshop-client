import { useContext, useEffect } from 'react';
import {IoMdAddCircle} from 'react-icons/io'
import { Link } from 'react-router-dom';
import axios from 'axios';

import { AppContext } from './Context'
import ProductCardAdmin from './ProductCardAdmin';
import { baseUrl } from '../utils/baseUrl';

function Products() {

    const {state, dispatchState} = useContext(AppContext)

    useEffect(() =>  {

        async function getData() {

            const response = await axios.get(baseUrl + '/products/list')
            console.log("🚀 ~ getData ~ response", response)

            if (response.data.success) dispatchState({
                type: 'loadProducts',
                payload: response.data.products
            })
        }

        getData()
    }, [])

    const handleDelete = async (id) => {

        const response = await axios.delete(baseUrl + '/products/delete/' + id)
        console.log("🚀 ~ handleDelete ~ response", response)

        if (response.data.success) dispatchState({
            type: 'removeProduct',
            payload: id
        })

    }

    return (  
        <div>

        <Link to='/dashboard/products/add'>
            <IoMdAddCircle 
                className='text-[2rem] hover:text-red-500 cursor-pointer'
                
            />
        </Link>
        {
            state.products.map(item => <ProductCardAdmin 
                key={item._id}
                product={item}
                handleDelete={handleDelete}
            />)
        }
        </div>
    );
}

export default Products;