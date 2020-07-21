/**
 * Application layout component
 * This component is responsible to render the whole app after login
 *
 */
import {AppHeader} from './header/header';
import React from 'react';
import {LeftNavBar} from "./left-nav-bar/left-nav-bar";
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from "history";


import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import PeopleIcon from '@material-ui/icons/People';
import StorageIcon from '@material-ui/icons/Storage';
import VerticalSplitIcon from '@material-ui/icons/VerticalSplit';
import {ProductsPage} from "./pages/products-page/products-page";

const history = createBrowserHistory();

const leftNavigations = [
    {
        name: 'products-nav-link',
        icon: VerticalSplitIcon,
        path: '/products',
        label: 'Products',
    },
    {
        name: 'inventory-nav-link',
        icon: StorageIcon,
        path: '/inventories',
        label: 'Inventory',
    },
    {
        name: 'inventory-nav-link',
        icon: SettingsApplicationsIcon,
        path: '/settings',
        label: 'Settings',
    },
    {
        name: 'inventory-nav-link',
        icon: PeopleIcon,
        path: '/users',
        label: 'Users',
    },
];

export const AppLayout = (_props: unknown) => {
    return (<React.Fragment>
        <AppHeader/>
        <section className={'flex-container flex-child'}>
            <Router history={history}>
                <LeftNavBar navigations={leftNavigations}/>
                <section className={'app-route-container flex-child'}>
                    <Switch>
                        <Route exact path="/">
                            <ProductsPage />
                        </Route>
                        <Route path="/products">
                            <ProductsPage />
                        </Route>
                    </Switch>
                </section>
            </Router>
        </section>
    </React.Fragment>);
}