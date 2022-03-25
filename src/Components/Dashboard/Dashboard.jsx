import "./dashboard.css";
import { getOrders, authoriseUser } from "../../Services/api";
import { useAuth0 } from "@auth0/auth0-react";

function Dashboard() {

  const { error, isAuthenticated, isLoading, user, getAccessTokenSilently } =
    useAuth0();

  (async function () {

    try {
      const token = await getAccessTokenSilently();
      const data = await getOrders(user.sub, token);

      if (data && Array.isArray(data)) {
        console.log("data", data);
        //renderin orders
      } else if (data && data.status === 401) {

        const authorised = await authoriseUser(user, token);
        
        console.log("authorised", authorised);
      } else {
        console.log("hajox");
      }
    } catch (error) {
      console.log("user not authorised");
    }
  })();

  return <div className="dashboard ui container">it's dashboard</div>;
}

export default Dashboard;
