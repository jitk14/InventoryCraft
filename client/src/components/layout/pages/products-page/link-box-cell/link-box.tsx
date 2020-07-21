import React from "react";
import {ICellProps} from "../../../../data-table/data-table";

export const LinkBox = (props: ICellProps) => {
    const cellData = props.cellData || {};

    return (
        <div>
            <a target={'_blank'} href={cellData.vendorLink}> { 'Link' } </a>
        </div>
    );
}