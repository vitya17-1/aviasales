/* eslint-disable no-bitwise */
import React from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';

import * as actions from '../../redux/actions';
import FILTERS from '../../redux/constants';
import { scrollToTop } from '../../utils/utils';

import styles from './filter.module.scss';

export default function Filter({ setNoFilteredResults }) {
  const dataLoadingErrorMsg = useSelector(state => state.cacheUpdateErrorMsg);
  const isDisabledFilters = dataLoadingErrorMsg !== '';

  const dispatch = useDispatch();
  const activeFilters = useSelector(state => state.filter);
  const { removeFilter, addFilter, resetVisibleTicketsCount } =
    bindActionCreators(actions, dispatch);

  const isChecked = filterName => {
    return (activeFilters & FILTERS[filterName.toUpperCase()].mask) !== 0;
  };

  const handleCheckboxChange = filterName => () => {
    setNoFilteredResults(false);
    resetVisibleTicketsCount();
    if (isChecked(filterName)) {
      removeFilter(filterName);
    } else {
      addFilter(filterName);
    }
    scrollToTop();
  };

  return (
    <div
      className={`${styles.filterBox} ${isDisabledFilters ? styles.disabled : ''}`}
    >
      <h2 className={styles.title}>количество пересадок</h2>
      <ul className={styles.list}>
        {Object.entries(FILTERS).map(([filterName, { text }]) => (
          <li className={styles.item} key={text}>
            <label className={styles.label} htmlFor={`filter-${filterName}`}>
              <input
                type="checkbox"
                className={styles.checkbox}
                id={`filter-${filterName}`}
                checked={isChecked(filterName)}
                onChange={handleCheckboxChange(filterName)}
              />
              {text}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

Filter.propTypes = {
  setNoFilteredResults: PropTypes.func.isRequired,
};
