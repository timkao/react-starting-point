import React from 'react';
import { connect } from 'react-redux';
import { removeFromList } from '../store';
import { Link } from 'react-router-dom';


function SavedItem(props) {

  const { item, dropFromList } = props

  return (
    <li className="list-group-item">
      <div className="row">
        <Link to={`/product/${item.id}`}><div className="col-lg-3"><img src={item.pictureUrl} /></div></Link>
        <div className="col-lg-5">
          {item.name}<br></br>
          <br></br>
          <br></br>
          <span>In Stock</span><br></br>
          <div className="row">
            <div className="col-lg-4 cart-action" onClick={dropFromList}><a>Remove from List</a></div>
          </div>
        </div>
        <div className="col-lg-2">$ {item.price}</div>
        <div className="col-lg-2">
        </div>
      </div>
    </li>

  )
}

const mapToState = (state) => {
  return {

  };
}

const mapToDispatch = (dispatch, ownProps) => {

  const productId = ownProps.item.id;

  return {
    dropFromList() {
      const thunk = removeFromList(productId);
      dispatch(thunk);
    }
  }
}

const SavedItemContainer = connect(mapToState, mapToDispatch)(SavedItem);

export default SavedItemContainer;
