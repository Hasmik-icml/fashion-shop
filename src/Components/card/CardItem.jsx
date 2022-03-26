
import { useState } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'


function CardItem({descriptions, img, name, price}){
  const [images, setImages] = useState([])

  const file = JSON.parse(img[0].imagePath)
 
    return (
        <Card centered>
         <img src={file} height="200px" />
          {/* <Image src={""+img} height="200px" /> */}
          <Card.Content>
            <Card.Header>{name}</Card.Header>
            <Card.Description>
              {descriptions.comment}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
          {price}
            {/* <a>
              <Icon name='user' />
              22 Friends
            </a> */}
          </Card.Content>
        </Card>
      )
}

export default CardItem;



