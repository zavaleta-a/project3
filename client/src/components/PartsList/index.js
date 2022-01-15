import React, { useEffect } from 'react';
import PartsItem from '../PartsItem';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_PARTS} from '../../utils/actions';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_PARTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';

function PartsList() {
  const dispatch = useDispatch();
  const state = useSelector(state => state);

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_PARTS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PARTS,
        parts: data.parts,
      });
      data.parts.forEach((parts) => {
        idbPromise('parts', 'put', parts);
      });
    } else if (!loading) {
      idbPromise('parts', 'get').then((parts) => {
        dispatch({
          type: UPDATE_PARTS,
          parts: parts,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterParts() {
    if (!currentCategory) {
      return state.parts;
    }

    return state.parts.filter(
      (parts) => parts.category._id === currentCategory
    );
  }

  return (
    <div className="my-2">
      <h2>Our Parts:</h2>
      {state.parts.length ? (
        <div className="flex-row">
          {filterParts().map((parts) => (
            <PartsItem
              key={parts._id}
              _id={parts._id}
              image={parts.image}
              name={parts.name}
              price={parts.price}
              quantity={parts.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default PartsList;
