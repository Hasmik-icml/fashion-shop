import { useEffect, useState } from "react";
import { getData } from "../../Services/api";
import CardItem from "./CardItem";
import "./card.css"

const Cards = () => {
  const [result, setResult] = useState([]);

  useEffect(() => {
    getData().then((param) => {
      setResult(param);
    });
  }, []);

  return (
    <div class="ui stackable three column grid">
      {result.map((item) => {
        return (
          <CardItem
            key={item._id}
            description={item.description}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        );
      })}
    </div>
  );
};

export default Cards;