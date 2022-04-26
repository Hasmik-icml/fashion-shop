
import {
    Container,
    Grid,
    Header,
    Icon,
    Segment
  } from 'semantic-ui-react'
  import { Link } from "react-router-dom";
import "./footer.css"

// { as: Link, to: "/", content: "Home", key: "home" },
//   { as: Link, to: "/Products", content: "Products", key: "products" },

function Footer(){
    return (
        
      <div className="footer">
      <Segment inverted vertical style={{ padding: "5em 0em" }}>
        <Container>
          <Grid divided inverted stackable>
            <Grid.Row>
              <Grid.Column width="4">
                <Header inverted as="h4" as={Link} to="/" content="Home" />    
              </Grid.Column>

              <Grid.Column width="4">
                <Header inverted as="h4" as={Link} to="/Products" content="Products" />
              </Grid.Column>

              <Grid.Column width="4">
                 <Icon name='mail' />
                  gevorgyan.icml@gmail.com
              </Grid.Column>

              <Grid.Column width="4">
              <Icon name='phone square'/>
              +374 93128755
              </Grid.Column>
              
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    </div>
    )
}

export default Footer;