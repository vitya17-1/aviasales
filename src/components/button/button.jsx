import React from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';

import * as actions from '../../redux/actions';

import styles from './button.module.scss';

export default function Button() {
  const dispatch = useDispatch();
  const { showMore } = bindActionCreators(actions, dispatch);
  return (
    <button
      type="button"
      className={styles['show-more-button']}
      onClick={showMore}
    >
      показать еще 5 билетов
    </button>
  );
}
