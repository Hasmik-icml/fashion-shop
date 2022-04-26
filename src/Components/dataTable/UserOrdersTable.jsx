import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { Grid, Segment, List, Image, Popup } from "semantic-ui-react";
import logo from "../../logoNavBar.jpg";
import "./dataTable.css";

function UserOrdersTable({ list }) {
  const [result, setResult] = useState([]);

  useEffect(() => {
    setResult(list);
  }, [list]);

  return (
    <>
      {result &&
        result.length > 0 &&
        result.map((item) => {
          return (
            <Popup
              inverted
              content={new Date(item.date).toString()}
              key={nanoid()}
              header={item.user.name}
              className="tooltip"
              trigger={
                <Grid className="grid-table" key={nanoid()}>
                  <Grid.Row>
                    <Grid.Column width="3">
                      <Segment.Inline className="orderId">
                        {`Order N ${item.id}`}
                      </Segment.Inline>
                    </Grid.Column>
                    <Grid.Column width="3">
                      <Segment.Inline>
                        <Image
                          avatar
                          className="product-icon"
                          src={item.product.img[0]?.imagePath || logo}
                        />
                      </Segment.Inline>
                    </Grid.Column>
                    <Grid.Column width="4">
                      <Segment.Inline>
                        <List.Content>
                          <List.Header >{item.product.name} </List.Header>
                          <div className="price">
                        {item.product.price} {item.product.currency}
                      </div>
                        </List.Content>
                      </Segment.Inline>
                    </Grid.Column>
                    <Grid.Column width="3">
                      <Segment.Inline>{item.phone}</Segment.Inline>
                      <Segment.Inline>{item.address}</Segment.Inline>
                    </Grid.Column>

                    <Grid.Column width="3">
                      <Segment.Inline>{item.orderStatus}</Segment.Inline>
                    </Grid.Column>


                    {/* <Grid.Column width="3"></Grid.Column> */}
                  </Grid.Row>
                </Grid>
              }
            />
          );
        })}
    </>
  );
}

export default UserOrdersTable;
