import { useContext } from 'react';
import {Outlet, Navigate} from 'react-router-dom'
import { AppContext } from '../components/Context';
import Header from '../components/Header';

function AdminLayout() {

    const {state} = useContext(AppContext)

    if (state.user._id) {
        return (  
            <div>
                <Header />
                <Outlet />
            </div>
        );
    } else {
        return <Navigate to='/login' />
    }
    
}

export default AdminLayout;