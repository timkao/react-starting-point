import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Review from './Review';
import store, { fetchProduct, addItemToOrder, getCurrentOrder, setNavbarActive } from '../store';
import CrossItems from './CrossItems';


class Product extends Component {
	constructor(props) {
		super(props);
		this.state = { sizes: [], colorClicked: false, selectedColor: '', selectedSize: '', imgSwitchState: false }
		this.getSizes = this.getSizes.bind(this)
		this.renderSizes = this.renderSizes.bind(this)
		this.addItemToCart = this.addItemToCart.bind(this)
		this.setSize = this.setSize.bind(this)
		this.imgSwitch = this.imgSwitch.bind(this)
		this.setActiveNav = this.setActiveNav.bind(this)

	}

	componentDidMount(props) {
		const productId = this.props.productId * 1
		const productThunk = fetchProduct(productId)
		store.dispatch(productThunk)
		const orderThunk = getCurrentOrder();
		store.dispatch(orderThunk);
		//console.log(orderThunk)
		this.setState({
			sizes: this.props.sizes.sort((a, b) => {
				return Number(a) > Number(b)
			})
		})

	}

	componentWillReceiveProps(nextProps) {
		console.log(nextProps);
		if (nextProps.productId * 1 !== this.props.productId * 1) {
			const productThunk = fetchProduct(nextProps.productId)
			store.dispatch(productThunk)
		}

	}

	getSizes(e) {

		let color = e.target.id
		let inventory = this.props.product.inventory || []
		let colorObj = inventory.filter((obj) => {
			return obj[color]
		})
		colorObj = colorObj[0]
		let sizes = this.props.product.sizes.sort((a, b) => {
			return Number(a) > Number(b)
		})
		console.log('yo: ' + sizes)
		this.setState({ sizes, colorClicked: true, selectedColor: color })

	}

	setSize(e) {
		this.setState({ selectedSize: e.target.id })
	}

	imgSwitch(e) {

		this.setState({ imgSwitchState: this.state.imgSwitchState ? false : true })
	}

	addItemToCart(productId, orderId) {
		const thunk = addItemToOrder(orderId, productId, {
			color: this.state.selectedColor,
			size: this.state.selectedSize,
			quantity: 1
		});
		store.dispatch(thunk);
	}

	renderSizes() {
		//getting at allSizes off of first entry in inventory for now.
		//should.. be combining all of them to make a superlist within this product

		const product = this.props.product
		const inventory = product.inventory || []
		let intermediary = inventory.map(obj => { return (Object.keys(obj)) })
		let colors = [].concat.apply([], intermediary)

		let oneColor = inventory[0] || { 'fake_key': 'fake_val' }
		let oneColorKey = Object.keys(oneColor)[0] || 'fake_key'
		let allSizes = Object.keys(oneColor[oneColorKey]).sort((a, b) => {
			return Number(a) > Number(b)
		})

		if (this.state.colorClicked) {

			return (
				this.state.sizes.map(size => {
					return (
						<div className={this.state.selectedSize == size ? "btn clicked_btn" : "btn"} key={`size_${size}`} id={size} onClick={this.setSize}>
							<span className="btn__label" id={size}>{size}</span>
						</div>
					)
				})
			)

		}
		else {
			return (
				allSizes.map(size => {
					return (
						<div className="btn" key={`size_${size}`}>
							<span className="btn__label">{size}</span>
						</div>
					)
				})
			)

		}

	}

	setActiveNav(){

		store.dispatch(setNavbarActive(''))
	}

	render() {
		const product = this.props.product
		const inventory = product.inventory || []
		let intermediary = inventory.map(obj => { return (Object.keys(obj)) })
		let colors = [].concat.apply([], intermediary)
		let oneColor = inventory[0] || { 'fake_key': 'fake_val' }
		let oneColorKey = Object.keys(oneColor)[0] || 'fake_key'
		let allSizes = Object.keys(oneColor[oneColorKey])
		const order = this.props.currentOrder;
		const state = this.state
		//console.log(this.props);
		this.setActiveNav()
		return (
			<div className="container">
				<div className='row'>
				</div>
				<div className='row'>
					<div className='col-md-9'>
						<div className='row'>
							<img className="mainImg" src={state.imgSwitchState ? product.pictureUrl2 : product.pictureUrl} />
						</div>
						<div className='row'>
							<img className="bottomImg" onClick={this.imgSwitch} src={state.imgSwitchState ? product.pictureUrl : product.pictureUrl2} />
						</div>
					</div>

					<div className='col-md-3'>
						<h2>{product.name}</h2>
						<h3>Price ${product.price}.00</h3>
						<p>{product.description}</p>
						<h4>Color</h4>
						<div className='colorRects'>
							{colors.map(color => {
								var rectStyle = {
									backgroundColor: color,
									outlineWidth: '1px'
								}
								var activeRectStyle = {
									backgroundColor: color,
									outlineWidth: '3px'
								}
								return (<div key={color} >
									<div id={color} style={this.state.selectedColor == color ? activeRectStyle : rectStyle} onClick={this.getSizes} className="rectangle"></div>
								</div>)
							})}
						</div>

						<h4>Size</h4>
						{this.renderSizes()}
						<div>{product.size}</div>
						<button onClick={() => { this.addItemToCart(product.id, order.id) }} className="btn btn-default single_btn">Add To Cart</button>
					</div>
				</div>
				<Review productId={this.props.productId} />
				<div className="row">
				<h2 className="centeredHeader">&#9733;&#9733;&#9733;People Also Buy&#9733;&#9733;&#9733;</h2>
				</div>
				<div className="row">
					<CrossItems id={this.props.match.params.productId * 1} />
				</div>
			</div>
		)
	}

}

const mapToState = (state, ownProps) => {
	return {
		productId: ownProps.match.params.productId,
		product: state.product,
		currentOrder: state.currentOrder,
		navbarActive: state.navbarActive,
	}
}

const mapToDispatch = (dispatch) => {
	return {

	}
}

const ProductContainer = connect(mapToState, mapToDispatch)(Product)
export default ProductContainer
