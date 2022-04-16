import { Pagination } from "semantic-ui-react";
import {useEffect, useState} from "react"

function Paginations({result, getProductsByPage}){
const pageDivider = 3;
const [productsByPage, setProductsByPage] = useState([]);
const [start, setStart] = useState(0);

useEffect(() => {
    setProductsByPage(result.slice(start, start + pageDivider));
    getProductsByPage(productsByPage);
}, [start, result]);

function goToPage(e, data) {
    console.log("data.activePage + result " , data.activePage , result);
    setStart(data.activePage * pageDivider - pageDivider);
  }
  console.log("productsByPage ", productsByPage);
  
    return(
        <Pagination
        defaultActivePage={1}
        secondary
        onPageChange={goToPage}
        totalPages={Math.ceil(result.length / pageDivider)}
      />
    )
}
export default Paginations;