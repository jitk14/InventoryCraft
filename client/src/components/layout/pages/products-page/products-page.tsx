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
import _find from 'lodash/find';
import _isEquals from 'lodash/isEqual';
import {Loader} from "../../../helper/loader/loader";

const ROW_IDENTIFIER = 'productId';

interface IProdsState {
    isLoading: boolean;
    productsData: Array<any>,
    categories: any;
    productsEditState?:any
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
            categories: {},
            productsEditState: {}
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

    deleteProduct() {

    }

    enableEntryEdit = (productId: string, entryData: any) => {
        const productsEditState = {...this.state.productsEditState};
        this.setState({
            productsEditState: {...productsEditState, ...{
                    [productId]: {
                        editing: true,
                        data: {...(_find(this.state.productsData, {productId})) || {}}
                }}}
        });
    }

    clearEntryEdit = (productId: string) => {
        const productsEditState = {...this.state.productsEditState};
        delete productsEditState[productId];

        this.setState({
            productsEditState
        });
    }

    handleProductPropertyChange = (productId: string, propertyName: string, value:any) => {
        const product = this.state.productsEditState[productId] || {};

        if (product.editing) {
            product.data = product.data || {};
            product.data[propertyName] = value;

            const productsEditState = {...this.state.productsEditState};
            this.setState({
                productsEditState: {...productsEditState, ...{
                    [productId]: product
                }
            }});
        }
    }

    getCellHandlers() {
        return {
            enableEntryEdit: this.enableEntryEdit,
            clearEntryEdit: this.clearEntryEdit,
            updateProduct: this.updateProduct,
            handleProductPropertyChange: this.handleProductPropertyChange
        }
    }

    updateProduct = (productId: string) => {
        //@todo validations
        const productData = this.state.productsEditState[productId] || {};
        const existingData: any = _find(this.state.productsData, {productId: productId});

        if (_isEquals(productData.data, existingData)) {
            alert("Nothing has changed to update");
            return;
        }

        if (productData.editing) {
            this.setState({
                isLoading: true
            })
            axios.post('http://localhost:8000/update', {...productData.data}).then(() => {
                this.clearEntryEdit(productId);
                this.replaceProductData(productData);
            }).catch((err) => {
                alert("Something went wrong, product update was unsuccessful");
            }).finally(() => {
                this.setState({
                    isLoading: false
                })
            })
        }

    }

    replaceProductData = (updatedProduct: any) => {
        let productsData = this.state.productsData || [];

        productsData = productsData.map((product) => {
            if (updatedProduct.data.productId === product.productId) {
                return updatedProduct.data;
            }

            return product;
        });

        this.setState({
            productsData
        })
    }

    render() {
        const table =  (<div className={'invt-product-page'}>
            <DataTable data={this.state.productsData} columns={columnsDef} identifierKey={ROW_IDENTIFIER}
                       perPageViewLengths={this.perPageViewLength} metaData={{productsEditState: this.state.productsEditState}}
                        handlers={this.getCellHandlers()}/>
        </div>);

        const loader = <Loader occupyFull={true}/>;

        return (<React.Fragment>
                {(this.state.isLoading) ? loader : null}
                {table}
        </React.Fragment>
        );
    }
}