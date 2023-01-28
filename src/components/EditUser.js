import { useEffect, useState } from 'react';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { baseUrl } from '../utils/baseUrl';

function EditUser() {

  const navigate = useNavigate()

  const {id} = useParams()

  const [data, setData] = useState({
    email: '',
    username: '',
    password: '' 
  })

  useEffect(() => {

    async function getData() {
      
      const response = await axios.get(baseUrl + '/users/findone/' + id)
      console.log("🚀 ~ getData ~ response", response)

      if (response.data.success) setData(response.data.user)
    }

    getData()
  }, [])

  const handleSave = async () => {

    const response = await axios.patch(baseUrl + '/users/edit', data)
    console.log("🚀 ~ handleSave ~ response", response)

    if (response.data.success) navigate('/dashboard')
  }

    return ( 
        <div className='flex justify-center items-center w-full h-[100vh] bg-slate-50 flex-col gap-[20px]'>
      <label>
      Username: <input 
        value={data.username} 
        onChange={e => setData({...data, username: e.target.value}) } 
        className='border-slate-500 border-2 p-[10px] w-[250px] hover:bg-red-100'
        />
      </label>
      <label>
      email: <input 
        value={data.email} 
        onChange={e => setData({...data, email: e.target.value}) } 
        className='border-slate-500 border-2 p-[10px] w-[250px] hover:bg-red-100'
        />
      </label>
      <label>
      password: <input 
        value={data.password} 
        onChange={e => setData({...data, password: e.target.value}) } 
        className='border-slate-500 border-2 p-[10px] w-[250px] hover:bg-red-100'
        />
      </label>
      <button  className='border-slate-500 border-2 p-[10px] w-[250px] hover:bg-red-100'onClick={handleSave}>Save</button>


    </div>
     );
}

export default EditUser;