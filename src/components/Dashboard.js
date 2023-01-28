import {useContext, useEffect, useState} from 'react'
import axios from 'axios'
import {MdDeleteForever} from 'react-icons/md'
import {FiEdit} from 'react-icons/fi'
import { AppContext } from './Context'
import {Link} from 'react-router-dom'
import { baseUrl } from '../utils/baseUrl';


function Dashboard() {

    const {state, dispatchState} = useContext(AppContext)

    useEffect(() => {

        async function getData() {

            // THIS IS THE REQUEST TO SERVER
            const response = await axios.get(baseUrl + '/users/list')
            console.log("🚀 ~ getData ~ response", response)

            dispatchState({
                type: 'loadUsers',
                payload: response.data.users
            })
        }

        getData()

    }, [])

    const handleDelete = async (id) => {
        console.log("🚀 ~ handleDelete ~ id", id)

        // users/delete/638f1ff53f20e82a05309685
        const response = await axios.delete(baseUrl + '/users/delete/' + id)
        console.log("🚀 ~ handleDelete ~ response", response)

        if (response.data.success) {

            dispatchState({
                type: 'removeUser',
                payload: id
            })

        } else {
            if (response.data.errorId === 1) {
                alert('User not found')
            }
        }
    }

    const handleEdit = () => {}

    return (  
        <div className='p-[20px] flex justify-center w-full flex-col gap-[20px]'>

            {
                state.users.map(item => <div 
                key={item._id}
                className='flex gap-[20px] items-center'
                >username:{item.username} 
                
                email: {item.email} 
                
                <MdDeleteForever className='hover:text-red-500 hover:cursor-pointer'
                onClick={() => handleDelete(item._id)}
                />
                
                <Link to={'/dashboard/users/edit/' + item._id}>
                    <FiEdit 
                        className='hover:text-red-500 hover:cursor-pointer'
                    />
                </Link>
                </div>)
            }
        </div>
    );
}

export default Dashboard;