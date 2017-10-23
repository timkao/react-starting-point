import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store from '../store';


class ProductForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      productName: '',
      productPrice: 0
    }
  }

  componentWillMount(){
    const { products } = this.props;
    const editingProduct = products.filter( product => {
      return product.id == this.props.info.match.params.productId
    })[0];
    console.log(editingProduct);
    this.setState({
      productName: editingProduct.name,
      productPrice: editingProduct.price
    })
  }

	render() {



		return (
      <div>check</div>
		)
	}
}

export default ProductForm;
