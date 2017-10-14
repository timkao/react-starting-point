import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCrossPurchase } from '../store';

class CrossItems extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.pullList(this.props.id)
  }

  render() {
    let items = [];
    let format, id;
    if (this.props.id) {
      items = this.props.crossList;
      format = "col-lg-2";
      id = "crossList";
    }
    else {
      items = this.props.repeatList
      format = "col-lg-12";
      id = "historyList";
    }
    return (
      <div id={id} className="row">
        {
          items.map( item => {
            return (
              <div key={item.id} className={format}>
                <img src={item.pictureUrl} />
                {item.name}<br></br>
                $ {item.price}<br></br>
                <div className="cart-action"><a>Add to Cart</a></div>
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
    pullList(productId) {
      if (productId) {
        const thunk = fetchCrossPurchase(productId)
        dispatch(thunk)
      }
    }
  }
}

const crossItemsContainer = connect(mapToState, mapToDispatch)(CrossItems)

export default crossItemsContainer
