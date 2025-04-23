import React from 'react';
import PropTypes from 'prop-types';

import styles from './sort-tab.module.scss';

export default function SortTab({
  displayText,
  id,
  checked,
  onChange,
  noFilteredResults,
}) {
  return (
    <>
      <input
        onChange={onChange}
        checked={checked}
        type="radio"
        name="sort"
        id={id}
        className={styles['sort-button']}
        disabled={noFilteredResults}
      />
      <label
        htmlFor={id}
        className={styles['sort-label']}
        disabled={noFilteredResults}
      >
        {displayText}
      </label>
    </>
  );
}

SortTab.propTypes = {
  displayText: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  noFilteredResults: PropTypes.bool.isRequired,
};
