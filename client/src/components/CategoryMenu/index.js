import React, { useEffect } from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';

import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIES } from '../../utils/queries';

function CategoryMenu() {
  const [state, dispatch] = useStoreContext();
  const { categories } = state;

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories
      });

      // save categories to indexedDB
      categoryData.categories.forEach(category => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      // since were offline get all categories from the `categories` store
      idbPromise('categories', 'get').then(categories => {
        // use retrieved data to set global state for offline browsing
        dispatch({
          type: UPDATE_CATEGORIES,
          categories
        });
      });
    }
  }, [categoryData, loading, dispatch])

  const handleClick = id => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id
    });
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id)
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
