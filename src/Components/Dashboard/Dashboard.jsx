import "./dashboard.css";
import { getOrders, authoriseUser } from "../../Services/api";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

function Dashboard() {

  const { error, isAuthenticated, isLoading, user, getAccessTokenSilently } =
    useAuth0();

  const [baseImage, setBaseIamge]= useState([]);


    async function uploadImage(e){
    //  console.log(e.target.files[0])
      const file = e.target.files[0];
      console.log("file", file);
      const base64 = await convertBase64(file);

      setBaseIamge([...baseImage, base64])
     
    }
    console.log("baseImage", baseImage);

    function convertBase64(file){
      return new Promise((resolve, reject)=>{
        const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          // console.log("fileReader.readAsDataURL",fileReader.readAsDataURL(file));

          fileReader.onload = ()=>{
            resolve(fileReader.result);
          }

          fileReader.onerror = (error)=>{
            reject(error);
          }
      })
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
    <div className="uploadedImages">
     <input type="file" onChange={(e)=>{
        uploadImage(e)
      }}/>
      {baseImage.map((item) =>{
        return  <img key ={item} src={item} height="200px" />;
      })}
    </div>
  )
}

export default Dashboard;
