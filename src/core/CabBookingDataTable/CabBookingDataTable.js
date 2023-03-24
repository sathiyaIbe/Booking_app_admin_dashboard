import PropTypes from 'prop-types';
import './CabBookingDataTable.css';
import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { ApiCapGet } from '../../services/apiCapRegister/apiCapRegister';
import { GetUserDetailsApi } from '../../services/UserService/UserService';
import { DeleteUserApi } from '../../services/UserService/UserService';
import { UserService } from '../../services/UserService/UserService';
import 'primeicons/primeicons.css';
import { DeleteMultipleUserApi } from '../../services/UserService/UserService';
import { UpdateUserApi } from '../../services/UserService/UserService';
import { elementAcceptingRef } from '@mui/utils';
import Context from '../../services/Context/Context';
import { CabBooking } from '../../services/apiCapRegister/apiCapRegister';
const CabBookingDataTable = (props) =>{
  let emptyProduct = {
    _id:'',
    username: '',
    email: '',
    status: null,
};
const [products, setProducts] = useState(null);
const [load, setLoad]=useState(false)
const [productDialog, setProductDialog] = useState(false);
const [deleteProductDialog, setDeleteProductDialog] = useState(false);
const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
const [product, setProduct] = useState(emptyProduct);
const [selectedProducts, setSelectedProducts] = useState(null);
const [submitted, setSubmitted] = useState(false);
const [globalFilter, setGlobalFilter] = useState(null);
const toast = useRef(null);
const dt = useRef(null);
useEffect(() => {
  CabBooking().then(res=>{
    const data=res.data
    console.log(res.data)
  const datas=  data.map(each=>{
        const id= Number(data.indexOf(each))+1
        return {...each,id}
    })
    console.log(datas)
    setProducts(datas)
  })
  setLoad(true)
},[]); // eslint-disable-line react-hooks/exhaustive-deps
const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}
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
        let _product = {...product};
            const index = findIndexById(product.id);
            _products[index] = _product;
          const isUpdated=products.filter(each=>each._id===_product._id)
            if (isUpdated.length===0) {
                const details={
                    username: product.username,
                    email:product.email,
                    status:product.status,
                }
                console.log(details)
                UserService(details).then(res=>{
                    const data=res.data
                     const id=products.length + 1
                     _products.push({...data,id});
                    setProducts(_products)
                    setProduct(emptyProduct);
                })
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000, });
        }
        else {
            const data={
                username:_product.username,
                status: _product.status,
                email:_product.email,
            }
            UpdateUserApi(_product).then(res=>{
                const dataId=res.data._id
                const id=products.findIndex(each=>{
                    if (each._id===dataId){
                        return each._id
                    }
                })
               console.log(res.data)
               const sId=(products[id].id)
              products[id]={...res.data,id:sId}
              console.log(products)
              setProducts(products)
              setProduct(emptyProduct);
            }).catch(err=>{
                console.log(err)
            })
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
        }
              setProductDialog(false);
}
const editProduct = (product) => {
    setProduct({...product});
    setProductDialog(true);
}
const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
}
const deleteProduct = () => {
  DeleteUserApi(product._id).then(res=>{
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
const createId = () => {
    let id = '';
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}
const importCSV = (e) => {
    const file = e.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        const csv = e.target.result;
        const data = csv.split('\n');
        // Prepare DataTable
        const cols = data[0].replace(/['"]+/g, '').split(',');
        data.shift();
        const importedData = data.map(d => {
            d = d.split(',');
            const processedData = cols.reduce((obj, c, i) => {
                c = c === 'Status' ? 'inventoryStatus' : (c === 'Reviews' ? 'rating' : c.toLowerCase());
                obj[c] = d[i].replace(/['"]+/g, '');
                (c === 'price' || c === 'rating') && (obj[c] = parseFloat(obj[c]));
                return obj;
            }, {});
            processedData['id'] = createId();
            return processedData;
        });
        const _products = [...products, ...importedData];
        setProducts(_products);
    };
    reader.readAsText(file, 'UTF-8');
}
const exportCSV = () => {
    dt.current.exportCSV();
}
const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
}
const deleteSelectedProducts = () => {
  const data={
    id:"asdf",
  }
   const ids=selectedProducts.map(each=>{
   var data ={"_id": each._id}
    return data
   })
    DeleteMultipleUserApi(ids).then(res=>{
        console.log('deleted multiple')
    })
    let _products = products.filter(val => !selectedProducts.includes(val));
    setProducts(_products);
    setDeleteProductsDialog(false);
    setSelectedProducts(null);
    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
}
const onCategoryChange = (e) => {
    let _product = {...product};
    _product['status'] = e.value;
    setProduct(_product);
}
const onInputChange = (e, username) => {
    const val = (e.target && e.target.value) || '';
    let _product = {...product};
    _product[`${username}`] = val;
    setProduct(_product);
}
const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _product = {...product};
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
const rightToolbarTemplate = () => {
    return (
        <React.Fragment  >
            <FileUpload mode="basic" name="demo[]" auto url="https://primefaces.org/primereact/showcase/upload.php" accept=".csv" chooseLabel="Import" className="mr-2 inline-block" onUpload={importCSV} />
            <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
        </React.Fragment>
    )
}
const statusBodyTemplate = (rowData) => {
    return <span className={`product-badge status-${rowData.status}`}>{rowData.status}</span>;
}
const actionBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
            <Button icon="pi pi-eye" className="p-button-rounded p-button-success mr-2" onClick={() => editProduct(rowData)} />
        </React.Fragment>
    );
}
const header = (
    <div className="table-header dark-bg">
        <h5 className="mx-0 my-1">Bookings Data</h5>
        <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText className='dark-bg'  type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
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
        {value=>{
       const  {sidebar}=value
       return(
  load &&
    <div className="datatable-crud-demo " data-testid="CabBookingDataTable">
        <div className={`cards ${sidebar ?'sidebar-table' :''}`}>
            {/* <Toolbar   className="mb-4 dark-bg " left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar> */}
            <Toast ref={toast}  />
            <DataTable   className="dark-bg" ref={dt} value={products} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                dataKey="_id" paginator rows={5} rowsPerPageOptions={[5, 10, 25]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
                globalFilter={globalFilter} header={header} responsiveLayout="scroll" >
                <Column  className="dark-bg" field="customer_id" header="User Id" sortable style={{ minWidth: '10rem' }}></Column>
                {/* //<Column field="createdAt" header="Date Created" sortable style={{ minWidth: '12rem' }}></Column> */}
                <Column  className="dark-bg" field="customer_name" header="Name" sortable style={{ minWidth: '10rem' }}></Column>
              
                <Column className="dark-bg" field="Email" header="Email" sortable style={{ minWidth: '10rem' }}></Column>
                <Column className="dark-bg" field="razorpay_payment_id" header="Payement Id" sortable style={{ minWidth: '10rem' }}></Column>
                <Column className="dark-bg" field="status" header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '10rem' }} ></Column>
                <Column className="dark-bg" body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
            </DataTable>
        </div>
                   <Dialog visible={productDialog} style={{ width: '450px' }} header="Booking Details" modal className="p-fluid dark-bg" onHide={hideDialog}>
                       <div className="container">
                           <div className='row'>
                               <div className='col-12 d-flex'>
                                   <h5 className='col-6 fs-6'>Booking Id</h5>
                                   <p className='col-6'>{product.booking_id}</p>
                               </div>
                               <div className='col-12 d-flex'>
                                   <h5 className='col-6 fs-6'> Customer Id:</h5>
                                   <p className='col-6'>{product.customer_id}</p>
                               </div>
                               <div className='col-12 d-flex'>
                                   <h5 className='col-6 fs-6'>Customer Name: </h5>
                                   <p className='col-6'>{product.customer_name}</p>
                               </div>
                               <div className='col-12 d-flex'>
                                   <h5 className='col-6 fs-6'> Email:</h5>
                                   <p className='col-6'>{product.Email}</p>
                               </div>
                               <div className='col-12 d-flex'>
                                   <h5 className='col-6 fs-6'> Customer Mobile No:</h5>
                                   <p className='col-6'>{product.mobile}</p>
                               </div>
                               <div className='col-12 d-flex'>
                                   <h5 className='col-6 fs-6'> Total Amount:</h5>
                                   <p className='col-6 fs-6'>{product.total_amount}</p>
                               </div>
                               <div className='col-12 d-flex'>
                                   <h5 className='col-6 fs-6'> From Location:</h5>
                                   <p className='col-6'>{product.from_location}</p>
                               </div>
                               <div className='col-12 d-flex'>
                                   <h5 className='col-6 fs-6'>To Location:</h5>
                                   <p className='col-6'>{product.to_location}</p>
                               </div>
                               <div className='col-12 d-flex'>
                                   <h5 className='col-6 fs-6'> Status:</h5>
                                   <p className='col-6'>{product.status}</p>
                               </div>
                               <div className='col-12 d-flex'>
                                   <h5 className='col-6 fs-6'> Payment Id:</h5>
                                   <p className='col-6'>{product.razorpay_payment_id}</p>
                               </div>
                           </div>
                       </div>
                   </Dialog>
        <Dialog dark-bg visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
            <div className="confirmation-content">
                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                {product && <span>Are you sure you want to delete <b>{product.name}</b>?</span>}
            </div>
        </Dialog>
        <Dialog dark-bg visible={deleteProductsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
            <div className="confirmation-content">
                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                {product && <span>Are you sure you want to delete the selected products?</span>}
            </div>
        </Dialog>
    </div>
)}}
</Context.Consumer>           
);
       }
CabBookingDataTable.propTypes = {};
CabBookingDataTable.defaultProps = {};
export default CabBookingDataTable;
