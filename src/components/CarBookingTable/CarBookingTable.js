import React, { useState, useEffect, useRef } from 'react';
import './CarBookingTable.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import 'primeicons/primeicons.css';
import { CabBooking } from '../../services/apiCapRegister/apiCapRegister';
import { CarBookingData } from '../../services/apiCapRegister/apiCapRegister';
const CarBookingTable = () =>{
  let emptyProduct = {
    _id:'',
    username: '',
    email: '',
    status: null,
};

const [products, setProducts] = useState(null);
const [load, setLoad]=useState(false)
const [productDialog, setProductDialog] = useState(false);
const [product, setProduct] = useState(emptyProduct);
const [selectedProducts, setSelectedProducts] = useState(null);
const [globalFilter, setGlobalFilter] = useState(null);
const toast = useRef(null);
const dt = useRef(null);
useEffect(() => {
  CarBookingData().then(res=>{
    const data=res.data
    console.log(data)

  const datas=  data.map(each=>{
        const id= Number(data.indexOf(each))+1
        return {...each,id}
    })
    setProducts(datas)
  })
  setLoad(true)
},[]); // eslint-disable-line react-hooks/exhaustive-deps
const hideDialog = () => {
    setProductDialog(false);
}
const viewProduct = (product) => {
    setProduct({...product});
    setProductDialog(true);
}
const statusBodyTemplate = (rowData) => {
    return <span className={`product-badge status-${rowData.status}`}>{rowData.status}</span>;
}
const actionBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
            <Button icon="pi pi-eye" className="p-button-rounded p-button-success mr-2" onClick={() => viewProduct(rowData)} />
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
return (
    
  load &&
    <div className="datatable-crud-demo " data-testid="CarBookingTable">
       
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
                                   <p className='col-6 fs-6'>{product.paid_amount}</p>
                               </div>
                              
                              
                               <div className='col-12 d-flex'>
                                   <h5 className='col-6 fs-6'> Status:</h5>
                                   <p className='col-6'>{product.status}</p>
                               </div>
                               <div className='col-12 d-flex'>
                                   <h5 className='col-6 fs-6'> Journey:</h5>
                                   <p className='col-6'>{product.journey}</p>
                               </div>
                               <div className='col-12 d-flex'>
                                   <h5 className='col-6 fs-6'> Payment Id:</h5>
                                   <p className='col-6'>{product.razorpay_payment_id}</p>
                               </div>
                           </div>
                       </div>
                   </Dialog>
    </div>
         
);
       }


CarBookingTable.propTypes = {};

CarBookingTable.defaultProps = {};

export default CarBookingTable;
