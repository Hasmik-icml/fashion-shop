
import { apiURL } from "../config";




export async function getData(){
    const response=await fetch("https://baby-island.herokuapp.com/homeproduct");
    const data=await response.json();
    return data;
}

export async function getProducts(){
    try{
        const response = await fetch(`${apiURL}product/get-all`)
        console.log("productData", response)
        const data = await response.json();
        console.log("productData", data)
        return data;
    }catch(error){
        console.log("wrong", error);
    }
   
    
    
}

export async function getOrders(user_id, token){
    try {
        const response = await fetch(`${apiURL}order/user-order`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                user_id: user_id
            }
        })
        return await response.json();
    }catch (error){
        console.log("wrong", error);
    }

}

export async function authoriseUser(user, token){
    const {sub:id, name, email, picture} = user;
    try{
        const response = await fetch(`${apiURL}login/signup`,{
            method: "POST",
            headers: {
                Authorization:`Bearer ${token}`,
                "Content-Type": "application/json;charset=utf-8",
                user_id: user,
            },
                body: JSON.stringify({
                id,
                name,
                email,
                picture,
              }),
        })
        return response.json();
    }catch(error){
        console.log("wrong post", error);
    }
}