import PropTypes from 'prop-types';
import './DataTables.css'
import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import { Dialog } from 'primereact/dialog';
import { GetUser } from '../../services/UserService/UserService';
import { DeleteUserApi } from '../../services/UserService/UserService';
import { UserService } from '../../services/UserService/UserService';
import 'primeicons/primeicons.css';
import { DeleteMultipleUserApi } from '../../services/UserService/UserService';
import { UpdateUserApi } from '../../services/UserService/UserService';
import { elementAcceptingRef } from '@mui/utils';
import Context from '../../services/Context/Context';
import { parse } from 'papaparse';
import { importUser } from '../../services/UserService/UserService';
const DataTables = (props) => {
    let emptyProduct = {
        _id: '',
        username: '',
        email: '',
        status: null,
    };
    const [products, setProducts] = useState(null);
    const [load, setLoad] = useState(false)
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const [filess, setFile] = useState()
    useEffect(() => {
        GetUser().then(res => {
            const data = res.data
           console.log(data)
            setProducts(data)
        })
        setLoad(true)
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    }
    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    }
    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    }
    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    }
    const saveProduct = () => {
        setSubmitted(true);
        let _products = [...products];
        let _product = { ...product };
        const index = findIndexById(product.id);
        _products[index] = _product;
        const isUpdated = products.filter(each => each._id === _product._id)
        if (isUpdated.length === 0) {
            const details = {
                username: product.username,
                email: product.email,
                status: product.status,
            }
            UserService(details).then(res => {
                const data = res.data
                const id = products.length + 1
                _products.push({ ...data, id });
                setProducts(_products)
                setProduct(emptyProduct);
            })
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000, });
        }
        else {
            const data = {
                username: _product.username,
                status: _product.status,
                email: _product.email,
            }
            UpdateUserApi(_product).then(res => {
                const dataId = res.data._id
                const id = products.findIndex(each => {
                    if (each._id === dataId) {
                        return each._id
                    }
                })
                const sId = (products[id].id)
                products[id] = { ...res.data, id: sId }
                setProducts(products)
                setProduct(emptyProduct);
            }).catch(err => {
            })
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
        }
        setProductDialog(false);
    }
    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    }
    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    }
    const deleteProduct = () => {
        DeleteUserApi(product._id).then(res => {
            let _products = products.filter(val => val._id !== product._id);
            setProducts(_products);
            setDeleteProductDialog(false);
            setProduct(emptyProduct);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        })
    }
    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }
    const importCSV = () => {
        const reader = new FileReader();
        // Event listener on reader when the file
        // loads, we parse it and set the data.
        reader.onload = async ({ target }) => {
            const csv = parse(target.result, { header: true });
            const parsedData = csv?.data;
            const columns = Object.keys(parsedData[0]);
            const data = parsedData.slice(0, -1)
            importUser(parsedData.slice(0, -1)).then(res => {
                const _products = [...products, ...res.data];
                setProducts(_products);
            })
        };
        reader.readAsText(filess);
    }
    const exportCSV = () => {
        dt.current.exportCSV();
    }
    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    }
    const deleteSelectedProducts = () => {
        const data = {
            id: "asdf",
        }
        const ids = selectedProducts.map(each => {
            var data = { "_id": each._id }
            return data
        })
        DeleteMultipleUserApi(ids).then(res => {
        })
        let _products = products.filter(val => !selectedProducts.includes(val));
        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    }
    const onCategoryChange = (e) => {
        let _product = { ...product };
        _product['status'] = e.value;
        setProduct(_product);
    }
    const onInputChange = (e, username) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };
        _product[`${username}`] = val;
        setProduct(_product);
    }
    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = { ...product };
        _product[`${name}`] = val;
        setProduct(_product);
    }
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
            </React.Fragment>
        )
    }
    function handleChange(event) {
        setFile(event.target.files[0])
    }
    const rightToolbarTemplate = () => {
        return (
            <>
                {/* <FileUpload mode="basic" name="demo[]" auto url={"/api/upload"} accept=".csv" chooseLabel="Import" className="mr-2 inline-block" onUpload={importCSV} /> */}
                <div className='flex'>
                <input className='ms-0' type="file" accept=".csv" onChange={handleChange} />
                <Button className=' mt-3 me-3 ms-0 p-button-success ' icon="pi pi-download" onClick={importCSV}  label="Import" />
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
                </div>
            </>
        )
    }
    const statusBodyTemplate = (rowData) => {
       
        return <span className={`product-badge status-${rowData.otp_status}`}>{rowData.otp_status}</span>;
    }
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    }
    const header = (
        <div className="table-header dark-bg">
            <h5 className="mx-0 my-1">Manage Users</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText className='dark-bg' type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
        </React.Fragment>
    );
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
        </React.Fragment>
    );
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedProducts} />
        </React.Fragment>
    );
    return (
        <Context.Consumer>
            {value => {
                const { sidebar } = value
                return (
                    load &&
                    <div className="datatable-crud-demo " data-testid="DataTables">
                        <div className={`cards ${sidebar ? 'sidebar-table' : ''}`}>
                            <Toolbar className="mb-4 dark-bg " left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                            <Toast ref={toast} />
                            <DataTable className="dark-bg" ref={dt} value={products} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                                dataKey="_id" paginator rows={5} rowsPerPageOptions={[5, 10, 25]}
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
                                globalFilter={globalFilter} header={header} responsiveLayout="scroll" >
                                {<Column className="dark-bg" selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>}
                                <Column className="dark-bg" field="userId" header="User Id" sortable style={{ minWidth: '12rem' }}></Column>
                                {/* //<Column field="createdAt" header="Date Created" sortable style={{ minWidth: '12rem' }}></Column> */}
                                <Column className="dark-bg" field="Name" header="Name" sortable style={{ minWidth: '16rem' }}></Column>
                                <Column className="dark-bg" field="Email" header="Email" sortable style={{ minWidth: '10rem' }}></Column>
                                <Column className="dark-bg" field="otp_status" header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }} ></Column>
                                <Column className="dark-bg" body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                            </DataTable>
                        </div>
                        <Dialog visible={productDialog} style={{ width: '450px' }} header="User Details" modal className="p-fluid dark-bg" footer={productDialogFooter} onHide={hideDialog}>
                            <div className="field ">
                                <label htmlFor="username">Name</label>
                                <InputText id="username" value={product.Name} onChange={(e) => onInputChange(e, 'username')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.username })} />
                                {submitted && !product.Name && <small className="p-error">Name is required.</small>}
                            </div>
                            <div className="field">
                                <label htmlFor="email">Email</label>
                                <InputText id="email" value={product.Email} onChange={(e) => onInputChange(e, 'email')} required />
                            </div>
                            <div className="field">
                                <label htmlFor="email">Phone Number</label>
                                <InputText id="phoneNumber" value={product.Phonenumber} onChange={(e) => onInputChange(e, 'Phonenumber')} required />
                            </div>
                            <div className="field">
                                <label className="mb-3">Status</label>
                                <div className="formgrid grid">
                                    <div className="field-radiobutton col-6">
                                        <RadioButton inputId="category1" name="status" value="verifed" onChange={onCategoryChange} checked={product.otp_status === 'verified'} />
                                        <label htmlFor="category1">Verified</label>
                                    </div>
                                    <div className="field-radiobutton col-6">
                                        <RadioButton inputId="category2" name="status" value="not verified" onChange={onCategoryChange} checked={product.otp_status === 'not verified'} />
                                        <label htmlFor="category2">Not Verified</label>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <label className="mb-3">Gender</label>
                                <div className="formgrid grid">
                                    <div className="field-radiobutton col-6">
                                        <RadioButton inputId="category1" name="Gender" value="male" onChange={onCategoryChange} checked={product.Gender === 'Male'} />
                                        <label htmlFor="category1">Male</label>
                                    </div>
                                    <div className="field-radiobutton col-6">
                                        <RadioButton inputId="category2" name="Gender" value="female" onChange={onCategoryChange} checked={product.Gender === 'Female'} />
                                        <label htmlFor="category2">Female</label>
                                    </div>
                                </div>
                            </div>
                        </Dialog>
                        <Dialog dark-bg visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                            <div className="confirmation-content">
                                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                                {product && <span>Are you sure you want to delete <b>{product.name}</b>?</span>}
                            </div>
                        </Dialog>
                        <Dialog dark-bg visible={deleteProductsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                            <div className="confirmation-content">
                                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                                {product && <span>Are you sure you want to delete the selected products?</span>}
                            </div>
                        </Dialog>
                    </div>
                )
            }}
        </Context.Consumer>
    );
}
DataTables.propTypes = {};
DataTables.defaultProps = {};
export default DataTables;
