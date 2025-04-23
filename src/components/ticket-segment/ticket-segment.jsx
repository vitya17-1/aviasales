import React from 'react';
import PropTypes from 'prop-types';
import { format, addMinutes } from 'date-fns';

import { declensionOfNumerals } from '../../utils/utils';

import styles from './ticket-segment.module.scss';

export default function TicketSegment({
  id,
  origin,
  destination,
  date,
  duration,
  stops = [],
}) {
  const preparedData = {
    route: `${origin} - ${destination}`,
    stopsCount: stops.length,
    stopsCountText: `${stops.length || 'Без'} ${declensionOfNumerals(
      stops.length,
      ['пересадка', 'пересадки', 'пересадок']
    )}`,
    stopsCities: stops.join(', ') || '',
    durationText: `${Math.floor(duration / 60)}ч ${duration % 60}м`,
    departureTime: new Date(date),
    arrivalTime: addMinutes(new Date(date), duration),
  };

  return (
    <li key={id} className={styles.segment}>
      <span className={styles.segment__route}>{preparedData.route}</span>
      <span className={styles['segment__duration-title']}>В ПУТИ</span>
      <span className={styles['segment__stops-count']}>
        {preparedData.stopsCountText}
      </span>
      <span className={styles.segment__time}>
        {format(preparedData.departureTime, 'HH:mm')} -{' '}
        {format(preparedData.arrivalTime, 'HH:mm')}
      </span>
      <span className={styles.segment__duration}>
        {preparedData.durationText}
      </span>
      <span className={styles['segment__stops-cities']}>
        {preparedData.stopsCities}
      </span>
    </li>
  );
}
TicketSegment.propTypes = {
  id: PropTypes.string,
  origin: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  stops: PropTypes.arrayOf(PropTypes.string),
};
