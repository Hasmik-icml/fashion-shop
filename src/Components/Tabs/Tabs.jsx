import React from 'react'
import { Tab } from 'semantic-ui-react'
import DataTable from '../dataTable/DataTable'
import PendingTable from '../dataTable/PandingTable';
import { useState, useEffect } from 'react';
import Paginations from '../pagination/Pagination';
import "./tabs.css"

function Tabs({uploadImg, changeStatus, adminData}){
  const [productsByPage, setProductsByPage] = useState([]);
  const [ordersByPage, setOrdersByPage] = useState([]);
  const [orderData, setOrderData] = useState({});


function getProductsByPage(productsByPage){
  console.log("funkciai meji log" , productsByPage);
  setProductsByPage(productsByPage)
}

function getOrdersByPage(ordersByPage){
  console.log("funkciai meji log" , ordersByPage);
  setOrdersByPage(ordersByPage)
}
const {allProducts, pendingOrders, unpaidOrders, sentOrders, paidOrders, allDoneOrders, allOrders } = orderData;

useEffect(()=>{
  console.log("hi");

  if(adminData) setOrderData(adminData)
}, [adminData])

 console.log("orderData=", allOrders);
 console.log("unpaidOrders=", unpaidOrders);
 
  const panes = [
    {
      menuItem: "All Products",     
      render: () => (
   
      <>
           {console.log("productsByPage", productsByPage)}
        <Tab.Pane>
          <DataTable list = {productsByPage} uploadImg={uploadImg}/>
        </Tab.Pane>
          <Paginations result={allProducts} updateStart={1}  getProductsByPage={getProductsByPage}/>
      </>
      )
    },
    { 
        menuItem: "All Orders", 
        render: () =>(
          <>
          {console.log("productsByPage", productsByPage)}
          <Tab.Pane>
          <PendingTable list = {ordersByPage} changeStatus = {changeStatus} />
          </Tab.Pane> 

          <Paginations result={allOrders} updateStart={1} getOrdersByPage={getOrdersByPage}/>
          </>
        ) 
    },
    { 
      menuItem: "Pending", 
      render: () =>(
        <>
          {console.log("productsByPage", productsByPage)}
        <Tab.Pane>
        <PendingTable list = {ordersByPage} changeStatus = {changeStatus} />
        </Tab.Pane> 
        <Paginations result={pendingOrders} getOrdersByPage={getOrdersByPage}/>
        </>
      ) 
  },
    { 
      menuItem: "UNPAID orders", 
      render: () =>(
     <>
       {console.log("productsByPage", productsByPage)}
        <Tab.Pane>
        <PendingTable list = {ordersByPage} changeStatus = {changeStatus} />
        </Tab.Pane> 
        <Paginations result={unpaidOrders} getOrdersByPage={getOrdersByPage}/>
     </>
      ) 
    },
    { 
      menuItem: "SENT", 
      render: () =>(
        <>
          {console.log("productsByPage", productsByPage)}
        <Tab.Pane>
        <PendingTable list = {ordersByPage} changeStatus = {changeStatus} />
        </Tab.Pane> 
         <Paginations result={sentOrders} getOrdersByPage={getOrdersByPage}/>
        </>
      ) 
    },
    { 
      menuItem: "PAID", 
      render: () =>(
        <>
          {console.log("productsByPage", productsByPage)}
          <Tab.Pane>
        <PendingTable list = {ordersByPage} changeStatus = {changeStatus} />
        </Tab.Pane> 
         <Paginations result={paidOrders} getOrdersByPage={getOrdersByPage}/>
        </>
      ) 
    },
    { 
      menuItem: "DONE", 
      render: () =>(
       <>
        <Tab.Pane>
        <PendingTable list = {ordersByPage} changeStatus = {changeStatus} tabName={"DONE"} />
        </Tab.Pane> 
        <Paginations result={allDoneOrders} getOrdersByPage={getOrdersByPage}/>
       </>
      ) 
    },
  ];
  return (
<> 
    <Tab className="mainTabs"  menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
</>
  );
};
export default Tabs;