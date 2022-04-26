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
  const [tabIndex, setTabIndex] =useState(0);
  console.log("tabIndex=", tabIndex.activeIndex);



function getProductsByPage(productsByPage){
  setProductsByPage(productsByPage)
}

function getOrdersByPage(ordersByPage){
  setOrdersByPage(ordersByPage)
}
const {allProducts, pendingOrders, unpaidOrders, sentOrders, paidOrders, allDoneOrders, allOrders } = orderData;

useEffect(()=>{
  console.log("hi");

  if(adminData) setOrderData(adminData)
}, [adminData])
 
  const panes = [
    {
      menuItem: "All Products",     
      render: () => (
   
      <>
        <Tab.Pane >
          <DataTable list = {productsByPage} uploadImg={uploadImg}/>
        </Tab.Pane>
        <Paginations result={allProducts} tabIndex={tabIndex}  getProductsByPage={getProductsByPage}/>
          
      </>
      )
    },
    { 
        menuItem: "All Orders", 
        render: () =>(
          <>
          <Tab.Pane >
          <PendingTable list = {ordersByPage} changeStatus = {changeStatus} />
          </Tab.Pane> 
           <Paginations result={allOrders} tabIndex={tabIndex} getOrdersByPage={getOrdersByPage}/>
          
          </>
        ) 
    },
    { 
      menuItem: "Pending", 
      render: () =>(
        <>
        <Tab.Pane>
        <PendingTable list = {ordersByPage} changeStatus = {changeStatus} />
        </Tab.Pane> 
        <Paginations result={pendingOrders} tabIndex={tabIndex} getOrdersByPage={getOrdersByPage}/>
        </>
      ) 
  },
    { 
      menuItem: "UNPAID orders", 
      render: () =>(
     <>
        <Tab.Pane>
        <PendingTable list = {ordersByPage} changeStatus = {changeStatus} />
        </Tab.Pane> 
        <Paginations result={unpaidOrders} tabIndex={tabIndex} getOrdersByPage={getOrdersByPage}/>
     </>
      ) 
    },
    { 
      menuItem: "SENT", 
      render: () =>(
        <>
        <Tab.Pane >
        <PendingTable list = {ordersByPage} changeStatus = {changeStatus} />
        </Tab.Pane> 
         <Paginations result={sentOrders} tabIndex={tabIndex} getOrdersByPage={getOrdersByPage}/>
        </>
      ) 
    },
    { 
      menuItem: "PAID", 
      render: () =>(
        <>
          <Tab.Pane>
        <PendingTable list = {ordersByPage} changeStatus = {changeStatus} />
        </Tab.Pane> 
         <Paginations result={paidOrders} tabIndex={tabIndex} getOrdersByPage={getOrdersByPage}/>
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
        <Paginations result={allDoneOrders} tabIndex={tabIndex} getOrdersByPage={getOrdersByPage}/>
       </>
      ) 
    },
  ];
  return (
<> 
    <Tab className="mainTabs"  onTabChange={(e, activeIndex)=>{setTabIndex(activeIndex)}} menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
</>
  );
};
export default Tabs;