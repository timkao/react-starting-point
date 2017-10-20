import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import store, {fetchProduct, addItemToOrder, getCurrentOrder} from '../store';

class Product extends Component{
	constructor(props){
		super(props);
		this.state = {sizes:[], colorClicked:false}
		this.getSizes = this.getSizes.bind(this)
		this.renderSizes = this.renderSizes.bind(this)
	}

	componentDidMount(props){
		const productId = this.props.productId*1
		const productThunk = fetchProduct(productId)
		store.dispatch(productThunk)
		const orderThunk = getCurrentOrder();
		store.dispatch(orderThunk);
	}

	getSizes(e){
		let color = e.target.id
		let inventory = this.props.product.inventory || []
		let colorObj = inventory.filter((obj)=> {
			return obj[color]
		})
		colorObj = colorObj[0]
		let sizes = Object.keys(colorObj[color]).filter(key => {
			return colorObj[color][key] != '0'

		})

		this.setState({sizes, colorClicked:true})

	}

	renderSizes(){
		//getting at allSizes off of first entry in inventory for now.
		//should.. be combining all of them to make a superlist within this product
		const product=this.props.product
		const inventory = product.inventory || []
		let intermediary = inventory.map(obj=>{return(Object.keys(obj))})
		let colors = [].concat.apply([], intermediary)

		let oneColor = inventory[0] || {'fake_key': 'fake_val'}
		let oneColorKey = Object.keys(oneColor)[0] || 'fake_key'
		let allSizes = Object.keys(oneColor[oneColorKey])

		if(this.state.colorClicked){

			return (
				this.state.sizes.map(size=>{
					return(
						<div className="btn" key={`size_${size}`}>
						<span className="btn__label">{size}</span>
						</div>
						)
				})
				)

			}
		else{
			return(
				allSizes.map(size =>{
					return(
						<div className="btn" key={`size_${size}`}>
						<span className="btn__label">{size}</span>
						</div>
						)
				})
				)

			}

	}

	render(){
		const product=this.props.product
		const inventory = product.inventory || []
		let intermediary = inventory.map(obj=>{return(Object.keys(obj))})
		let colors = [].concat.apply([], intermediary)

		let oneColor = inventory[0] || {'fake_key': 'fake_val'}
		let oneColorKey = Object.keys(oneColor)[0] || 'fake_key'
		let allSizes = Object.keys(oneColor[oneColorKey])
		console.log(this.state)
		const order = this.props.currentOrder;
		const state = this.state
		return(
			<div>
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
						<div className='colorRects'>
						{colors.map(color => {
							var rectStyle = {
								backgroundColor: color
							}
							return(<div key={color} >
									<div id={color} style={rectStyle} onClick={this.getSizes} className="rectangle"></div>
								</div>)
						})}
						</div>

						<h4>Size</h4>
							{ this.renderSizes()}


						<div>{product.size}</div>
						<button onClick={() => {this.props.addItemToCart(product.id, order.id)} }className="btn btn-default single_btn">Add To Cart</button>
					</div>
				</div>
			</div>
			)
	}

}

const mapToState = (state, ownProps) => {
	return {
		productId: ownProps.match.params.productId,
		product: state.product,
		currentOrder: state.currentOrder
	}
}

const mapToDispatch = (dispatch) => {
	return {
		addItemToCart(productId, orderId) {
      const thunk = addItemToOrder(orderId, productId, {
        color: 'need your input',
				size: 'need your input',
				quantity: 1
      });
			dispatch(thunk);
    }
	}
}

const ProductContainer = connect(mapToState, mapToDispatch)(Product)
export default ProductContainer

/*
<div>{props.products[0]}</div>

<Link className="thumbnail" to={`/albums/${album.id}`}>
*/

// <div className="rectangle"></div>

// onClick=someFunction

// <div key={color}>
// 	<div>{color}</div>
// 	<div className="rectangle"></div>
// </div>
// style={`color:'${color}'`}
