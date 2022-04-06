import React from 'react'
import { Tab } from 'semantic-ui-react'
import DataTable from '../dataTable/DataTable'

function Tabs(pendingProducts, allProducts){
    const panes = [
        {
             menuItem: 'ALL PRODUCTS', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
        {
             menuItem: 'PENDING', render: () => {
              <Tab.Pane>
                  <DataTable pendingProducts={pendingProducts}/>
              </Tab.Pane> 
             }
        },
        
      ];
return (
    <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
);
};
export default Tabs;