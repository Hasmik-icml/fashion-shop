import { Tab } from "semantic-ui-react";
import { render } from '@testing-library/react';
import UserOrdersTable from "../dataTable/UserOrdersTable";
import { useState, useEffect } from "react";
import Paginations from "../pagination/Pagination";

function UserOrderTabs({orderList}){
console.log("tabsi meji orderList=", orderList);

const [result, setResult] = useState([]);
const [userData, setUserData] = useState({});
const {pendingsOrders, unpaidOrders, sentOrders, paidOrders, doneOrders } = userData;
const [ordersByPage, setOrdersByPage] = useState([]);
const [tabIndex, setTabIndex] =useState(0);

    function userPendingsOrders(orderList){
        return orderList.filter(item => item.orderStatus === "PENDING").sort((a,b) => b.date - a.date);
    }
    function userUnpaidOrders(orderList){
        return orderList.filter(item => item.orderStatus === "UNPAID").sort((a,b) => b.date - a.date);
    }
    function userSentOrders(orderList){
        return orderList.filter(item => item.orderStatus === "SENT").sort((a,b) => b.date - a.date);
    }
    function userPaidOrders(orderList){
        return orderList.filter(item => item.orderStatus === "PAID").sort((a,b) => b.date - a.date);
    }
    function userDoneOrders(orderList){
        return orderList.filter(item => item.orderStatus === "DONE").sort((a,b) => b.date - a.date);
    }
   
  
    function getOrdersByPage(ordersByPage){
        setOrdersByPage(ordersByPage)
    }

    useEffect(()=>{
        setUserData((userData) => ({
            ...userData,
            pendingsOrders: userPendingsOrders(result),
            unpaidOrders: userUnpaidOrders(result),
            sentOrders: userSentOrders(result),
            paidOrders: userPaidOrders(result),
            doneOrders: userDoneOrders(result)
        }));
    }, [result])

    console.log("result " ,result);
    console.log("userData " ,userData);



    useEffect(() =>{
      if (orderList && orderList.length > 0) setResult(orderList)
    }, [ orderList])
 
    const panes = [
        {
            menuItem: "Pending",
            render: () => (
              <>
                <Tab.Pane>
                <UserOrdersTable list={ordersByPage}/>
                <Paginations result={pendingsOrders} tabIndex={tabIndex} getOrdersByPage={getOrdersByPage}/>
                </Tab.Pane>
              </>
            )
        },
        {
            menuItem: "Unpaid",
            render: () => (
                <>
                <Tab.Pane>
                    <UserOrdersTable list={ordersByPage}/>
                </Tab.Pane>
                <Paginations result={unpaidOrders} tabIndex={tabIndex} getOrdersByPage={getOrdersByPage}/>
                </>
            )
        },
        {
            menuItem: "Sent",
            render: () => (
             <>
                <Tab.Pane>
                    <UserOrdersTable list={ordersByPage}/>
                </Tab.Pane>
                 <Paginations result={sentOrders} tabIndex={tabIndex} getOrdersByPage={getOrdersByPage}/>
             </>
            )
        },
        {
            menuItem: "Paid",
            render: () => (
                <>                
                <Tab.Pane>
                    <UserOrdersTable list={ordersByPage} />
                </Tab.Pane>
                <Paginations result={paidOrders} tabIndex={tabIndex} getOrdersByPage={getOrdersByPage}/>
                </>
            )
        },
        {
            menuItem: "Done",
            render: () => (
                <>                
                <Tab.Pane>
                    <UserOrdersTable list={ordersByPage} />
                </Tab.Pane>
                <Paginations result={doneOrders} tabIndex={tabIndex} getOrdersByPage={getOrdersByPage}/>
                </>
            )
        },
    ]
    return (
        <Tab  className="mainTabs" onTabChange={(e, activeIndex)=>{setTabIndex(activeIndex)}} panes={panes}/>
    )
}
export default UserOrderTabs;