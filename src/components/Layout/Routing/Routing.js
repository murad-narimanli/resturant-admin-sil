import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Home from "../../Pages/Home/Home";
import Common from "../../Pages/Common/Common";
import Menu from "../../Pages/Menu/Menu"
import EditMenu from "../../Pages/Menu/EditMenu";
import Orders from "../../Pages/Orders/Orders";
import OrderItems from "../../Pages/Orders/OrderItems";
import EditOrders from "../../Pages/Orders/EditOrders";
import {routes} from "../../../services/api-routes";

function Routing(props) {

    return (
        <Switch>
            <Route exact path={`/`} component={Orders} />
            <Route exact path={`/menu`} component={Menu} />
            <Route exact path={`/menu/edit/:id?`} component={EditMenu} />
            <Route exact path={`/orders`} component={Orders} />
            <Route exact path={`/orders/edit/:id?`} component={EditOrders} />
            <Route exact path={`/orders/products/:id?`} component={OrderItems} />
            {routes.admin.map((r, i)=> (
                <Route key={i} exact path={`/${r.url}`} >
                    <Common url={r.url} name={r.name} label={r.label}/>
                </Route>
            ))}
            <Redirect to="/" />
            <Route path="/">
                <p className="flex all-center h-100vh">Not found</p>
            </Route>
        </Switch>
    );
}


export default Routing;
