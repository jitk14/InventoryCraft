import React from "react";
import loaderStyles from './loader.module.scss';
import {CircularProgress} from "@material-ui/core";

interface ILoaderProps {
    occupyFull: boolean; // full occupy container, container should have relative or absolute positioning
    style?: Record<string, any>;
    size?: number;
    color?: string;
    bgOpacity? : number;
}

export const Loader = (props: ILoaderProps) => {
    const getWrapperClass = () => {
        const occupyFullClass = props.occupyFull ? loaderStyles.occupyParent : '';
        return `${occupyFullClass} flex-container`;
    };

    return (
        <ul className={getWrapperClass()} style={props.style} >
            <li style={{opacity: props.bgOpacity || '0.4'}} className={loaderStyles.backDrop}></li>
            <li className={'flex-container flex-child items-center'}>
                <div className={'flex-child'}>
                    <CircularProgress size={props.size}/>
                </div>
            </li>
        </ul>
    );
};