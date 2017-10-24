import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts, removeProduct } from '../store';
import { Link, Route } from 'react-router-dom';
import BarChart from './BarChart';
import faker from 'faker';
import ProductForm from './ProductForm';


class AdminP extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getAllProducts();
  }

  render() {
    const priceData = [];
    const labelData = [];
    const { products } = this.props;
    products.forEach(product => {
      priceData.push(product.price);
      labelData.push(product.name);
    })

    return (
      <div>
        <div className="row">
          {
            products.length && <BarChart data={priceData} labels={labelData} />
          }
        </div>
        <div id="admin-product" className="row">
          <div className="col-lg-8">
            {
              products.length && products.map(product => {
                return (
                  <div key={product.id} className="row">
                    <div className="col-lg-3">
                      <img src={product.pictureUrl} />
                    </div>
                    <div className="col-lg-3">
                      Name: {product.name}
                    </div>
                    <div className="col-lg-3">
                      Price: $ {product.price}
                    </div>
                    <div className="col-lg-3">
                    <Link to={`/Admin/editProduct/${product.id}`}><button className="btn btn-default">edit</button></Link>
                      <button onClick={(evt) => {this.props.handleDelete(evt, product.id)}} className="btn btn-danger">delete</button>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className="col-lg-4">
            {
            products.length && <Route exact path='/Admin/editProduct/:productId' render={(props) => <ProductForm info={props} products={products} />} />
            }
          </div>
        </div>
      </div>

    )
  }
}

const mapToState = (state) => {
  return {
    products: state.products
  }
}

const mapToDispatch = (dispatch, ownProps) => {
  return {
    getAllProducts() {
      const thunk = fetchProducts()
      dispatch(thunk);
    },
    handleDelete(evt, id) {
      evt.preventDefault();
      const thunk = removeProduct(id);
      dispatch(thunk);
    }
  }
}

const adminPContainer = connect(mapToState, mapToDispatch)(AdminP)

export default adminPContainer;

