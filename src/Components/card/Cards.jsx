import { useEffect, useState } from "react";
import { getData, getProducts } from "../../Services/api";
import CardItem from "./CardItem";
import "./card.css"

const Cards = () => {
  const [result, setResult] = useState([]);

  useEffect(() => {
    getProducts().then((param) => {
      setResult(param);
    });
  }, []);

  return (
    <div className="ui stackable three column grid">
      
      {result.map((item) => {

        return (
          
          <CardItem
            key={item.id}
            description={item.description}
            img={item.img}
            name={item.name}
            price={item.price}
          />
        );
      })}
    </div>
  );
};

export default Cards;