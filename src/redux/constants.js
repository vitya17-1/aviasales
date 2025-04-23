/* eslint-disable no-bitwise */
const FILTERS = {
  ALL: {
    mask: 1 << 0, // 00001
    text: 'Все',
  },
  WITHOUT_TRANSFERS: {
    mask: 1 << 1, // 00010
    text: 'Без пересадок',
  },
  ONE_TRANSFER: {
    mask: 1 << 2, // 00100
    text: '1 пересадка',
  },
  TWO_TRANSFERS: {
    mask: 1 << 3, // 01000
    text: '2 пересадки',
  },
  THREE_TRANSFERS: {
    mask: 1 << 4, // 10000
    text: '3 пересадки',
  },
};

export default FILTERS;
