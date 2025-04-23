import React, { useCallback, useEffect, useState } from 'react';
import { message } from 'antd';
import { useSelector } from 'react-redux';

import Header from '../header/header';
import Filter from '../filter/filter';
import SortTabs from '../sort-tabs/sort-tabs';
import TicketList from '../ticket-list/ticket-list';
import Button from '../button/button';
import Message from '../message/message';
import ScrollToTopButton from '../scroll-to-top-button/scroll-to-top-button';
import { useGetTicketsQuery } from '../../services/aviasalesApi';
import useScrollbarCompensation from '../../hooks/useScrollbarCompensation';

import styles from './App.module.scss';

function App() {
  useScrollbarCompensation();
  const isDataLoaded = useSelector(state => state.isDataLoaded);
  const cacheUpdateErrorMsg = useSelector(state => state.cacheUpdateErrorMsg);

  const [messageApi, contextHolder] = message.useMessage();
  const openMessage = useCallback(
    (isLoaded, errorMsg = '') => {
      const messageKey = 'loadingMessage';
      if (errorMsg) {
        messageApi.error({
          key: messageKey,
          content: `Попробуйте перезагрузить страницу. Ошибка загрузки данных${errorMsg ? `: ${errorMsg}` : ''}`,
          duration: 0,
        });
        return;
      }
      if (isLoaded) {
        messageApi.success({
          key: messageKey,
          content: 'Данные успешно загружены',
          duration: 5,
        });
        return;
      }
      messageApi.open({
        key: messageKey,
        type: 'loading',
        content: 'Загрузка данных...',
        duration: 0,
      });
    },
    [messageApi]
  );

  useEffect(() => {
    openMessage(isDataLoaded, cacheUpdateErrorMsg);
  }, [isDataLoaded, cacheUpdateErrorMsg, openMessage]);

  const [noFilteredResults, setNoFilteredResults] = useState(false);

  const { data: ticketsData, error: getTicketsError } = useGetTicketsQuery();

  const renderTicketsListOrMessage = () => {
    if (getTicketsError)
      return (
        <Message
          type="error"
          message="Ошибка"
          errorCode={getTicketsError.status}
        />
      );
    if (noFilteredResults || ticketsData?.length === 0) {
      return (
        <Message
          type="info"
          message="Рейсов, подходящих под заданные фильтры, не найдено"
        />
      );
    }
    if (ticketsData?.tickets.length > 0)
      return (
        <>
          <TicketList setNoFilteredResults={setNoFilteredResults} />
          <Button />
        </>
      );

    return null;
  };

  return (
    <div className={styles.app}>
      {contextHolder}
      <Header />
      <div className={`${styles.container} ${styles.layout}`}>
        <Filter setNoFilteredResults={setNoFilteredResults} />
        <SortTabs noFilteredResults={noFilteredResults} />
        {renderTicketsListOrMessage()}
        <ScrollToTopButton />
      </div>
    </div>
  );
}

export default App;
