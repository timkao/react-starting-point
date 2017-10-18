import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import store, {fetchProduct} from '../store';

class Product extends Component{
	constructor(props){
		super(props);
		this.state = {sizes:[], clickedColor:''}
	}
	componentDidMount(props){
		const productId = this.props.productId*1
		const productThunk = fetchProduct(productId)
		store.dispatch(productThunk)
		console.log(props)
	}
	
	// someFunction(e){
	// 	let color = e.target.value //.text?
	// 	let inventory = this.props.product.inventory
	// 	blah blah
	// 	this.setState()

	// }

	render(){
		const product=this.props.product
		const inventory = product.inventory || []
		let intermediary = inventory.map(obj=>{return(Object.keys(obj))})
		let colors = [].concat.apply([], intermediary)
		let oneColor = inventory[0] || {'fake_key': 'fake_val'}
		let oneColorKey = Object.keys(oneColor)[0] || 'fake_key'
		// if (oneColor[oneColorKey]){
		// }
		let sizes = Object.keys(oneColor[oneColorKey])
		// let sizeObj = Object.keys(oneColor[oneColorKey]) || {}
		
		
		// let intermediary2 = Object.keys(sizeObj)
		// let sizes = [].concat.apply([], intermediary2)
		// console.log(sizes)
		
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
						{colors.map(color => {
							return(<div onClick=someFunction key={color}>{color}</div>)
						})}
						
						<h4>Size</h4>
						{sizes.map(size =>{
							return(<div>{size}</div>)
						})}
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

