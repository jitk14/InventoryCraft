import React, {useEffect, useState} from 'react';
import {ICellProps} from "../../../../data-table/data-table";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import _get from 'lodash/get';

export const ActionCell = (props: ICellProps) => {
    const cellData:any = props.cellData || {};
    const editCell = _get(props, `metaData.productsEditState.${cellData.productId}.editing`);

    const [editing, setEditing] = useState(false);

    useEffect(() => {
        if(!editCell) {
            setEditing(false);
        }
    }, [editCell]);

    const enableEditing = (_ev: any) => {
        setEditing(true);

        const enableEdit = _get(props, 'handlers.enableEntryEdit');
        enableEdit && enableEdit(cellData.productId, cellData);
    }

    const disableEditing = (_ev: any) => {
        setEditing(false);

        const clearEntryEdit = _get(props, 'handlers.clearEntryEdit');
        clearEntryEdit && clearEntryEdit(cellData.productId);

    }

    const updateProduct =  (_ev: any) => {
        const updateProduct = _get(props, 'handlers.updateProduct');
        updateProduct && updateProduct(cellData.productId);
    }

    const renderSaveIcons = () => {
        return (
            <React.Fragment>
                <SaveIcon onClick={updateProduct}/>
                <CancelIcon onClick={disableEditing}/>
            </React.Fragment>
        );
    }

    const renderActionIcons = () => {
        return (
            <React.Fragment>
                <EditIcon onClick={enableEditing}/>
                <DeleteIcon onClick={() => {alert("Delete: " + cellData.productId)}}/>
            </React.Fragment>
        );
    }

    return editing ?  renderSaveIcons(): renderActionIcons();
}