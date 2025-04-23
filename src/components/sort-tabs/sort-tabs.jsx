import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import SortTab from '../sort-tab/sort-tab';
import * as actions from '../../redux/actions';

import styles from './sort-tabs.module.scss';

export default function SortTabs({ noFilteredResults }) {
  const dataLoadingErrorMsg = useSelector(state => state.cacheUpdateErrorMsg);
  const isDisabledSorting = dataLoadingErrorMsg !== '' || noFilteredResults;

  const dispatch = useDispatch();
  const currentState = useSelector(state => state.sorting);
  const { cheap, fast, opt, resetVisibleTicketsCount } = bindActionCreators(
    actions,
    dispatch
  );

  // Мемоизируем changeSorting, чтобы handleChange не пересоздавался каждый раз
  // eslint-disable-next-line no-undef
  const changeSorting = useMemo(
    () => ({ cheap, fast, opt }),
    [cheap, fast, opt]
  );

  const handleChange = useCallback(
    value => () => {
      resetVisibleTicketsCount();
      changeSorting[value]();
    },
    [resetVisibleTicketsCount, changeSorting]
  );

  const renderTabs = useCallback(() => {
    const tabsRenderData = [
      { displayText: 'Самый дешевый', value: 'cheap' },
      { displayText: 'Самый быстрый', value: 'fast' },
      { displayText: 'Оптимальный', value: 'opt' },
    ];

    return tabsRenderData.map(tab => (
      <SortTab
        key={tab.value}
        displayText={tab.displayText}
        id={tab.value}
        checked={currentState === tab.value}
        onChange={handleChange(tab.value)}
        noFilteredResults={isDisabledSorting}
      />
    ));
  }, [currentState, handleChange, isDisabledSorting]);

  return <div className={styles['sort-tabs']}>{renderTabs()}</div>;
}

SortTabs.propTypes = {
  noFilteredResults: PropTypes.bool.isRequired,
};
