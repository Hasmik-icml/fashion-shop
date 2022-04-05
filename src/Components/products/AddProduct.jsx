import React, { useState } from "react";
import { Button, Form, Header, Image, Modal, Segment } from "semantic-ui-react";
// import BuyForm from "./BuyForm";
import AddProductsForm from "./AddProductsForm";
import { useAuth0 } from "@auth0/auth0-react";
import { confirmAddProduct } from "../../Services/api";

function AddProduct() {
    const { error, isAuthenticated, isLoading, user, getAccessTokenSilently } =
      useAuth0();
  
    // const { description, image, name, price } = productInfo;
  
    const [open, setOpen] = useState(false);
    const initFormData = {
        productName: "",
        producPrice: "", 
        producCurrency: "AMD",
        producDescription: "", 
        producCount: ""};
    const [options, setOptions] = useState(initFormData);
  
    async function confirmProduct() {
        try {
          const token = await getAccessTokenSilently();
          console.log("options",options);

          const productObj = {
            name: options.productName,
            price: options.producPrice,
            currency: options.producCurrency,
            price: options.producPrice,
            description:{
                comment:options.producDescription,
            },
            stock:{
                isAvailable:true,
                count:options.producCount
            }
          };
          const orderStatus = await confirmAddProduct(productObj, token);
        //   console.log(orderStatus);
        } catch (error) {
          console.log(error);
        }
      }
    function changeOptions(prop) {
        // console.log("prop",prop);
        setOptions({ ...options, ...prop });
      }
    
    return (
      <Modal
        className="custom-modal"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={
          <Button className="buyBtn" color="green" inverted floated="right">
            Add New Product
          </Button>
        }
      >
        <Modal.Content >
       <AddProductsForm changeOptions={changeOptions}/>

        </Modal.Content>
        
        <Modal.Actions>
          <Segment>
            <Segment.Inline>
              <Button color="black" onClick={() => setOpen(false)}>
                Nope
              </Button>
              <Button 
                className="buyBtn"
                content="Confirm"
                labelPosition="right"
                icon="checkmark"
                onClick={() => {
                  setOpen(false);
                  confirmProduct();

                }}
                positive
              />
            </Segment.Inline>
          </Segment>
        </Modal.Actions>
      </Modal>
    );
  }
  
  export default AddProduct;
  