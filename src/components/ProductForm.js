import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store, { fetchProducts, updateProduct } from '../store';
import { connect } from 'react-redux';


class ProductForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      productName: '',
      productPrice: 0
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    const { products } = this.props;
    const editingProduct = products.filter(product => {
      return product.id == this.props.info.match.params.productId
    })[0];
    this.setState({
      productName: editingProduct.name,
      productPrice: editingProduct.price
    })
  }

  componentWillReceiveProps(nextProps) {
    const { products } = nextProps;
    const editingProduct = products.filter(product => {
      return product.id == nextProps.info.match.params.productId
    })[0];
    this.setState({
      productName: editingProduct.name,
      productPrice: editingProduct.price
    })
  }

  handleChange(evt){
    if (evt.target.name === 'name') {
      this.setState({productName: evt.target.value});
    }
    else {
      this.setState({productPrice: evt.target.value});
    }
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const id = this.props.info.match.params.productId;
    // console.log(evt.target.name.value);
    // console.log(evt.target.price.value);
    const info = {
      name: evt.target.name.value,
      price: evt.target.price.value * 1
    }
    const thunk = updateProduct(id, info)
    store.dispatch(thunk);
  }

  render() {

    const { productName, productPrice } = this.state;
    const { handleChange, handleSubmit } = this;

    return (
      <div className="panel panel-default">
        <div className="panel panel-heading lead">Edit Product</div>
        <div className="panel panel-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Product Name</label>
              <input onChange={handleChange} type="text" className="form-control" value={productName} name="name" />
            </div>
            <div className="form-group">
              <label>Product Price</label>
              <input onChange={handleChange} type="number" className="form-control" value={productPrice} name="price" />
            </div>
            <div className="form-group">
              <input type="submit" className="form-control btn-primary" />
            </div>
          </form>
        </div>

      </div>
    )
  }
}


export default ProductForm;
