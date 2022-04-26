import { Pagination } from "semantic-ui-react";
import {useEffect, useRef, useState} from "react"

function Paginations({result, getProductsByPage, getOrdersByPage, tabIndex}){

const pageDivider = 3;
const [start, setStart] = useState(0);

function goToPage(e, data) {
  setStart(data.activePage * pageDivider - pageDivider);
}

useEffect(() => {
  if(result && getProductsByPage) getProductsByPage(result.slice(start, start + pageDivider));
  if(result && getOrdersByPage) getOrdersByPage(result.slice(start, start + pageDivider)); 
}, [start, result ]); 

useEffect(()=>{
  setStart(0)
}, [tabIndex])

console.log("result " ,  result);

    return(
     <>
      {result && result.length > pageDivider ? 
        <Pagination
        boundaryRange={0}
        defaultActivePage={1}
        ellipsisItem={null}
        firstItem={null}
        lastItem={null}
        siblingRange={1}
        secondary
        onPageChange={goToPage}
        totalPages={Math.ceil(result.length / pageDivider)}
      />: ""
    }
     </>
    )
}

export default Paginations;