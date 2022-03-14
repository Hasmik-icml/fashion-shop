

async function req(){
    await fetch('https://baby-island.herokuapp.com/homeproduct')
    .then((response)=>{
        return response.json();
    })
    .then((data) => {
        console.log(data);
      });
    return (

    )
}

export default req;