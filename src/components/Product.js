import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import store, {fetchProduct} from '../store';

class Product extends Component{
	componentDidMount(){
		const productId = this.props.productId*1
		const productThunk = fetchProduct(productId)
		store.dispatch(productThunk)
	}
	render(){
		const product=this.props.product
		console.log(product)
		return(
			<div>Hello product id {this.props.productId}
				<div className='row'>
				
				</div>
				<div className='row'>
					<div className='col-md-9'>
						<img src={product.picture1Url}/>
						
					</div>	
					<div className='col-md-3'>
						<h2>{product.name}</h2>
						<h3>Price {product.price}</h3>
						<p>{product.description}</p>
						<h4>Color</h4>
						<div>{product.color}</div>
						<h4>Size</h4>
						<div>{product.size}</div>
						<div>addtocart Button</div>
					</div>
				</div>
			</div>
			)	
	}
	
}	

const mapToState = (state, ownProps) => {
	return {
		productId: ownProps.match.params.productId,
		product: state.product
	}
}

const mapToDispatch = (dispatch) => {
	return {

	}
}

const ProductContainer = connect(mapToState, mapToDispatch)(Product)
export default ProductContainer

/*
<div>{props.products[0]}</div>

<Link className="thumbnail" to={`/albums/${album.id}`}>
*/

