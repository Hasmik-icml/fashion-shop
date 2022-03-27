import "./dashboard.css";
import { getOrders, authoriseUser } from "../../Services/api";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { Icon, Table, TableBody, TableCell, TableRow } from "semantic-ui-react";

function Dashboard() {
  const { error, isAuthenticated, isLoading, user, getAccessTokenSilently } =
    useAuth0();

  const [baseImage, setBaseIamge] = useState([]);

  async function uploadImage(e) {
    //  console.log(e.target.files[0])
    const file = e.target.files[0];
    // console.log("file", file);
    const base64 = await convertBase64(file);

    setBaseIamge([...baseImage, base64]);
  }
  // console.log("baseImage", baseImage);

  function convertBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      // console.log("fileReader.readAsDataURL",fileReader.readAsDataURL(file));

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  // (async function () {

  //   try {
  //     const token = await getAccessTokenSilently();
  //     const data = await getOrders(user.sub, token);

  //     if (data && Array.isArray(data)) {
  //       console.log("data", data);
  //       //renderin orders
  //     } else if (data && data.status === 401) {

  //       const authorised = await authoriseUser(user, token);

  //       console.log("authorised", authorised);
  //     } else {
  //       console.log("hajox");
  //     }
  //   } catch (error) {
  //     console.log("user not authorised");
  //   }
  // })();

  return (
    <div className="home main ui container">
      {/* uploading images  */}
      <div className="uploadedImages">
        <input
          type="file"
          onChange={(e) => {
            uploadImage(e);
          }}
        />
        {baseImage.map((item) => {
          return <img key={item} src={item} height="200px" />;
        })}
      </div>
      {/* table */}
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
    </div>
  );
}

export default Dashboard;
