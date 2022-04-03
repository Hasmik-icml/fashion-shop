import "./cardItem.css"
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { Button, Card, Icon, Image } from "semantic-ui-react";
import BuyProduct from "../buyProduct/BuyProduct";
import { Link } from "react-router-dom";

function CardItem({ description, img, name, price, item }) {
  const { isAuthenticated, user } = useAuth0;
  
  return (
    <Card centered>
      <Image src={img} height="200px" />
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Description>{description.comment}</Card.Description>
      </Card.Content>

      <Card.Content>
    <div>
    {price}
        {isAuthenticated ? (
          <BuyProduct
            item={item}
            productInfo={{ description, img, name, price }}
          />
        ) : (
          <button as={Link} to="/login" className="btn">
            BUY
          </button>
        )}
    </div>
      </Card.Content>
      

    </Card>
  );
}

export default CardItem;
