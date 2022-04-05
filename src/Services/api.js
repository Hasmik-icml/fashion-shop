import {
    apiURL
} from "../config";

// export async function getData(){
//     const response=await fetch("https://baby-island.herokuapp.com/homeproduct");
//     const data=await response.json();
//     return data;
// }

export async function getProducts() {
    try {
        const response = await fetch(`${apiURL}product/get-all`)
        console.log("productData", response)
        const data = await response.json();
        console.log("productData", data)
        return data;
    } catch (error) {
        console.log("wrong", error);
    }
}

export async function getOrders(user_id, token) {
    try {
        const response = await fetch(`${apiURL}order/user-order`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                user_id: user_id
            }
        })
        return await response.json();
    } catch (error) {
        console.log("wrong", error);
    }

}
export async function getAllOrders(user_id, token) {
    try {
        const response = await fetch(`${apiURL}order/get-all`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                user_id: user_id
            }
        })
        return await response.json();
    } catch (error) {
        console.log("wrong", error);
    }
}

export async function getOrderByStatus(user_id, token, status) {
    try {
        const response = await fetch(`${apiURL}order/user-order`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                user_id: user_id,
                status: status
            }
        })
        return await response.json();
    } catch (error) {
        console.log("wrong", error);
    }
}

export async function authoriseUser(user, token) {
    const {
        sub: id,
        name,
        email,
        picture
    } = user;
    try {
        const response = await fetch(`${apiURL}login/signup`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
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
    } catch (error) {
        console.log("wrong post", error);
    }
}
export async function confirmOrder(user, product, token, option) {
    const {
        sub: id,
        name,
        email,
        picture
    } = user;
    const {
        address,
        paymentMethod,
        phone
    } = option;

    const body = {
        date: new Date().valueOf(),
        user: user,
        product: product,
        count: 1,

        orderStatus: paymentMethod === "cash" ? "UNPAID" : "PAID",
        address: address,
        phone: phone,

    };
    try {
        const response = await fetch(`${apiURL}order`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json;charset=utf-8",
                user_id: user,
            },
            body: JSON.stringify(body),
        });
        return response.json();
    } catch (error) {
        console.log("sxalPost", error);
    }
}

export async function confirmAddProduct(productObj, token) {
    const {
        name,
        price,
        currency,
        desctiption,
        count
    } = productObj;

    try {
        const response = await fetch(`${apiURL}product`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(productObj),
        });
        return response.json();
    } catch (error) {
        console.log("sxalPost", error);
    }
}



{
    /* {
      "name": "Cola",
      "price": 4.5,
      "currency":"AMD",
      "description":{
          "comment":"Fanta is wery useful drink"
      },
      "stock":{
          "isAvailable":true,
          "count":600
      }
     
  } */
}