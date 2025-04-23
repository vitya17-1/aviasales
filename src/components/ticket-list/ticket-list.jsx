/* eslint-disable no-bitwise */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Ticket from '../ticket/ticket';
import useTickets from '../../hooks/useTickets';

import styles from './ticket-list.module.scss';

export default function TicketList({ setNoFilteredResults }) {
  // Фильтрация и сортировка билетов в хуке
  const { tickets } = useTickets();
  useEffect(() => {
    if (tickets.length === 0) {
      setNoFilteredResults(true);
    } else {
      setNoFilteredResults(false);
    }
  }, [tickets, setNoFilteredResults]);

  return (
    <ul className={styles['ticket-list']}>
      {tickets.map(ticket => (
        <Ticket
          key={ticket.id}
          carrier={ticket.carrier}
          price={ticket.price}
          segments={ticket.segments}
        />
      ))}
    </ul>
  );
}

TicketList.propTypes = {
  setNoFilteredResults: PropTypes.func.isRequired,
};
