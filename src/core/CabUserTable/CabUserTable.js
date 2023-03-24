import PropTypes from 'prop-types';
import './CabUserTable.css';
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
import { ApiCapUser } from '../../services/apiCapRegister/apiCapRegister';
import { GetUserDetailsApi } from '../../services/UserService/UserService';
import { DeleteUserApi } from '../../services/UserService/UserService';
import { UserService } from '../../services/UserService/UserService';
import { DeleteCabUserApi } from '../../services/apiCapRegister/apiCapRegister';
import { UpdateCabUserApi } from '../../services/apiCapRegister/apiCapRegister';
import { DeleteMultipleCabUserApi } from '../../services/apiCapRegister/apiCapRegister';
import { CabService } from '../../services/apiCapRegister/apiCapRegister';
import 'primeicons/primeicons.css';
import { DeleteMultipleUserApi } from '../../services/UserService/UserService';
import { UpdateUserApi } from '../../services/UserService/UserService';
import { elementAcceptingRef } from '@mui/utils';
import Context from '../../services/Context/Context';
import axios from 'axios';
import { parse } from 'papaparse';
import { ImportCabUser } from '../../services/apiCapRegister/apiCapRegister';
import { ImportCabDetail } from '../../services/apiCapRegister/apiCapRegister';
const CabUserTable = (props) => {
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
    const [fromlocation, setFromlocation] = useState("")
    const [toLocation, setToLocation] = useState("")
    const [show_from_address, setshow_from_address] = useState(Boolean)
    const [show_to_address, setshow_to_address] = useState(Boolean)
    const [ACfromlocation, setACfromlocation] = useState([]);
    const [ACtolocation, setACtolocation] = useState([]);
    const [showAcCharges, setShowAcCharges] = useState(false)
    const [cabUserFile, setCabUserFile]=useState()
    const [cabDetailsFile, setCabDetailsFile]=useState()
    useEffect(() => {
        ApiCapUser().then(res => {
            const data = res.data.cabUserData
            const cabData=res.data.cabData
            const userData=data.reverse()
             setProducts(userData)
             setcabDatas(cabData)
        })
        setLoad(true)
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    const fromvalue = async (data) => {
        setFromlocation(data)
        const request = await axios.get('https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?SingleLine=' + fromlocation + '&+category=&outFields=*&forStorage=false&f=pjson')
        setACfromlocation(request.data.candidates)
        setshow_from_address(true);
      }
      const getFromlocation = (data) => {
        if (fromLocationList.length < 3)
       // product[fromLocationList]=([...fromLocationList, data.address])
         setFromLocationList([...fromLocationList, data.address])
        setshow_from_address(false);
        setFromlocation('')
      }
    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }
    const openNew = () => {
        setProduct(emptyProduct);
        setEachCabDetail(emptyData)
        setToLocationList([])
        setFromLocationList([])
        setSubmitted(false);
        setProductDialog(true);
        setShowAcCharges(false)
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
        let _cabDatas=[...cabDatas]
        let _product = { ...product };
        let _eachCabDetail={...eachCabDetail}
        const index = findIndexById(product.driverId);
        const cabIndex=findIndexByIdCab(eachCabDetail.driverId)
        _products[index] = _product;
        _cabDatas[cabIndex]=_eachCabDetail
        const isUpdated = products.filter(each => each._id === _product._id)
        const isUpdatedCab=cabDatas.filter(each=>each._id===eachCabDetail._id)
        if (isUpdated.length === 0 || isUpdatedCab.length===0) {
            const personalDetails = {
                name: product.name,
                email: product.email,
                availableStatus: product.availableStatus,
                mobileNo:product.mobileNo,
                gender:product.gender,
            }
            const cabDetails={
                carModel:eachCabDetail.carModel,
                carType: eachCabDetail.carType,
                type: eachCabDetail.type,
                availableStatus:eachCabDetail.availableStatus,
                fuelType:eachCabDetail.fuelType,
                seats: eachCabDetail.seats,
                fromLocationList:fromLocationList,
                toLocationList:toLocationList,
                pricePerKm:eachCabDetail.pricePerKm,
                acPrice:eachCabDetail.acPrice,
                extraKmCharges:eachCabDetail.extraKmCharges,
                availableStatus:product.availableStatus
            }
            const data = {
                personalDetails: personalDetails,
                cabDetails: cabDetails
            }
         
            CabService(data).then(res => {
                const data1 = res.data.userDataStore
                const data2=res.data.cabDataStore
                 _products.unshift({ ...data1 });
                 _cabDatas.unshift({...data2});
                setcabDatas(_cabDatas)
                setProducts(_products)
                setEachCabDetail(emptyData)
                setProduct(emptyProduct);
            })
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000, });
        }
        else {
            const personalDetails = {
                name: product.name,
                email: product.email,
                availableStatus: product.availableStatus,
                mobileNo:product.mobileNo,
                gender:product.gender,
                _id:product._id
            }
            const cabDetails={
                carModel:eachCabDetail.carModel,
                carType: eachCabDetail.carType,
                type: eachCabDetail.type,
                availableStatus:eachCabDetail.availableStatus,
                fuelType:eachCabDetail.fuelType,
                seats: eachCabDetail.seats,
                fromLocationList:fromLocationList,
                toLocationList:toLocationList,
                pricePerKm:eachCabDetail.pricePerKm,
                acPrice:eachCabDetail.acPrice,
                extraKmCharges:eachCabDetail.extraKmCharges,
                _id:eachCabDetail._id
            }
            const data = {
                personalDetails: personalDetails,
                cabDetails: cabDetails
            }
            UpdateCabUserApi(data).then(res => {
                 const index=  findIndexByIdCab(eachCabDetail.driverId)
                 _cabDatas[index]=eachCabDetail
                 
                setcabDatas(_cabDatas)
                setProducts(_products)
                setEachCabDetail(emptyData)
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
          setToLocationList(cData[0].toLocationList)
          if (cData[0].type==="Ac"){
            setShowAcCharges(true)
          }else{
            setShowAcCharges(false)
          }
          setProduct(...data);
          setEachCabDetail(...cData);
          setProductDialog(true);
    }
    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    }
    const deleteProduct = () => {
        DeleteCabUserApi(product.driverId).then(res => {
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
    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }
    function handleChangeCabDetails(e){
       
        setCabDetailsFile(e.target.files[0])
    }
    function importCSVCabDetail(){
        const reader=new FileReader()
        reader.onload=async({target})=>{
            const csv=parse(target.result,{header:true})
            const parsedData=csv?.data
            const data=parsedData.slice(0,-1)
            const CabDetailsDatas=data.map(each=>{
                const from=each.fromLocationList.split(';')
                const to=each.toLocationList.split(';')
                // const cdata=[each.driverId,each.availableStatus,each.fromLocationList,each.toLocationList,each.acPrice,each.carModel,each.carType,each.extraKmCharges,each.fuelType,
                // each.pricePerKm,each.type,each.seats]
                return {driverId:each.driverId, availableStatus: each.availableStatus, acPrice: each.acPrice, carModel: each.carModel, carType: each.carType, extraKmCharges: each.extraKmCharges, fuelType: each.fuelType,
                    pricePerKm: each.pricePerKm, type: each.type, seats:each.seats, fromLocationList: from,toLocationList:to}
            })
            const CabUserDatas=data.map(each=>{
                // const cudata=[each.driverId, each.email,each.availableStatus,each.mobileNo,each.gender, each.name]
                return{ driverId: each.driverId, email: each.email, availableStatus: each.availableStatus,  mobileNo: each.mobileNo, gender: each.gender, name: each.name}
            })
           
            const uploadData={CabDetailsDatas,CabUserDatas}
            ImportCabDetail(uploadData).then(res=>{
              
                const userDataImport=res.data.importCabUser
                const cabDataImport=res.data.importDetails
                const _products = [...userDataImport,...products ];
                const _cabDatas = [ ...cabDataImport, ...cabDatas ];
                setProducts(_products)
                setcabDatas(_cabDatas)
            })
        }
        reader.readAsText(cabDetailsFile);
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
        _product['availableStatus'] = e.value;
        setProduct(_product);
    }
    const onGenderChange = (e) => {
        let _product = { ...product };
        _product['gender'] = e.value;
        setProduct(_product);
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
        if(username==="type"){
            if(val==='Ac'){
                setShowAcCharges(true)
            }else{
                setShowAcCharges(false)
            }
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
                <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
            </React.Fragment>
        )
    }
    const rightToolbarTemplate = () => {
        return (
            <React.Fragment  >
                 {/* <FileUpload mode="basic" name="demo[]" auto url={"/api/upload"} accept=".csv" chooseLabel="Import" className="mr-2 inline-block" onUpload={importCSV} /> */}
                <div className='flex mt-3 '>
                 <input type="file"  accept=".csv"  onChange={handleChangeCabDetails}/>
                <Button className=' mt-3 me-3 ms-0 p-button-success ' icon="pi pi-download"  onClick={importCSVCabDetail}  label='Import '/> 
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
    function removeFrom(index) {
       setFromLocationList(fromLocationList.filter((el, i) => i !== index))
      }
      const toValue = async (data) => {
        setToLocation(data)
        const request = await axios.get('https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?SingleLine=' + data + '&+category=&outFields=*&forStorage=false&f=pjson')
        setshow_to_address(true);
        setACtolocation(request.data.candidates)
      }
      const getTolocation = (data) => {
        if (toLocationList.length < 5)
          setToLocationList([...toLocationList, data.address])
        setshow_to_address(false);
        setToLocation('')
      }
      function removeTo(index) {
        setToLocationList(toLocationList.filter((el, i) => i !== index))
      }
      function fromLocationTags() {
        return product.cabData.fromLocationList
      }
    return (
        <Context.Consumer>
            {value => {
                const { sidebar } = value
                return (
                    loads &&
                    <div className="datatable-cab-crud-demo" data-testid="CabUserTable">
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
                                <Column className="dark-bg" field="name" header="Name" sortable style={{ minWidth: '16rem' }}></Column>
                                <Column className="dark-bg" field="email" header="Email" sortable style={{ minWidth: '10rem' }}></Column>
                                <Column className="dark-bg" field="availableStatus" header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }} ></Column>
                                <Column className="dark-bg" body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                            </DataTable>
                        </div>
                        <Dialog  visible={productDialog}  header="Cab User Details" modal className="p-fluid dark-bg " footer={productDialogFooter} onHide={hideDialog}>
                            <div className="field ">
                                <label htmlFor="username">Name</label>
                                <InputText id="username" value={product.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus style={{height:'40px'}} className={classNames({ 'p-invalid': submitted && !product.name })} />
                                {submitted && !product.name && <small className="p-error">Name is required.</small>}
                            </div>
                            <div className="field">
                                <label htmlFor="email">Email</label>
                                <InputText id="email" style={{height:'40px'}} value={product.email} onChange={(e) => onInputChange(e, 'email')} required />
                            </div>
                            <div className="field">
                                <label htmlFor="mobileNo">Mobile Number</label>
                                <InputText id="mobileNo" style={{height:'40px'}} value={product.mobileNo} onChange={(e) => onInputChange(e, 'mobileNo')} required />
                            </div>
                            <div className="row">                             
                                <div className="row">
                                <label htmlFor='status' className='col-4 mt-2'>Status</label>
                                    <div className="field-radiobutton col-4 mt-2">
                                        <RadioButton className='mb-1' inputId="category1" name="status" value="active" onChange={onCategoryChange} checked={product.availableStatus === 'active'} />
                                        <label className='mb-1 ml-2' htmlFor="category1">Active</label>
                                    </div>
                                    <div className="field-radiobutton col-4 mt-2">
                                        <RadioButton className='mb-1'  inputId="category2" name="status" value="inactive" onChange={onCategoryChange} checked={product.availableStatus === 'inactive'} />
                                        <label className='mb-1 ml-2' htmlFor="category2">In Active</label>
                                    </div>
                                </div>
                            </div>
                            <div className="row">                             
                                <div className="row">
                                <label htmlFor='gender' className='col-4 mt-2'>Gender</label>
                                    <div className="field-radiobutton col-4 mt-2">
                                        <RadioButton className='mb-1' inputId="category1" name="gender" value="male" onChange={onGenderChange} checked={product.gender === 'male'} />
                                        <label className='mb-1 ml-2' htmlFor="category1">Male</label>
                                    </div>
                                    <div className="field-radiobutton col-4 mt-2">
                                        <RadioButton className='mb-1'  inputId="category2" name="gender" value="female" onChange={onGenderChange} checked={product.gender === 'female'} />
                                        <label className='mb-1 ml-2' htmlFor="category2">Female</label>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="carModel">Car Model</label>
                                <InputText  style={{height:'40px'}} value={eachCabDetail.carModel} onChange={(e) => onInputChange(e, 'carModel')} required />
                            </div>
                            <div className="field">
                                <label htmlFor="carType">Car Type</label>
                                {/* <div className="formgrid grid">
                                    <select className="form-select" aria-label="Default select example"   onChange={(e) => onInputChange(e, 'carType')}>
                                        <option defaultChecked>Select Car type</option>
                                        <option selected={eachCabDetail.carType==="SUV"} value="SUV"  >SUV</option>
                                        <option selected={eachCabDetail.carType==="MUV"}value="MUV">MUV</option>
                                        <option selected={eachCabDetail.carType==="XUV"} value="XUV">XUV</option>
                                        <option selected={eachCabDetail.carType==="Other"} value="Other">Other</option>
                                    </select>
                                </div> */}
                            </div>
                            <div className="field">
                                <label htmlFor='fuelType'>Fuel Type</label>
                                <div className="formgrid grid">
                                    <select className="form-select" aria-label="Default select example" onChange={(e) => onInputChange(e, 'fuelType')}>
                                        <option  defaultValue={eachCabDetail.fuelType===""}>Select Fuel type</option>
                                        <option defaultValue={eachCabDetail.fuelType==="Petrol"} value="Petrol"  >Petrol</option>
                                        <option defaultValue={eachCabDetail.fuelType==="Diesel"} value="Diesel">Diesel</option>
                                    </select>
                                </div>
                            </div>
                            <div className="field">
                            <label htmlFor='type'>Type</label>
                            <div className="formGrid">
                              <select className="form-select" aria-label="Default select example" onChange={(e) => onInputChange(e, 'type')}>
                                <option defaultValue={eachCabDetail.type===""} >Select Type</option>
                                <option defaultValue={eachCabDetail.type==="Ac"} value="Ac"  >AC</option>
                                <option defaultValue={eachCabDetail.type==="NonAc"} value="NonAc">Non AC</option>
                              </select>
                            </div>
                          </div>
                          <div className="field">
                            <label htmlFor='seats'>No Seats</label>
                            <div className="formGrid">
                              <select className="form-select" aria-label="Default select example" onChange={(e) =>  onInputChange(e, 'seats')}>
                                <option defaultValue={eachCabDetail.seats===""} >Select No. of seats</option>
                                <option defaultValue={eachCabDetail.seats==="4"} value="4">4</option>
                                <option defaultValue={eachCabDetail.seats==="5"} value="5">5</option>
                                <option  defaultValue={eachCabDetail.seats==="6"} value="6">6</option>
                              </select>
                            </div>
                          </div>
                          <div className="field">
                          <label htmlFor="pickupLocation" >Pickup Location</label>
                              {fromLocationList.map((tag, index) => (
                                <div className="tag-item" key={index}>
                                  <span className="text">{tag}</span>
                                  <span className="close" style={{ cursor: "pointer" }} onClick={() => removeFrom(index)}>&times;</span>
                                </div>
                              ))}
                                <div className="formGrid">
                              <InputText type="text" className="form-control" autoComplete="off" placeholder="Select Max 3  From Locations" name='fromlocation' value={fromlocation} onChange={(event) => fromvalue(event.target.value)} />
                              {show_from_address === true ? ACfromlocation.length !== 0 ?
                                <>
                                  <div className='card py-2 my-height position-relative z-3'>
                                    <ul className='list-unstyled  text-sm-start  mb-0'>
                                      {ACfromlocation.map((data, index) => (
                                        <li type='button' className='px-1 py-1 fs-6 select' key={index} onClick={() => { getFromlocation(data) }}>{data.address}</li>
                                      ))
                                      }
                                    </ul>
                                  </div>
                                </> : <>
                                  <div className='card py-2 w-100 position-relative z-3'>
                                    <p className=' mb-0 fs-6'>
                                      Not Founded
                                    </p>
                                  </div>
                                </> : <></>
                              }
                            </div>
                          </div>
                          <div className="filed">
                            <label  htmlFor="toLocations">Drop Location</label>
                            <div className="formGrid">
                              {toLocationList.map((tag, index) => (
                                <div className="tag-item" key={index}>
                                  <span className="text">{tag}</span>
                                  <span className="close" style={{ cursor: "pointer" }} onClick={() => removeTo(index)}>&times;</span>
                                </div>
                              ))}
                              <InputText type="text" className="form-control" autoComplete="off" placeholder="Select Max 5  To Locations" name='Tolocation' value={toLocation} onChange={(event) => toValue(event.target.value)} />
                              {show_to_address === true ? ACtolocation.length !== 0 ?
                                <>
                                  <div className='card py-2 my-height position-relative z-3'>
                                    <ul className='list-unstyled mb-0'>
                                      {ACtolocation.map((data, index) => (
                                        <li type='button' className='px-2 py-1 fs-6 select' key={index} onClick={() => { getTolocation(data) }}>{data.address}</li>
                                      ))
                                      }
                                    </ul>
                                  </div>
                                </> : <>
                                  <div className='card py-2 w-100 position-relative z-3'>
                                    <p className='fs-6 mb-0'>
                                      Not Founded
                                    </p>
                                  </div>
                                </> : <></>
                              }
                            </div>
                          </div>
                          <div className="field">
                            <label  htmlFor="priceKm" >Price Per Km</label>
                            <div className="formGrid">
                              <InputNumber style={{height:'40px'}} value={eachCabDetail.pricePerKm} placeholder='In Rupees' onChange={(e) => onInputNumberChange(e, 'pricePerKm')} />
                            </div>
                          </div>
                          {/* For Ac Charges */}
                          {showAcCharges &&
                            <div className="field">
                              <label  htmlFor="acCharges" >AC Charges</label>
                              <div className="formGrid">
                                <InputNumber  style={{height:'40px'}} value={eachCabDetail.acPrice} placeholder='In Rupees' onChange={(e) => onInputNumberChange(e, 'acPrice')} />
                              </div>
                            </div>
                          }
                          {/* Additional Charges */}
                          <div className="field">
                            <label htmlFor="extraKm" >Extra Km Charges</label>
                            <div className="form-grid">
                              <InputNumber style={{height:'40px'}} value={eachCabDetail.extraKmCharges} placeholder='In Rupees' onChange={(e) => onInputNumberChange(e, 'extraKmCharges')} />
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
CabUserTable.propTypes = {};
CabUserTable.defaultProps = {};
export default CabUserTable;
