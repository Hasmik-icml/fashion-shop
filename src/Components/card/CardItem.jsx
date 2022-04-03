
import { useState } from 'react';
import { Button, Card, Icon, Image } from 'semantic-ui-react'


function CardItem({description, img, name, price}){
 
    return (
        <Card centered>
         <img src={""} height="200px" />
          {/* <Image src={""+img} height="200px" /> */}
          <Card.Content>
            <Card.Header>{name}</Card.Header>
            <Card.Description>
              {description.comment}
            </Card.Description>
          </Card.Content>

          <Card.Content extra>
          {price}
            {/* <a>
              <Icon name='user' />
              22 Friends
            </a> */}
          </Card.Content>
          {/* <Card.Content extra>
          <Button>BUY</Button>
          </Card.Content> */}
        </Card>
      )
}

export default CardItem;



