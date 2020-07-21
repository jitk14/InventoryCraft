import React from "react";
import {DataTable} from "../../../data-table/data-table";
import {ColumnCell} from "../../../data-table/table-head/table-head";
import {SortTypes} from "../../../../constants/app-constants";
import {LinkBox} from "./link-box-cell/link-box";
import {PlainTextCell} from "./plain-text-cell/plain-text-cell";
import {ActionCell} from "./action-cell/action-cell";
import {SelectCell} from "./select-cell/select-cell";

const ROW_IDENTIFIER = 'productId';

const columnsDef:Array<ColumnCell> = [
    {label: '', columnKey: 'selectItem', sortable: false, renderer: SelectCell},
    {label: 'Product Name', columnKey: 'productName', sortedType: SortTypes.ASC, renderer: PlainTextCell},
    {label: 'Quantity', columnKey: 'quantity', renderer: PlainTextCell},
    {label: 'Category', columnKey: 'category', renderer: PlainTextCell},
    {label: 'Price per Unit', columnKey: 'pricePerUnit', renderer: PlainTextCell},
    {label: 'Shelf', columnKey: 'shelfId', renderer: PlainTextCell},
    {label: 'Vendor Link', columnKey: 'vendorLink', renderer: LinkBox},
    {label: 'Action', columnKey: 'dataActions', renderer: ActionCell},
];

const productData = [
    {productId: '1', productName: 'Iron n Aircraft', category: 'Aviation', quantity: '5', pricePerUnit: '100', shelfId: '2DRT', vendorLink: 'https://vendor.example.com'},
    {productId: '2', productName: 'Iron n Aircraft', category: 'Aviation', quantity: '14', pricePerUnit: '300', shelfId: '2MRT', vendorLink: 'https://vendor.example.com'},
    {productId: '3', productName: 'Iron n Aircraft', category: 'Aviation', quantity: '54', pricePerUnit: '600', shelfId: '2FRT', vendorLink: 'https://vendor.example.com'},
    {productId: '4', productName: 'Iron n Aircraft', category: 'Aviation', quantity: '102', pricePerUnit: '700', shelfId: '2GRT', vendorLink: 'https://vendor.example.com'},
    {productId: '5', productName: 'Iron n Aircraft', category: 'Aviation', quantity: '25', pricePerUnit: '800', shelfId: '2TRT', vendorLink: 'https://vendor.example.com'},
    {productId: '6', productName: 'Iron n Aircraft', category: 'Aviation', quantity: '257', pricePerUnit: '100', shelfId: '2HRT', vendorLink: 'https://vendor.example.com'},
    {productId: '7', productName: 'Iron n Aircraft', category: 'Aviation', quantity: '0', pricePerUnit: '400', shelfId: '2VRT', vendorLink: 'https://vendor.example.com'}
];

export class ProductsPage extends React.Component<any, any> {
    readonly perPageViewLength = [1,2,3,4,5];

    render() {
        return (
            <div className={'invt-product-page'}>
                <DataTable data={productData} columns={columnsDef} identifierKey={ROW_IDENTIFIER}
                           perPageViewLengths={this.perPageViewLength}/>
            </div>
        );
    }
}