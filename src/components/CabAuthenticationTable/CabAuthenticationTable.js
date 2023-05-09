import PropTypes from 'prop-types';
import './CabAuthenticationTable.css';

import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { ApiCapUser } from '../../services/apiCapRegister/apiCapRegister';
import { DeleteCabUserApi } from '../../services/apiCapRegister/apiCapRegister';
import { UpdateCabUserApi } from '../../services/apiCapRegister/apiCapRegister';
import { CabService } from '../../services/apiCapRegister/apiCapRegister';
import { UpdateAuthenticationCabDetails,DeleteAuthDetails } from '../../services/apiCapRegister/apiCapRegister';
import 'primeicons/primeicons.css';
import Context from '../../services/Context/Context';

import { AuthenticationCabDetails, } from '../../services/apiCapRegister/apiCapRegister';
const CabAuthenticationTable = () => 
  {
    let emptyProduct = {
        _id: '',
        name: '',
        email: '',
        status: null,
        mobileNo:'',
        gender:null,
    };
    let emptyData= {
        carModel:'',
        carType:null,
        fuelType:null,
        type:null,
        seats:null,
        pricePerKm:'',
        extraKmCharges:'',
        acPrice:'',
        fromLocationList:[],
        toLocationList:[],
    };
    const [products, setProducts] = useState(null);
    const [cabDatas, setcabDatas]=useState(null)
    const [loads, setLoad] = useState(false)
    const [productDialog, setProductDialog] = useState(false);
    const [imageViewer, setImageViewer] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [eachCabDetail, setEachCabDetail]=useState(emptyData)
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const [fromLocationList, setFromLocationList] = useState([])
    const [toLocationList, setToLocationList] = useState([])
    const [url, seturl]=useState("")
    const [image,setImage]=useState('')
    const [imgUrl,setimgUrl]=useState("")
   
    useEffect(() => {
      AuthenticationCabDetails().then(res => {
           
            const data = res.data
            const cabData=res.data
            const userData=data.reverse()
          
             setProducts(userData)
             setcabDatas(cabData)
        })
        setLoad(true)
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const openNew = () => {
        setProduct(emptyProduct);
        setEachCabDetail(emptyData)
        setToLocationList([])
        setFromLocationList([])
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
    const hideImageViewer=()=>{
        setImageViewer(false);
    }
    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    }
    const saveProduct = () => {
        setSubmitted(true);
        let _products = [...products];
        let _cabDatas=[...cabDatas]
        let _product = { ...product };
        let _eachCabDetail={...eachCabDetail}
        const index = findIndexById(product.driverId);
        const cabIndex=findIndexByIdCab(eachCabDetail.driverId)
        _products[index] = _product;
        _cabDatas[cabIndex]=_eachCabDetail
        const isUpdated = products.filter(each => each._id === _product._id)
        const isUpdatedCab=cabDatas.filter(each=>each._id===eachCabDetail._id)
        console.log(product)
        if (isUpdated.length === 0 || isUpdatedCab.length===0) {
            const personalDetails = {
                
                status: product.status,
                driverId:product.driverId
                
            }

            
           
            CabService(personalDetails).then(res => {
                const data1 = res.data.userDataStore
             
                 _products.unshift({ ...data1 });
               
             
                setProducts(_products)
            
                setProduct(emptyProduct);
            })
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000, });
        }
        else {
          const personalDetails = {
                
            status: product.status,
            driverId:product.driverId,
            adharcardAddress:product.adharcardAddress,
            adharcardName:product.adharcardName,
            adharcardNumber:product.adharcardNumber,
            image:product.image,
            
        }
            
           
            UpdateAuthenticationCabDetails(personalDetails).then(res => {
               
               
                setProducts(_products)
              
                setProduct(emptyProduct);
            }).catch(err => {
            })
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
        }
        setProductDialog(false);
        setFromLocationList([])
        setToLocationList([])
    }
    const editProduct = (id) => {
        const data=products.filter(each=>(
            each.driverId===id
        ))
        const cData=cabDatas.filter(each=>(
            each.driverId===id
        ))
           setFromLocationList(cData[0].fromLocationList)
        
          setProduct(...data);
          setEachCabDetail(...cData);
          setProductDialog(true);
    }
    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    }
    const deleteProduct = () => {
        console.log(product.driverId)
        DeleteAuthDetails(product.driverId).then(res => {

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
            if (products[i].driverId === id) {
                index = i;
                break;
            }
        }
        return index;
    }
    const findIndexByIdCab = (id) => {
        let index = -1;
        for (let i = 0; i < cabDatas.length; i++) {
            if (cabDatas[i].driverId === id) {
                index = i;
                break;
            }
        }
        return index;
    }

    function updateImage(e){
        setImage(e.target.value)
        const data=(e.target.files[0])
        let _product = { ...product };
        _product[image] = data;
        seturl(URL.createObjectURL(data))
        setProduct(_product);
      } 
    const exportCSV = () => {
        dt.current.exportCSV();
    }
    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    }
    const deleteSelectedProducts = () => {
        let _products = products.filter(val => !selectedProducts.includes(val));
        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    }

    const onInputChange = (e, username) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };
        let _data={...eachCabDetail}
       if(_product[username]===undefined){
            _data[username]=val
       }else{
        _product[username] = val;
       }
       
       
        setEachCabDetail(_data)
        setProduct(_product);
    }
    const onInputNumberChange = (e, name) => {
        let _product = { ...product };
        let _data={...eachCabDetail}
        const val = e.value || 0;
        if(_product[name]===undefined){
            _data[name]=val
       }else{
        _product[name] = val;
       }
       setEachCabDetail(_data)
        setProduct(_product);
    }
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>   
            </React.Fragment>
        )
    }
    const rightToolbarTemplate = () => {
        return (
            <React.Fragment  >
                 {/* <FileUpload mode="basic" name="demo[]" auto url={"/api/upload"} accept=".csv" chooseLabel="Import" className="mr-2 inline-block" onUpload={importCSV} /> */}
                <div className='flex mt-3 '>
                
                <Button label="Export" icon="pi pi-upload" className="p-button-help ms-0" onClick={exportCSV} />
                </div>
            </React.Fragment>
        )
    }
    const statusBodyTemplate = (rowData) => {
        return <span className={`product-badge status-${rowData.availableStatus}`}>{rowData.availableStatus}</span>;
    }
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editProduct(rowData.driverId)} />
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
    const imageSet=(e)=>{
        setimgUrl(e)
        setImageViewer(true)

    }
    const imageBodyTemplate = (product) => {
        console.log(product.image)
       return <button type="button" className='btn' onClick={()=>imageSet(product.image)}> <img src={product.image} alt={product.image} style={{maxWidth:"40px"}} className="w-2rem shadow-2 border-round" /></button>;
    // return <p>Click on the <a href = {product.image}>"Request Access"</a> button and fill in the form.</p>
  };
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
                    loads &&
                    <div className="datatable-cab-crud-demo" data-testid="CabAuthenticationTable">
                    <div className={`cards ${sidebar ? 'sidebar-table' : ''}`}>
                            <Toolbar className="mb-4 dark-bg " left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                            <Toast ref={toast} />
                            <DataTable className="dark-bg" ref={dt} value={products} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                                dataKey="_id" paginator rows={5} rowsPerPageOptions={[5, 10, 25]}
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Cab User"
                                globalFilter={globalFilter} header={header} responsiveLayout="scroll" >
                                {<Column className="dark-bg" selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>}
                                <Column className="dark-bg" field="driverId" header="Driver Id" sortable style={{ minWidth: '12rem' }}></Column>
                                {/* //<Column field="createdAt" header="Date Created" sortable style={{ minWidth: '12rem' }}></Column> */}

                                <Column className="dark-bg" field="adharcardName" header="Name" sortable style={{ minWidth: '16rem' }}></Column>
                                <Column className="dark-bg" field="adharcardNumber" header="Adharcard Number"  style={{ minWidth: '16rem' }}></Column>
                                <Column className="dark-bg" field="adharcardAddress" header="Adharcard Address"  style={{ minWidth: '10rem' }}></Column>
                                <Column className="dark-bg" field="image" header="Image" body={imageBodyTemplate} style={{ minWidth: '10rem' }}></Column>
                                <Column className="dark-bg" field="status" header="Status" style={{ minWidth: '12rem' }} ></Column>
                                <Column className="dark-bg" body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                            </DataTable>
                        </div>
                        <Dialog  visible={productDialog} style={{ width: '450px' }} header="Cab User Details" modal className="p-fluid dark-bg " footer={productDialogFooter} onHide={hideDialog}>
                            <div className="field ">
                                <label htmlFor="username">Name</label>
                                <InputText id="username" value={product.adharcardName} onChange={(e) => onInputChange(e, 'adharcardName')} required autoFocus style={{height:'40px'}} className={classNames({ 'p-invalid': submitted && !product.name })} />
                                {submitted && !product.name && <small className="p-error">Name is required.</small>}
                            </div>
                            <div className="field">
                                <label htmlFor="email">Adharcard Number</label>
                                <InputText id="email" style={{height:'40px'}} value={product.adharcardNumber} onChange={(e) => onInputChange(e, 'adharcardNumber')} required />
                            </div>
                            <div className="field">
                                <label htmlFor="mobileNo">Adharcard Address</label>
                                <InputText id="mobileNo" style={{height:'40px'}} value={product.adharcardAddress} onChange={(e) => onInputChange(e, 'adharcardAddress')} required />
                            </div>
                            <div className="field">
                                <label htmlFor="mobileNo">Adharcard Image</label>
                                <input type="file" accept='image/*' onChange={updateImage}/>
                               {product.image&& <img alt='as' src={product.image} />}
                            </div>



                            <div className="field">
                            <label htmlFor='type'>Status</label>
                            <div className="formGrid">
                              <select className="form-select" aria-label="Default select example" onChange={(e) => onInputChange(e, 'status')}>
                                <option defaultChecked >Select Type</option>
                                <option selected={product.status==="verified"} value="verified"  >Verified</option>
                                <option selected={product.status==="notverified"} value="notverified">Not Verified</option>
                              </select>
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
                         <Dialog dark-bg visible={imageViewer} style={{ width: '450px' }} header="Image View" modal  onHide={hideImageViewer}>
                            <div className="confirmation-content text-center">
                                
                                <img src={imgUrl} alt={imgUrl} style={{maxWidth:"150px"}} className="w-4rem shadow-2 border-round" />
                            </div>
                        </Dialog>
                    </div>
                )
            }}
        </Context.Consumer>
    );
}
CabAuthenticationTable.propTypes = {};

CabAuthenticationTable.defaultProps = {};

export default CabAuthenticationTable;
