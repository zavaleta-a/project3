import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import Cart from '../components/Cart';
// import { useStoreContext } from '../utils/GlobalState';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PARTS,
} from '../utils/actions';
import { useDispatch, useSelector } from 'react-redux';
import { QUERY_PARTS} from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import spinner from '../assets/spinner.gif';

function Parts() {
  // const [state, dispatch] = useStoreContext();
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const { id } = useParams();

  const [currentPart, setCurrentPart] = useState({});

  const { loading, data } = useQuery(QUERY_PARTS);

  const { parts, cart } = state;

  useEffect(() => {
    // already in global store
    if (parts.length) {
      setCurrentPart(parts.find((parts) => parts._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_PARTS,
        parts: data.parts,
      });

      data.parts.forEach((parts) => {
        idbPromise('parts', 'put', parts);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('parts', 'get').then((indexedParts) => {
        dispatch({
          type: UPDATE_PARTS,
          parts: indexedParts,
        });
      });
    }
  }, [parts, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        parts: { ...currentPart, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...currentPart, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentPart._id,
    });

    idbPromise('cart', 'delete', { ...currentPart });
  };

  return (
    <>
      {currentPart && cart ? (
        <div className="container my-1">
          <Link to="/">← Back to Parts</Link>

          <h2>{currentPart.name}</h2>

          <p>{currentPart.description}</p>

          <p>
            <strong>Price:</strong>${currentPart.price}{' '}
            <button onClick={addToCart}>Add to Cart</button>
            <button
              disabled={!cart.find((p) => p._id === currentPart._id)}
              onClick={removeFromCart}
            >
              Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentPart.image}`}
            alt={currentPart.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}

export default Parts;
