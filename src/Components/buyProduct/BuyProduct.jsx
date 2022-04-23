import React, { useState, useEffect} from "react";
import { Button, Form, Header, Image, Modal, Segment } from "semantic-ui-react";
import BuyForm from "./BuyForm";
import "./BuyProduct.css";
import logo from "../../logoNavBar.jpg";
import { confirmOrder } from "../../Services/api";
import { useAuth0 } from "@auth0/auth0-react";

function BuyProduct({ productInfo, item, setResponseInfo, stock }) {

    const { error, isAuthenticated, isLoading, user, getAccessTokenSilently } =
      useAuth0();
  
    const { description, img, name, price, currency } = productInfo;
  
    const [open, setOpen] = useState(false);
    const inintFormData = { address: "", phone: "", paymentMethod: "cash" };
    const [options, setOptions] = useState(inintFormData);
    const [disable, setDisable] = useState(true);

    async function confirmAction() {
      try {
        const token = await getAccessTokenSilently();
        const userObj = {
          id: user.sub,
          email: user.email,
          name: user.name,
          picture: user.picture,
        };
        const orderStatus = await confirmOrder(userObj, item, token, options);

        console.log(orderStatus);
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
      if (open === false) {
        resetOptions();
      }

      let status = false;
      for (let key in options) {
         console.log(options[key]);
        if (!options[key] && key !== "paymentMethod") {
          
          status = true;
        }
      }
     
      setDisable(status);
    }, [options, open]);
    
  
    function resetOptions() {
      for (let key in options) {
        if (key != "paymentMethod") {
          options[key] = "";
        }
      }
    }
  

    function changeOptions(prop) {
      console.log("prop",prop);
      setOptions({ ...options, ...prop });
    }
    return (
      <Modal
        className="custom-modal"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={
          <Button className="buyBtn modalBuyBtn" disabled={stock < 1 ? true : false} >
            BUY
          </Button>
        }
      >
        <Modal.Content image>
          <Image
            size="small"
            src={
              img.length > 0 ? img[0].imagePath :
              logo
            }
            wrapped
          />

        <Modal.Description>
            <Header>{name}</Header>
            <p>{description}</p>
           {price} {currency}
          </Modal.Description>

  
        </Modal.Content>
          <Modal.Content>
          <BuyForm userName={user.name} changeOptions={changeOptions} />
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
                disabled={disable}
                labelPosition="right"
                icon="checkmark"
                onClick={() => {
                  setOpen(false);
                  setDisable(true);
                  confirmAction();
                }}
                positive
              />
            </Segment.Inline>
          </Segment>
        </Modal.Actions>
      </Modal>
    );
  }
  
  export default BuyProduct;
  