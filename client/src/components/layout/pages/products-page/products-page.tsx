import React from "react";
import {DataTable} from "../../../data-table/data-table";
import {ColumnCell} from "../../../data-table/table-head/table-head";
import {SortTypes} from "../../../../constants/app-constants";
import {LinkBox} from "./link-box-cell/link-box";
import {PlainTextCell} from "./plain-text-cell/plain-text-cell";
import {ActionCell} from "./action-cell/action-cell";
import {SelectCell} from "./select-cell/select-cell";
import {QuantityTextCell} from "./quantity-text-cell/quantity-text-cell";
import axios from 'axios';
import {Loader} from "../../../helper/loader/loader";

const ROW_IDENTIFIER = 'productId';

interface IProdsState {
    isLoading: boolean;
    productsData: Array<any>,
    categories: any;
}

const columnsDef:Array<ColumnCell> = [
    {label: '', columnKey: 'selectItem', sortable: false, renderer: SelectCell},
    {label: 'Product Name', columnKey: 'productName', sortedType: SortTypes.ASC, renderer: PlainTextCell},
    {label: 'Quantity', columnKey: 'quantity', renderer: QuantityTextCell, asNumber: true},
    {label: 'Category', columnKey: 'category', renderer: PlainTextCell},
    {label: 'Price per Unit', columnKey: 'pricePerUnit', renderer: PlainTextCell, asNumber: true},
    {label: 'Shelf', columnKey: 'shelfNumber', renderer: PlainTextCell},
    {label: 'Vendor Link', sortable: false, columnKey: 'vendorLink', renderer: LinkBox},
    {label: 'Action', sortable: false, columnKey: 'dataActions', renderer: ActionCell},
];

export class ProductsPage extends React.Component<any, IProdsState> {
    readonly perPageViewLength = [10,20,30,40,50,100];

    constructor(props: any) {
        super(props);

        this.state = {
            isLoading: true,
            productsData: [],
            categories: {}
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:8000/inventory`)
            .then(res => {
                this.setState({
                    productsData: res.data.data,
                    categories: res.data.categories,
                    isLoading: false
                });
            });
    }

    render() {
        const table =  (<div className={'invt-product-page'}>
            <DataTable data={this.state.productsData} columns={columnsDef} identifierKey={ROW_IDENTIFIER}
                       perPageViewLengths={this.perPageViewLength}/>
        </div>);

        const loader = <Loader occupyFull={true}/>;

        return (<React.Fragment>
                {(this.state.isLoading) ? loader : table}
        </React.Fragment>
        );
    }
}