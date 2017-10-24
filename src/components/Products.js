import React, {Component} from 'react'
import axios from 'axios'
import Slider, { Range } from 'rc-slider';
import { Link } from 'react-router-dom';
//import 'rc-slider/assets/index.css';

export default class Products extends Component {
    constructor(props){
        super();
        this.state = {
            products: [],
            selectedColors: [],
            selectedSizes: [],
            selectedPrices: []
        }
        this.originalProducts = [];
        this.selectColor = this.selectColor.bind(this)
        this.selectSizes = this.selectSizes.bind(this)
        this.filterProducts = this.filterProducts.bind(this)
        this.filterSizes = this.filterSizes.bind(this)
        this.filterColors = this.filterColors.bind(this)
        this.filterPrices = this.filterPrices.bind(this)
        this.selectPrice = this.selectPrice.bind(this)
    }
    componentDidMount(){
        axios.get(`/api/categories/${this.props.match.params.categoryName}`)
        .then(res => res.data)
        .then(category => {
            this.originalProducts = category[0].products;
            this.setState({
                products: category[0].products
            })
        })
    }
    componentWillReceiveProps(newProps){
        axios.get(`/api/categories/${newProps.match.params.categoryName}`)
        .then(res => res.data)
        .then(category => {
            this.originalProducts = category[0].products;
            this.setState({
                products: category[0].products,
                selectedColors: [],
                selectedSizes: [],
                selectedPrices: []
            })
        })
    }
    filterColors(){
        const filteredColors = [];
        if(this.state.selectedColors.length > 0){
            this.originalProducts.forEach((product) => {
                for(var i = 0; i < this.state.selectedColors.length; i++){
                    if(product.colors.indexOf(this.state.selectedColors[i]) > -1){
                        filteredColors.push(product)
                        break
                    }
                }
            })
            this.setState({
                products: filteredColors
            }, () => this.filterSizes(this.state.products))
        }
        else {
            this.setState({
                products: this.originalProducts
            }, () => this.filterSizes(this.state.products))
        }
    }
    filterProducts(){
        this.filterColors();
    }
    filterSizes(products){
        console.log(products)
        const filteredColors = products
        const filteredSizes = []
        if(this.state.selectedSizes.length > 0){
            console.log('hey');
            products.forEach((product) => {
                for(var i = 0; i < this.state.selectedSizes.length; i++){
                    if(product.sizes.indexOf(this.state.selectedSizes[i]) > -1){
                        filteredSizes.push(product)
                        break
                    }
                }
            })
            this.setState({
                products: filteredSizes
            }, () => this.filterPrices(this.state.products))
        }
        else {
            this.setState({
                products: products
            }, () => this.filterPrices(this.state.products))
        }
    }
    filterPrices(products){
        const filteredSizes = products
        const filteredPrices = []
        if(this.state.selectedPrices.length > 0){
            products.forEach((product) => {
                if(product.price >= this.state.selectedPrices[0] && product.price <= this.state.selectedPrices[1]){
                    filteredPrices.push(product)
                }
            })
            this.setState({
                products: filteredPrices
            })
        }
        else {
            this.setState({
                products: products
            })
        }
    }
    selectPrice(e){
        this.setState({
            selectedPrices: e
        }, () => this.filterProducts())
    }
    selectSizes(e){
        if(this.state.selectedSizes.includes(e.target.dataset.value)){
            this.setState({
                selectedSizes: this.state.selectedSizes.filter((size) => {
                    return size != e.target.dataset.value
                })
            }, () => this.filterProducts())
        }
        else {
            this.setState({
                selectedSizes: [...this.state.selectedSizes, e.target.dataset.value]
            }, () => this.filterProducts())
        }
    }
    selectColor(e){
        if(this.state.selectedColors.includes(e.target.dataset.value)){
            this.setState({
                selectedColors: this.state.selectedColors.filter((color) => {
                    return color != e.target.dataset.value
                })
            }, () => this.filterProducts())
        }
        else {
            this.setState({
                selectedColors: [...this.state.selectedColors, e.target.dataset.value]
            }, () => this.filterProducts())
        }
    }
    render(){
        const categoryName = this.props.match.params.categoryName;
        const {products, selectedColors, selectedSizes} = this.state;
        const availableColors = ['red','white','blue','black','green','pink','yellow','purple']
        const availableSizes = ['8.0', '8.5','9.0', '9.5','10.0', '10.5','11.0', '11.5','12.0']
        const originalProducts = this.originalProducts
        const marks = {
            0: <strong>0</strong>,
            100: <strong>100</strong>,
            200: <strong>200</strong>,
            300: <strong>300</strong>,
            400: <strong>400</strong>,
            500: <strong>500</strong>,
            600: <strong>600</strong>,
            700: <strong>700</strong>,
            800: <strong>800</strong>
          };
        return (
            <div>
            <section className='categoryHeroSection'>
              <div className={`categoryHero ${categoryName}`}>
                <div className='wrapper'>
                    <div className='heroText'>
                      <h2>{`${categoryName}'s Sneakers`}</h2>
                    </div>
                </div>
              </div>
            </section>
            <div>
            <section className='filterSection'>
              <div className='wrapper'>
                <div className='filters'>
                  <div className='colorFilter'>
                    <p>Colors:</p>
                    {
                        availableColors.map( (color, i)=>(
                            <div data-value={color} onClick={this.selectColor} key={i} className={'colorTileFilter' +(selectedColors.includes(color) ?' clicked':'')} style={{backgroundColor:`${color}`}}></div>
                        ))
                    }
                  </div>
                  <div className='sizeFilter'>
                    <p>Sizes:</p>
                    {
                        availableSizes.map(size=>(
                            <div data-value={size} onClick={this.selectSizes} key={size} className={'sizeTileFilter' +(selectedSizes.includes(size) ?' clicked':'')}>{size}</div>
                        ))
                    }
                  </div>
                  <div className='priceFilter'>
                    <p>Price:</p>
                    <Range step={50} defaultValue={[0, 800]} min={0} max={800} marks={marks} dots={true} onAfterChange={this.selectPrice}/>
                  </div>
                </div>
              </div>
            </section></div>
            <section className='products'>
              <div className='wrapper'>
              <div className='productRow'>
                {
                    products.map( (product, i) => (
                        <div key={i} className='product'>
                            <Link to={`/product/${product.id}`}><img src={product.pictureUrl} /></Link>
                            <div className='productDetails'>
                                <div className='productName'>
                                    <h4>{product.name}</h4>
                                </div>
                                <div className='productPrice'>
                                    <h4>$ {product.price}</h4>
                                </div>
                            </div>
                            <div className='productColors'>
                                {
                                    product.colors.map( (color) => (
                                        <div key={color} className='colorTile' style={{backgroundColor:`${color}`}}></div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
                </div>
              </div>
            </section>
            </div>
        )
    }
}
