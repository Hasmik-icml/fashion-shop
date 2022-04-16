import { Tab } from "semantic-ui-react";
import { render } from '@testing-library/react';
import UserOrdersTable from "../dataTable/UserOrdersTable";
import { useState, useEffect } from "react";


function UserOrderTabs({orderList}){

const [userData, setUserData] = useState({});
const {pendingsOrders, unpaidOrders, sentOrders, paidOrders, doneOrders } = userData;

    function userPendingsOrders(orderList){
        return orderList.filter(item => item.orderStatus === "PENDING")
    }
    function userUnpaidOrders(orderList){
        return orderList.filter(item => item.orderStatus === "UNPAID")
    }
    function userSentOrders(orderList){
        return orderList.filter(item => item.orderStatus === "SENT")
    }
    function userPaidOrders(orderList){
        return orderList.filter(item => item.orderStatus === "PAID")
    }
    function userDoneOrders(orderList){
        return orderList.filter(item => item.orderStatus === "DONE")
    }

    useEffect(()=>{
        setUserData((userData) => ({
            ...userData,
            pendingsOrders: userPendingsOrders(orderList),
            unpaidOrders: userUnpaidOrders(orderList),
            sentOrders: userSentOrders(orderList),
            paidOrders: userPaidOrders(orderList),
            doneOrders: userDoneOrders(orderList)
        }));
    }, [orderList])

    console.log("userData " ,userData);

    const panes = [
        {
            menuItem: "Pending",
            render: () => (
                <Tab.Pane>
                    <UserOrdersTable list={pendingsOrders} />
                </Tab.Pane>
            )
        },
        {
            menuItem: "Unpaid",
            render: () => (
                <Tab.Pane>
                    <UserOrdersTable list={unpaidOrders}/>
                </Tab.Pane>
            )
        },
        {
            menuItem: "Sent",
            render: () => (
                <Tab.Pane>
                    <UserOrdersTable list={sentOrders}/>
                </Tab.Pane>
            )
        },
        {
            menuItem: "Paid",
            render: () => (
                <Tab.Pane>
                    <UserOrdersTable list={paidOrders} />
                </Tab.Pane>
            )
        },
        {
            menuItem: "Done",
            render: () => (
                <Tab.Pane>
                    <UserOrdersTable list={doneOrders}/>
                </Tab.Pane>
            )
        },
    ]
    return (
        <Tab panes={panes}/>
    )
}
export default UserOrderTabs;