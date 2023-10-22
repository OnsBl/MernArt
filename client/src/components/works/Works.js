import React, { useState, useRef, useEffect } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import { getWorks, updateWork, reset, addWork, deleteWork } from '../../Slices/WorkSlice';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Paginator } from 'primereact/paginator';
import Navbar1 from '../Navbar/Navbar1';


const getRowsNumber = () => {
    if (localStorage && parseInt(localStorage.getItem("rows_number")) > 0) {
        return parseInt(localStorage.getItem("rows_number"));
    }
    return 3;
}

export default function Works() {
    let emptyWork = {

        description: '',


        privacy: 'public'
    };
    const [first, setFirst] = useState(0);
    const [page, setPage] = useState(1);
    const [rows, setRows] = useState(getRowsNumber());
    const [workDialog, setWorkDialog] = useState(false);
    const [deleteWorkDialog, setDeleteWorkDialog] = useState(false);
    const [deleteWorksDialog, setDeleteWorksDialog] = useState(false);
    const [work, setWork] = useState(emptyWork);
    const [selectedWorks, setSelectedWorks] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const [testUpdate, setTest] = useState(false)




    const { works } = useSelector(state => state.workReducer)
    const { totalRecords } = useSelector(state => state.workReducer)
    const dispatch = useDispatch()
    useEffect(() => {

        const userD = JSON.parse(localStorage.getItem('user'));
        if (userD)
       {  const userid = userD ? userD.userid : null;

       console.log("userrr",userid)
        dispatch(getWorks({userid}))
        dispatch(reset())
        setRows(getRowsNumber())}
    }, [])

    const openNew = () => {

        setWork(emptyWork);
        setSubmitted(false);
        setWorkDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setWorkDialog(false);
    };

    const hideDeleteWorkDialog = () => {
        setDeleteWorkDialog(false);
    };

    const hideDeleteWorksDialog = () => {
        setDeleteWorksDialog(false);
    };

    const saveWork = () => {
        console.log('hi', work);
        setSubmitted(true);
        const userD = JSON.parse(localStorage.getItem('user'));
    
        const userid = userD ? userD.userid : null;
    
        if (!testUpdate) {
            dispatch(addWork({ ...work, userid: userid }));
        } else {
            dispatch(updateWork(work));
            setTest(false);
        }
    
        dispatch(reset());
        setWorkDialog(false);
    };
    

    const editWork = (work) => {
        console.log("ons", work)
        setWork({ ...work });
        setTest(true)
        setWorkDialog(true);
    };

    const confirmDeleteWork = (work) => {

        setWork(work);
        console.log("id2" + work._id)
        setDeleteWorkDialog(true);
    };

    const deleteWork2 = () => {
        dispatch(deleteWork({ _id: work._id }))
        dispatch(reset())
        setDeleteWorkDialog(false);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Work Deleted', life: 3000 });
    };

    

    const confirmDeleteSelected = () => {
        setDeleteWorksDialog(true);
    };

    const deleteSelectedWorks = () => {
        /*   let _works = works.filter((val) => !selectedWorks.includes(val));
  
          setWorks(_works);
          setDeleteWorksDialog(false);
          setSelectedWorks([]);
          toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Works Deleted', life: 3000 }); */
    };


    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _work = { ...work };

        _work[`${name}`] = val;

        setWork(_work);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _work = { ...work };

        _work[`${name}`] = val;

        setWork(_work);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="info" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedWorks || !selectedWorks.length} />
            </div>
        );
    };



    const imageBodyTemplate = (rowData) => {
        return <img src={`https://primefaces.org/cdn/primereact/images/work/${rowData.image}`} alt={rowData.image} className="shadow-2 border-round" style={{ width: '64px' }} />;
    };





    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.privacy} severity={getSeverity(rowData)}></Tag>;
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editWork(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteWork(rowData)} />
            </React.Fragment>
        );
    };

    const getSeverity = (work) => {
        switch (work.privacy) {
            case 'public':
                return 'success';

            case 'private':
                return 'warning';


            default:
                return null;
        }
    };

    const search = () => {
        setFirst(0)
        dispatch(getWorks({ first, rows, globalFilter }))
        dispatch(reset())
        setRows(getRowsNumber())
        
    }

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Works</h4>
            <span className="p-input-icon-left">
            <i className="pi pi-search" onClick={()=> search()} />
                <InputText  onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );
    const workDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveWork} />
        </React.Fragment>
    );
    const deleteWorkDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteWorkDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteWork2} />
        </React.Fragment>
    );
    const deleteWorksDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteWorksDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedWorks} />
        </React.Fragment>
    );

    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
        localStorage.setItem("rows_number", event.rows)
        setPage(event.page);
    };

    const selectionChange = (event) => {
        
        setSelectedWorks(event.value);
        console.log(selectedWorks);
    };

    if (works === undefined) {
        return <>Still loading...</>;
    } else {
        return (
            <div style={{paddingTop: "70px"}}>
                <Navbar1></Navbar1>

                <Toast ref={toast} />
                <div className="card">
                    <Toolbar className="mb-4" left={leftToolbarTemplate} ></Toolbar>

                    <DataTable ref={dt} value={works} selection={selectedWorks} selectionMode="checkbox" onSelectionChange={(event) => setSelectedWorks(event.value)}
                        dataKey="id" globalFilter={globalFilter} header={header}>
                        <Column selectionMode="multiple" exportable={false}></Column>
                        <Column field="_id" header="Id" sortable style={{ minWidth: '12rem' }}></Column>
                        <Column field="title" header="title" sortable style={{ minWidth: '10rem' }}></Column>
                        <Column field="description" header="Description" sortable style={{ minWidth: '20rem' }}></Column>
                        <Column field="user" header="user Id" sortable style={{ minWidth: '8rem' }}></Column>
                        <Column field="price" header="price" sortable style={{ minWidth: '10rem' }}></Column>
                        <Column field="MediaPath" header="Image" sortable style={{ minWidth: '16rem' }}></Column>
                        <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                    </DataTable>
                    <Paginator
                        first={first}
                        rows={rows}
                        totalRecords={totalRecords}
                        rowsPerPageOptions={[3, 10, 25]}
                        page={page}
                        onPageChange={event => onPageChange(event)}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} works"
                    />
                </div>

                <Dialog visible={workDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Work Details" modal className="p-fluid" footer={workDialogFooter} onHide={hideDialog}>
                    {work.image && <img src={`https://primefaces.org/cdn/primereact/images/work/${work.image}`} alt={work.image} className="work-image block m-auto pb-3" />}
                    <div className="field">

                    </div>
                    <div className="field">
                        <label htmlFor="name" className="font-bold">
                            Title
                        </label>
                            <InputText id="title" value={work.title} onChange={(e) => onInputChange(e, 'title')} required autoFocus />
                       
                    </div>
                    <div className="field">
                        <label htmlFor="description" className="font-bold">
                            Description
                        </label>
                        <InputTextarea id="description" value={work.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
                    </div>
 


                    <div className="formgrid grid">
                        <div className="field col">
                            <label htmlFor="like" className="font-bold">
                                Price
                            </label>
                            <InputNumber id="like" value={work.price} onValueChange={(e) => onInputNumberChange(e, 'price')} />
                        </div>
                       
                    </div>
                    <div className="field">
                        <label htmlFor="mediaPath" className="font-bold">
                            Media path
                        </label>
                        <InputTextarea id="mediaPath" value={work.mediaPath} onChange={(e) => onInputChange(e, 'mediaPath')} required rows={3} cols={20} />
                    </div>
                   
                </Dialog>

                <Dialog visible={deleteWorkDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteWorkDialogFooter} onHide={hideDeleteWorkDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                        {work && (
                            <span>
                                Are you sure you want to delete <b>{work.name}</b>?
                            </span>
                        )}
                    </div>
                </Dialog>

                <Dialog visible={deleteWorksDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteWorksDialogFooter} onHide={hideDeleteWorksDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                        {selectedWorks && <span>Are you sure you want to delete the selected works?</span>}
                    </div>
                </Dialog>
            </div>
        );
    }
}
