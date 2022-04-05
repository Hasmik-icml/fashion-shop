import {
  Form,
  Input,
  TextArea,
  Button,
  Select,
  Radio,
} from "semantic-ui-react";

function AddProductsForm({changeOptions}) {

    function handleChange(event){
            changeOptions({[event.target.name]:event.target.value});
        }
  return (
    <div>
        <h4>Add New Product</h4>
      <Form>
        <Form.Field
          id="form-input-control-productName"
          control={Input}
          label="productName"
          placeholder="productName"
          onChange = {(e)=>handleChange(e)}
        />
        <Form.Field
          id="form-input-control-productPrice"
          control={Input}
          type="number"
          label="productPrice"
          placeholder="0.0"
          value={"productPrice"}
          onChange = {(e)=>handleChange(e)}
        />
        <Form.Field
          id="form-input-control-productDescription"
          control={TextArea}
          label="productDescription"
          placeholder="productDescription"
          onChange = {(e)=>handleChange(e)}
        />
        <Form.Field
          id="form-input-control-productCount"
          control={Input}
          type="number"
          label="productCount"
          placeholder="productCount"
          onChange = {(e)=>handleChange(e)}
        />
      </Form>
    </div>
  );
}
export default AddProductsForm;

