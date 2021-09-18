import React, { useContext } from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import { UserContext } from '../context/UserContext';
import { publicRoutes, privateRoutes } from '../router/routes';

const AppRouter = () => {
    const [token] = useContext(UserContext);

    return (
        !token ? 
            <Switch>
                {publicRoutes.map(route =>
                    <Route
                        component={route.component}
                        path={route.path}
                        exact={route.exact}
                    />
                )}
                <Redirect to='/login'/>
            </Switch> 
        :
            <Switch>
                {privateRoutes.map(route =>
                    <Route
                        component={route.component}
                        path={route.path}
                        exact={route.exact}
                    />
                )}
                <Redirect to='/error'/>
            </Switch>
    )
}

export default AppRouter
