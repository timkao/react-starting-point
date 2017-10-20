import React, {Component} from 'react'
import axios from 'axios'
export default class Products extends Component {
    constructor(props){
        super();
        this.state = {
            products: [],
            selectedColors: []
        }
        this.originalProducts = [];
        this.selectColor = this.selectColor.bind(this);
        //this.filteredProducts = this.filterProducts.bind(this);
    }
    componentDidMount(){
        axios.get(`/api/categories/${this.props.match.params.categoryName}`)
        .then(res => res.data)
        .then(category => {
            console.log(category);
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
            console.log(category);
            this.setState({
                products: category[0].products
            })
        })
    }
    //filterProducts(){
    //    this.setState({
    //        products: this.originalProducts.includes(this.state.selectedColors)
    //    })
   // }
    selectColor(e){
        if(this.state.selectedColors.includes(e.target.dataset.value)){
            this.setState({
                selectedColors: this.state.selectedColors.filter((color) => {
                    return color != e.target.dataset.value
                })
            })
        }
        else {
            this.setState({
                selectedColors: [...this.state.selectedColors, e.target.dataset.value]
            })
        }
    }
    render(){
        const categoryName = this.props.match.params.categoryName;
        const {products, selectedColors} = this.state;
        const availableColors = ['red','white','blue','black','green','pink','yellow','purple']
        const originalProducts = this.originalProducts;
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
                        availableColors.map(color=>(
                            <div data-value={color} onClick={this.selectColor} key={color} className={'colorTileFilter' +(selectedColors.includes(color) ?' clicked':'')} style={{backgroundColor:`${color}`}}></div>
                        ))
                    }
                  </div>
                </div>
              </div>
            </section></div>
            <section className='products'>
              <div className='wrapper'>
              <div className='productRow'>
                {
                    products.map(product => (
                        <div className='product'>
                            <a href={`/product/${product.id}`}><img src={product.pictureUrl} /></a>
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
                                    product.colors.map(color => (
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