
import Cards from "../card/Cards";
import Slides from "../Slide/Slide";
import secondSlideData from "../../Services/secondSlideData"
import { createContext, useState } from 'react';
import {Message, Sticky} from "semantic-ui-react"

export const productDataContext = createContext(null);


function Products() {
  const [responseInfo, setResponseInfo] = useState("");

  function productMessage(messageInfo){
    console.log("message=", messageInfo);
      setResponseInfo(messageInfo);
  }
  function handleDismiss() {
      setResponseInfo("");
    }

  return (
    <productDataContext.Provider value={productMessage}>
          <div className="home main ui container">
                      {responseInfo.length > 0 && responseInfo === "something went wrong" ? (
                          <Sticky>
                          <Message top-center negative onDismiss={handleDismiss} content={responseInfo} />
                          </Sticky>
                      ) : responseInfo.length > 0 && responseInfo !== "something went wrong" ? (
                          <Sticky>
                          <Message success onDismiss={handleDismiss} content={responseInfo} />
                          </Sticky>
                      ) : (
                          ""
                      )}
            <Slides slides={secondSlideData()}/>
            <Cards />
          </div>
    </productDataContext.Provider>
  );
}
export default Products;
