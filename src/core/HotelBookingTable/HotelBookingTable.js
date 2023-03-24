import PropTypes from 'prop-types';
import './HotelBookingTable.css';
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
import { hotelBookingDetails } from '../../services/Api.Hotel.Service/Api.Hotel.Service';

const HotelBookingTable = (props) =>{

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
  hotelBookingDetails().then(res=>{
    const data=res.data
  const datas=  data.map(each=>{
        const id= Number(data.indexOf(each))+1
        return {...each,id}
    })

    setProducts(datas)
  })
  setLoad(true)
},[]);

const header = (
  <div className="table-header d-flex justify-content-between dark-bg">
      <h5 className="mx-0 my-1">Bookings Data</h5>
      <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText className='dark-bg'  type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
      </span>
  </div>
);

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

const hideDialog = () => {
  setSubmitted(false);
  setProductDialog(false);
}
const editProduct = (product) => {
  setProduct({...product});
  setProductDialog(true);
}

return(
  <Context.Consumer>
  {value=>{
 const  {sidebar}=value
 return(
load &&
  <div className="HotelBookingTable" data-testid="HotelBookingTable">

    <div className={`cards ${sidebar ?'sidebar-table' :''}`}>
            {/* <Toolbar   className="mb-4 dark-bg " left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar> */}
            <Toast ref={toast}  />
            <DataTable   className="dark-bg" ref={dt} value={products} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                dataKey="_id" paginator rows={5} rowsPerPageOptions={[5, 10, 25]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
                globalFilter={globalFilter} header={header} responsiveLayout="scroll" >
                <Column  className="dark-bg" field="customer_id" header="User Id" sortable style={{ minWidth: '12rem' }}></Column>
                {/* //<Column field="createdAt" header="Date Created" sortable style={{ minWidth: '12rem' }}></Column> */}
                <Column  className="dark-bg" field="customer_name" header="Name" sortable style={{ minWidth: '16rem' }}></Column>
                <Column className="dark-bg" field="Email" header="Email" sortable style={{ minWidth: '10rem' }}></Column>
                <Column className="dark-bg" field="status" header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }} ></Column>
<Column className="dark-bg" body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
            </DataTable>
        </div>
                   <Dialog  visible={productDialog} style={{ width: '450px' }} header="Booking Details" modal className="p-fluid dialog " onHide={hideDialog}>
                      
                               <div className='col-12 d-flex'>
                                   <h5 className='col-5 fs-6'>Booking Id</h5>
                                   <p className='col-7'>{product.booking_id}</p>
                               </div>
                               <div className='col-12 d-flex'>
                                   <h5 className='col-5 fs-6'> Customer Id:</h5>
                                   <p className='col-7'>{product.customer_id}</p>
                               </div>
                               <div className='col-12 d-flex'>
                                   <h5 className='col-5 fs-6'>Customer Name: </h5>
                                   <p className='col-7'>{product.customer_name}</p>
                               </div>
                               <div className='col-12 d-flex'>
                                   <h5 className='col-5 fs-6'> Email:</h5>
                                   <p className='col-7'>{product.Email}</p>
                               </div>
                              
                               <div className='col-12 d-flex'>
                                   <h5 className='col-5 fs-6'> Total Amount:</h5>
                                   <p className='col-7'>{product.totalAmount}</p>
                               </div>
                               <div className='col-12 d-flex'>
                                   <h5 className='col-5 fs-6'>Address:</h5>
                                   <p className='col-7'>{product.address}</p>
                               </div>
                               <div className='col-12 d-flex'>
                                   <h5 className='col-5'> Status:</h5>
                                   <p className='col-7'>{product.status}</p>
                             
                       </div>
                   </Dialog>
                   </div>
 )}}
 </Context.Consumer>
);
}
HotelBookingTable.propTypes = {};

HotelBookingTable.defaultProps = {};

export default HotelBookingTable;
