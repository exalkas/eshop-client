import { useContext, useState } from 'react';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { AppContext } from './Context';
import { baseUrl } from '../utils/baseUrl';

function AddProduct() {

  const navigate = useNavigate()
  const {dispatchState} = useContext(AppContext)

  const [data, setData] = useState({
    name: '',
    price: 0,
    image: '',
    description: '',
    sizes: []
  })

  const [file, setFile] = useState(null)

  const handleSave = async () => {

    const formdata = new FormData()

    formdata.set('name', data.name)
    formdata.set('price', data.price)
    formdata.set('description', data.description)
    formdata.set('sizes', data.sizes)

    formdata.set('image', file, 'somefilename')

    const config = {
      Headers: {
        'content-type': 'multipart/form-data'
      }
    }

    const response = await axios.post(baseUrl + '/products/add', formdata, config)
    console.log("🚀 ~ handleSave ~ response", response)


    if (response.data.success) {
    
        dispatchState({
            type: 'addProduct',
            payload: response.data.product
        })

        navigate('/dashboard/products')
    
    }
  }

  const handleChange = e => {
  
    console.log("🚀 ~ handleChange", e.currentTarget.files[0])

    const url = URL.createObjectURL(e.currentTarget.files[0])

    setData({...data, image: url}) // url of file just to render the image
    setFile(e.currentTarget.files[0]) // the real file
  }

    return (  
        <div className='flex justify-center items-center w-full h-[100vh] bg-slate-50 flex-col gap-[20px]'>
      <label>
      Product name: <input 
        value={data.name} 
        onChange={e => setData({...data, name: e.target.value}) } 
        className='border-slate-500 border-2 p-[10px] w-[250px] hover:bg-red-100'
        />
      </label>
      <label>
      Price: <input 
        value={data.price} 
        onChange={e => setData({...data, price: e.target.value}) } 
        className='border-slate-500 border-2 p-[10px] w-[250px] hover:bg-red-100'
        />
      </label>
      <label>
      Description: <input 
        value={data.description} 
        onChange={e => setData({...data, description: e.target.value}) } 
        className='border-slate-500 border-2 p-[10px] w-[250px] hover:bg-red-100'
        />
      </label>

      <label className='cursor-pointer'>
        Choose image
        <input type='file' className='hidden' onChange={handleChange}/>
      </label>

      <img src={data.image} className='w-[300px] h-[300px] object-cover' />

      <button  className='border-slate-500 border-2 p-[10px] w-[250px] hover:bg-red-100'onClick={handleSave}>Save</button>


    </div>
    );
}

export default AddProduct;