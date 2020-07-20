 /**
 * @description Left Navigation bar component for the application
 */

 import React from "react";
 import styles from './left-nav-bar.module.scss';
 import { NavLink } from 'react-router-dom';

 import {OverridableComponent} from "@material-ui/core/OverridableComponent";
 import {SvgIconTypeMap} from "@material-ui/core";

 interface ILeftNavProps {
     navigations: Array<{
         name: string;
         icon: typeof React.Component |  OverridableComponent<SvgIconTypeMap<{}, "svg">>;
         path: string;
         label: string
     }>
 }

 export const LeftNavBar = (props: ILeftNavProps) => {
     const navigations =  props.navigations || [];

     return (
         <nav className={`${styles.leftNav} left-nav-bar`}>
                {
                    navigations.map((navItem) => {
                        const IconComp: any = navItem.icon;

                        return (
                            <NavLink to={navItem.path} key={navItem.name}
                                     activeClassName={styles.activeNav}
                                     className={`${styles.navItem} left-nav-item left-nav-item-${navItem.name}`}>
                                <span className={styles.icon}><IconComp color="primary" /></span>
                                <span>{navItem.label}</span>
                            </NavLink>
                        );
                    })
                }
         </nav>
     );
 }