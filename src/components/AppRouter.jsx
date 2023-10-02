import { Route, Routes, Navigate } from 'react-router-dom';
// import About from "../pages/About";
// import Posts from "../pages/Posts";
// import Error from "../pages/Error";
// import PostIdPage from '../pages/PostIdPage';
import { publicRoutes, privateRoutes } from '../router/routes';
import { useContext } from 'react';
import { AuthContext } from '../context/context';
import Loader from './UI/loader/Loader';

const AppRouter = () => {
    // console.log(routes)
    // const isAuth = true;
    const {isAuth, isLoading} = useContext(AuthContext)
    console.log(isAuth);

    if (isLoading) {
        return <Loader/>
    }
    
    return (
        isAuth
            ? <Routes>
                {privateRoutes.map(route =>
                    <Route
                        element={route.element}
                        path={route.path}
                        exact={route.exact}
                        key={route.path}
                    />
                )}
                <Route path="*" element={<Navigate replace to="/posts" />} /> 
            </Routes>
            :
            <Routes>
                {publicRoutes.map(route =>
                    <Route
                        element={route.element}
                        path={route.path}
                        exact={route.exact}
                        key={route.path}
                    />
                )}
                                <Route path="*" element={<Navigate replace to="/login" />} /> 
            </Routes>
    )
}

export default AppRouter;




/* <Route exact path="/about" element={<About />}>
        </Route>
        <Route exact path="/posts" element={<Posts />}>
        </Route>
        <Route exact path="/posts/:id" element={<PostIdPage />}>
        </Route>
        <Route exact path="/error" element={<Error />}>
        </Route> */