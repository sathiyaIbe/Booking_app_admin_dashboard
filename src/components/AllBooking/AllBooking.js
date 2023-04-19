import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Context from '../../services/Context/Context';
import Header from '../../core/header/header';
import './AllBooking.css';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import 'primeicons/primeicons.css';


import { CabBookingData, CabBookingDataUser } from '../../services/apiCapRegister/apiCapRegister';

const AllBooking = () =>{
  const [userType,setUserType]=useState("")
  const [userId,setUserId]=useState("")
  const [cabData,setCabData]=useState([])
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
function submitFilter(e){
  e.preventDefault()

switch(userType){
  case ("cab"):
    async function func(){
     const data=await CabBookingData(userId)
     setProducts(data.data)
     setLoad(true)
    }
    func()
   
   
    break;
  case  ("hotel"):
    console.log("yes hotel")
    break;
  default:
    async function funcs(){
      const data=await CabBookingDataUser(userId)
      setProducts(data.data)
      setLoad(true)
     }
     funcs()
}
}
console.log(product)
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
  <div className="AllBooking" data-testid="AllBooking">
    <Context.Consumer>
      {value => {
        const { sidebar, isDark } = value
       
        return (
          <div className="Cabs" data-testid="User">
            <div className='header-cabs-container'>
              <Header />
            </div>
            <div className={`header-body-cabs-container ${sidebar ? 'navbar-cabs-user' : ''}`} >
              <h1 className='cabs-user-heading'>All Bookings</h1>
            
              <form className='col-md-6 border mb-3 shadow' onSubmit={submitFilter}>
  
  <fieldset class="form-group">
    <div class="row">
      <legend class="col-form-label  col-sm-2 pt-0">Select </legend>
      <div class="col-sm-10">
        <div class="form-check">
          <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" onClick={(e)=>setUserType(e.target.value)} value="cab" />
          <label class="form-check-label" for="gridRadios1">
           Cab 
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" onClick={(e)=>setUserType(e.target.value)} value="hotel"/>
          <label class="form-check-label" for="gridRadios2">
           Hotel
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios3" onClick={(e)=>setUserType(e.target.value)} value="user"/>
          <label class="form-check-label" for="gridRadios3">
           User
          </label>
        </div>
      
      </div>
    </div>
  </fieldset>
  
  <div class="form-group row">
    <label for="inputEmail3" class="col-sm-2 col-form-label">User ID</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="inputEmail3" placeholder="Enter ID" onChange={(e)=>setUserId(e.target.value)}/>
    </div>
  </div>
  <div class="form-group row">
    <div class="col-sm-10">
      <button type="submit" class="btn btn-primary">Filter</button>
    </div>
  </div>
</form>
<div className={`table-cabs-user ${sidebar ? 'sidebar-cabs-user' : ''}`}>
{load &&
    <div className="datatable-crud-demo " data-testid="CabBookingDataTable">
       
            {/* <Toolbar   className="mb-4 dark-bg " left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar> */}
            <Toast ref={toast}  />
            <DataTable   className="dark-bg" ref={dt} value={products} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                dataKey="_id" paginator rows={5} rowsPerPageOptions={[5, 10, 25]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
                globalFilter={globalFilter} header={header} responsiveLayout="scroll" >
                <Column  className="dark-bg" field="customer_id" header="User Id" sortable style={{ minWidth: '10rem' }}></Column>
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
                                   <p className='col-6 fs-6'>{product.total_amount}</p>
                               </div>
                               <div className='col-12 d-flex'>
                                   <h5 className='col-6 fs-6'> From Location:</h5>
                                   <p className='col-6'>{product.pick_up_adddress}</p>
                               </div>
                               <div className='col-12 d-flex'>
                                   <h5 className='col-6 fs-6'>To Location:</h5>
                                   <p className='col-6'>{product.drop_off_adddress}</p>
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
    </div>
      }
                </div>
              </div>
            </div>

        )
      
      }}
    </Context.Consumer>
  </div>
);
    }
AllBooking.propTypes = {};

AllBooking.defaultProps = {};

export default AllBooking;
