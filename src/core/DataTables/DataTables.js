import PropTypes from 'prop-types';
import './DataTables.css'
import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import { Dialog } from 'primereact/dialog';
import { GetUser , UpdateUser,RegisterUser,DeleteUser,ImportUser} from '../../services/UserService/UserService';
import 'primeicons/primeicons.css';
import Context from '../../services/Context/Context';
import { parse } from 'papaparse';
const DataTables = (props) => {
    let emptyProduct = {
        userId: '',
        Name: '',
        Email: '',
        otp_status: null,
        Password:'',
        Gender:'',
        Phonenumber:''
    };
    const [products, setProducts] = useState(null);
    const [load, setLoad] = useState(false)
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [showPassword, setShowPassword]=useState(false)
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
   
    const saveProduct = () => {
        setSubmitted(true);
        let _products = [...products];
        let _product = { ...product };
        const index = findIndexById(product.id);
        _products[index] = _product;
        const isUpdated = products.filter(each => each._id === _product._id)
        if (isUpdated.length === 0) {
            const details = {
                Name: product.Name,
                Email: product.Email,
                otp_status: product.otp_status,
                Phonenumber:product.Phonenumber,
                Gender:product.Gender,
                Password:product.Password
            }
            console.log(details)
            RegisterUser(details).then(res => {
                const data = res.data
               
                _products.push({ ...data });
                console.log(_products)
                setProducts(_products)
                setProduct(emptyProduct);
            })
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000, });
        }
        else {
            
            UpdateUser(_product).then(res => {
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
      
        DeleteUser(product.userId).then(res => {
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
            ImportUser(parsedData.slice(0, -1)).then(res => {
                const _products = [...products, ...res.data];
                setProducts(_products);
            })
        };
        reader.readAsText(filess);
    }
    const exportCSV = () => {
        dt.current.exportCSV();
    }

    const onCategoryChange = (e) => {
        let _product = { ...product };
        _product['otp_status'] = e.value;
        setProduct(_product);
    }
    const onCategoryChangeGender = (e) => {
        let _product = { ...product };
        _product['Gender'] = e.value;
        setProduct(_product);
    }
    const onInputChange = (e, username) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };
        _product[`${username}`] = val;
        setProduct(_product);
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
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
        <div className="table-header ">
            <h5 className="mx-0 my-1">Manage Users</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText className='' type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
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
    // const deleteProductsDialogFooter = (
    //     <React.Fragment>
    //         <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductsDialog} />
    //         <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedProducts} />
    //     </React.Fragment>
    // );
    return (
        <Context.Consumer>
            {value => {
                const { sidebar } = value
                return (
                    load &&
                    <div className="datatable-crud-demo " data-testid="DataTables">
                        <div className={`cards ${sidebar ? 'sidebar-table' : ''}`}>
                            <Toolbar className="mb-4  " left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                            <Toast ref={toast} />
                            <DataTable className="" ref={dt} value={products} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                                dataKey="_id" paginator rows={5} rowsPerPageOptions={[5, 10, 25]}
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
                                globalFilter={globalFilter} header={header} responsiveLayout="scroll" >
                                <Column className="" field="userId" header="User Id" sortable style={{ minWidth: '12rem' }}></Column>
                                {/* //<Column field="createdAt" header="Date Created" sortable style={{ minWidth: '12rem' }}></Column> */}
                                <Column className="" field="Name" header="Name" sortable style={{ minWidth: '16rem' }}></Column>
                                <Column className="" field="Email" header="Email" sortable style={{ minWidth: '10rem' }}></Column>
                                <Column className="" field="otp_status" header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }} ></Column>
                                <Column className="" body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                            </DataTable>
                        </div>
                        <Dialog visible={productDialog} style={{ width: '450px' }} header="User Details" modal className="p-fluid " footer={productDialogFooter} onHide={hideDialog}>
                            <div className="field ">
                                <label htmlFor="username">Name</label>
                                <InputText id="username" value={product.Name} onChange={(e) => onInputChange(e, 'Name')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.username })} />
                                {submitted && !product.Name && <small className="p-error">Name is required.</small>}
                            </div>
                            <div className="field">
                                <label htmlFor="email">Email</label>
                                <InputText id="email" value={product.Email} onChange={(e) => onInputChange(e, 'Email')} required />
                            </div>
                            <div className="field">
                                <label htmlFor="phone">Phone Number</label>
                                <InputText id="phoneNumber" value={product.Phonenumber} onChange={(e) => onInputChange(e, 'Phonenumber')} required />
                            </div>
                            <div className="field">
                                <label htmlFor="password">Password</label>
                                <div className='input-group'>
                                    <div className='text-end'>
                                {showPassword ? <i className="bi bi-eye-slash input-group-text " onClick={()=>setShowPassword(!showPassword)}></i>:<i className="bi bi-eye input-group-text"  onClick={()=>setShowPassword(!showPassword)}></i>}</div>
                                <InputText id="password" value={product.Password} type={showPassword?"text" :'password'}  onChange={(e) => onInputChange(e, 'Password')} required /> 
                                </div>
                            </div>
                            <div className="field">
                                <label className="mb-3">Status</label>
                                <div className="formgrid grid">
                                    <div className="field-radiobutton col-6">
                                        <RadioButton inputId="category1" name="status" value="verified" onChange={onCategoryChange} checked={product.otp_status === 'verified'} />
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
                                        <RadioButton inputId="category3" name="Gender" value="Male" onChange={onCategoryChangeGender} checked={product.Gender === 'Male'} />
                                        <label htmlFor="category3">Male</label>
                                    </div>
                                    <div className="field-radiobutton col-6">
                                        <RadioButton inputId="category4" name="Gender" value="Female" onChange={onCategoryChangeGender} checked={product.Gender === 'Female'} />
                                        <label htmlFor="category4">Female</label>
                                    </div>
                                </div>
                            </div>
                        </Dialog>
                        <Dialog  visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                            <div className="confirmation-content">
                                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                                {product && <span>Are you sure you want to delete <b>{product.name}</b>?</span>}
                            </div>
                        </Dialog>
                        {/* <Dialog  visible={deleteProductsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                            <div className="confirmation-content">
                                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                                {product && <span>Are you sure you want to delete the selected products?</span>}
                            </div>
                        </Dialog> */}
                    </div>
                )
            }}
        </Context.Consumer>
    );
}
DataTables.propTypes = {};
DataTables.defaultProps = {};
export default DataTables;
