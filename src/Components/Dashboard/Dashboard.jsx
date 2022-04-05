import "./dashboard.css";
import { domainName } from "../../config";
import { getOrders, authoriseUser, getAllOrders, getOrderByStatus } from "../../Services/api";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect} from "react";
import { Icon, Table, TableBody, TableCell, TableRow } from "semantic-ui-react";
import {USER, ADMIN, PAID, UNPAID, PENDING, SENT, ONE} from "../../Services/constants"


function Dashboard() {
  const { error, isAuthenticated, isLoading, user, getAccessTokenSilently } =
    useAuth0();
  const [adminData, setAdminData] = useState([]);

  async function orderShow() {
    try {
      const token = await getAccessTokenSilently();

      let data = null;
      if (user[`${domainName}roles`] == USER){
        data = await getOrderByStatus(user.sub, token, UNPAID)
      }else {
        data = await getOrders(user.sub, token, UNPAID);
      }
     
      console.log(data);
      // data = await getAllOrders(user.sub, token, PENDING)
 

      if (data && Array.isArray(data)) {
        if (data.length !== 0) setAdminData(data);
      } else if (data && data.status === 401) {
        const authorised = await authoriseUser(user, token);
      } else {
        console.log("hajox");
      }
    } catch (error) {
      console.log("hajox chi");
    }
  }
  useEffect(() => {
      console.log("use effect call");
      if(user) orderShow();
   
  }, [user]);
  return (
    <div className="dashboard ui container">
      it's dashboard
      {console.log(adminData)}
      {user &&
      user[`${domainName}roles`] &&
      user[`${domainName}roles`].includes("admin") ? (
        <>
          <button>Add New Product</button>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Notes</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Product1</Table.Cell>
                <Table.Cell>Pending</Table.Cell>
                <Table.Cell negative>Notes</Table.Cell>
              </Table.Row>
              <Table.Row positive>
                <Table.Cell>Product2</Table.Cell>
                <Table.Cell>
                  <Icon name="checkmark" />
                  Pending
                </Table.Cell>
                <Table.Cell>Notes</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Product3</Table.Cell>
                <Table.Cell>Unknown</Table.Cell>
                <Table.Cell positive>
                  <Icon name="close" />
                  Remove
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </>
      ) : (
        <>
        <button>Add New Product</button>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Notes</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Product1</Table.Cell>
              <Table.Cell>Pending</Table.Cell>
              <Table.Cell negative>Notes</Table.Cell>
            </Table.Row>
            <Table.Row positive>
              <Table.Cell>Product2</Table.Cell>
              <Table.Cell>
                <Icon name="checkmark" />
                Pending
              </Table.Cell>
              <Table.Cell>Notes</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Product3</Table.Cell>
              <Table.Cell>Unknown</Table.Cell>
              <Table.Cell positive>
                <Icon name="close" />
                Remove
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </>
      )}
    </div>
  );
}
export default Dashboard;
