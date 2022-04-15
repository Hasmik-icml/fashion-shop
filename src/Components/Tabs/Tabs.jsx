import React from 'react'
import { Tab } from 'semantic-ui-react'
import DataTable from '../dataTable/DataTable'
import PendingTable from '../dataTable/PandingTable';


function Tabs({uploadImg, pendingProducts, allOrders, allProducts, changeStatus}){
    console.log("pendingProducts", pendingProducts);
  const panes = [
    {
      menuItem: "All Products",     
      render: () => (
        <Tab.Pane>
          <DataTable list = {allProducts} uploadImg={uploadImg}/>
        </Tab.Pane>
      )
    },
    { 
        menuItem: "Pending", 
        render: () =>(
          <Tab.Pane>
          <PendingTable list = {allOrders} changeStatus = {changeStatus} />
          </Tab.Pane> 
        ) 
    },
    { 
      menuItem: "UNPAID orders", 
      render: () =>(
        <Tab.Pane>
        <PendingTable list = {pendingProducts} changeStatus = {changeStatus} />
        </Tab.Pane> 
      ) 
  },
  ];
  return (
<> 
    <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
</>
  );
};
export default Tabs;