import Cards from "../card/Cards";
import Slide from "../Slide/Slide"
import slidesData from "../../Services/slideData";
import "../home/home.css"
import { createContext, useState } from 'react';
import {Message, Sticky} from "semantic-ui-react"

export const homeDataContext = createContext(null);

function Home(){
    const [responseInfo, setResponseInfo] = useState("");

    function message(messageInfo){
        setResponseInfo(messageInfo);
    }
    function handleDismiss() {
        setResponseInfo("");
      }

    return (
        <homeDataContext.Provider value={message}>
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
                        <Slide slides={slidesData()}/>
                        <Cards />
                </div>
       </homeDataContext.Provider>
    )
}
export default Home;