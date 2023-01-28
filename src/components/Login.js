import { useContext, useState } from 'react';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {AppContext} from './Context'
import { baseUrl } from '../utils/baseUrl';

function Register() {

  const navigate = useNavigate()

  const {state, dispatchState} = useContext(AppContext)


  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const handleLogin = async () => {

    const response = await axios.post(baseUrl + '/users/login', data)
    console.log("🚀 ~ handleLogin ~ response", response)

    if (response.data.success) {

      dispatchState({
        type: 'login',
        payload: response.data.user
      })

      navigate('/')
    } else {

      if (response.data.errorId === 1) alert('Wrong email or password')
    }
  }

  console.log("🚀 ~ Register ~ state", state)
  return (
    <div className='flex justify-center items-center w-full h-[100vh] bg-slate-50 flex-col gap-[20px]'>
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
      <button  className='border-slate-500 border-2 p-[10px] w-[250px] hover:bg-red-100'onClick={handleLogin}>Login</button>


    </div>
  );
}

export default Register;