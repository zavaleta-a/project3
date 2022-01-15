import React, { useEffect } from 'react';
import PartsItem from "../PartsItem";
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
      data.parts.forEach((part) => {
        idbPromise('parts', 'put', part);
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
      (part) => part.category._id === currentCategory
    );
  }

  return (
    <div className="my-2">
      <h2>Our Parts:</h2>
      {state.parts.length ? (
        <div className="flex-row">
          {filterParts().map((part) => (
            <PartsItem
              key={part._id}
              _id={part._id}
              image={part.image}
              name={part.name}
              price={part.price}
              quantity={part.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any parts yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default PartsList;
