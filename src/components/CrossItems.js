import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCrossPurchase } from '../store';

class CrossItems extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.pullCrossList(this.props.id)
  }

  render() {

    const items = this.props.crossList
    console.log(items)

    return (
      <div id="crossList" className="row">
        {
          items.map( item => {
            return (
              <div key={item.id} className="col-lg-2">
                <img src={item.pictureUrl} /><br></br>
                {item.name}<br></br>
                $ {item.price}<br></br>
                In Stock
              </div>
            )
          })
        }
      </div>
    )
  }
}

const mapToState = (state) => {
  return {
    crossList: state.crossList
  }
}

const mapToDispatch = (dispatch, ownProps) => {
  return {
    pullCrossList(productId) {
      if (productId) {
        const thunk = fetchCrossPurchase(productId)
        dispatch(thunk)
      }
    }
  }
}

const crossItemsContainer = connect(mapToState, mapToDispatch)(CrossItems)

export default crossItemsContainer
