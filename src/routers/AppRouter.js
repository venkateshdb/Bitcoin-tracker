import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Header from '../components/Header';
import Main from '../components/Main';
import Signin from '../components/Signin';
import { Price } from '../components/Price';
import Signup from '../components/Signup';

const RequireAuth = ({children, isLoggedIn}) => {
    if(!isLoggedIn)
        return <Navigate to='/signin' />
    return children
}

const AppRouter = () => {

    const [isLoggedIn, setLoggedIn] = useState(false);


    return (
        <BrowserRouter>
            <Header isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}/>

            <Routes>
                <Route path='/' element={ <Main /> } />

                <Route path='/signin' element={
                    <Signin
                        isLoggedIn={isLoggedIn}
                        setLoggedIn={setLoggedIn}
                        />}
                />

                <Route path='/signup' element={
                        <Signup
                        isLoggedIn={isLoggedIn}
                        setLoggedIn={setLoggedIn}
                        />
                    }/>

                <Route path='/price' element={
                        <RequireAuth isLoggedIn={isLoggedIn}>
                            <Price />
                        </RequireAuth>
                    }>
                </Route>
                {/* <Route path='/price' element={
                            <Price />
                    }>
                </Route> */}
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;
