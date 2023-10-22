import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Navbar1 from '../Navbar/Navbar1';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, reset } from '../../Slices/orderSlice';
import DefaultFooter from '../Footer/DefaultFooter';


export default function Orders() {
    const [myOrders, setMyOrders] = useState([]);
    const columns = [
        {field: '_id', header: 'Order id'},
        {field: 'user', header: 'Seller'},
        {field: 'total', header: 'Total price in $'}
       

       
    ];

    const { orders } = useSelector(state => state.orderReducer)
   
    const dispatch = useDispatch()

    useEffect(() => {
        const userL = JSON.parse(localStorage.getItem('user'));
        if (userL) {
            const buyer = userL ? userL.userid : null;
            dispatch(getOrders({ buyer })).then(() => {
                console.log('final', orders);
                setMyOrders(orders);
                dispatch(reset());
            });
        }
    }, []);

    return (
        <div style={{paddingTop:"70px",display: "flex", flexDirection: "column", minHeight: "100vh"}}>
            <Navbar1 ></Navbar1>
            <div className="card" style={{ flex: 1 }}>
                <DataTable value={myOrders} tableStyle={{ minWidth: '50rem' }}>
                    {columns.map((col, i) => (
                        <Column key={col.field} field={col.field} header={col.header} />
                    ))}
                </DataTable>
        </div>
        <DefaultFooter></DefaultFooter>
        </div>
    );
}