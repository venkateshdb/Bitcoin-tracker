import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Header from '../components/Header';
import Main from '../components/Main';
import Signin from '../components/Signin';
import { Price } from '../components/Price';
import Signup from '../components/Signup';

const RequireAuth = ({children, isLoggedIn}) => {
    let loggedStatus = sessionStorage.getItem("isLoggedIn")
    if(!loggedStatus || loggedStatus === 'false')
        return <Navigate to='/signin' />
    return children
}

const AppRouter = () => {

    const [isLoggedIn, setLoggedIn] = useState(false);

    useEffect( () => {
        let loggedStatus = sessionStorage.getItem("isLoggedIn")
        if(loggedStatus === 'true') setLoggedIn(true)
        else setLoggedIn(false)
    },[isLoggedIn])

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
