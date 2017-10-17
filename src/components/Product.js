import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import store, {fetchProduct} from '../store';

class Product extends Component{
	constructor(props){
		super(props);
		
	}
	componentDidMount(props){
		const productId = this.props.productId*1
		const productThunk = fetchProduct(productId)
		store.dispatch(productThunk)
		console.log(props)
	}
	
	render(){
		const product=this.props.product
		console.log(product)
		const inventory = product.inventory
		console.log(inventory)
		// console.log(inventory.map(obj => {return(obj)}))
		
		return(
			<div>Hello product id {this.props.productId}
				<div className='row'>
				</div>
				<div className='row'>
					<div className='col-md-9'>
						<img src={product.pictureUrl}/>
						
					</div>	
					<div className='col-md-3'>
						<h2>{product.name}</h2>
						<h3>Price ${product.price}.00</h3>
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

