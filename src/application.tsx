import React from 'react';
import { Route, Routes, RouteProps } from 'react-router';
import routes from './config/routes'

export interface IApplicationProps {}

const Application: React.FC<IApplicationProps> = props => {
    return (
        <Routes>
            {routes.map((route, index) =>{
                return (
                    <Route
                        path={route.path}
                        key={index}
                        element={<route.component animated={true} />}
                    />
                )
            })}
        </Routes>
    )
}

export default Application;