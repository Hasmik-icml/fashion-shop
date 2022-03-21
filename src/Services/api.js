
import { apiURL } from "../config";

export async function getData(){
    const response=await fetch("https://baby-island.herokuapp.com/homeproduct");
    const data=await response.json();
    return data;
}

export async function getProducts(){
    const response = await fetch(`${apiURL}/api/v1/product`)
    const data = await response.json();
    return data;
}