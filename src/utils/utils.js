/* eslint-disable no-bitwise */
export default function getMessageByErrorCode(errorCode) {
  switch (errorCode) {
    case 400:
      return 'Bad Request. Please check your input.';
    case 401:
      return 'Unauthorized. Please log in.';
    case 403:
      return 'Forbidden. You do not have permission.';
    case 404:
      return 'Not Found. The requested resource could not be found.';
    case 500:
      return 'Internal Server Error. Please try again later.';
    default:
      return 'An unknown error occurred.';
  }
}

function declensionOfNumerals(number, titles) {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
  ];
}

const throttle = (func, delay) => {
  let lastCall = 0;
  // eslint-disable-next-line func-names
  return async function (...args) {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    // eslint-disable-next-line consistent-return
    return func(...args);
  };
};

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
const getScrollBarWidth = () => {
  const scrollDiv = document.createElement('div');
  scrollDiv.style.width = '100px';
  scrollDiv.style.height = '100px';
  scrollDiv.style.overflowY = 'scroll';
  document.body.appendChild(scrollDiv);
  const scrollBarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollBarWidth;
};

class CheckboxStateManager {
  constructor(filters) {
    this.filters = filters;
  }

  binaryLength() {
    return Object.keys(this.filters).length;
  }

  // Algorithm Brian Kernighan.
  // Function to count set bits in an integer.
  // Algorithm: n & (n - 1) removes the rightmost set bit and shifts the rest to the right.
  // We count the number of times this operation can be performed until n becomes 0.
  static countSetBits(n) {
    let count = 0;
    while (n) {
      count += n & 1;
      // eslint-disable-next-line no-param-reassign
      n >>= 1;
    }
    return count;
  }

  // Function to get state with all bits set.
  getAllCheckedState() {
    const state = (1 << this.binaryLength()) - 1;
    return state; // 11111
  }

  add2State(state, filterName) {
    let newState = state;
    if (filterName === 'ALL' || this.areAllButTwoFiltersSelected(state)) {
      return this.getAllCheckedState();
    }
    newState |= this.filters[filterName.toUpperCase()].mask;
    return newState;
  }

  removeFromState(state, filterName) {
    let newState = state;
    if (filterName === 'ALL') {
      return 0;
    }
    newState &= ~(
      this.filters[filterName.toUpperCase()].mask | this.filters.ALL.mask
    );
    return newState;
  }

  areAllButTwoFiltersSelected(state) {
    return CheckboxStateManager.countSetBits(state) === this.binaryLength() - 2;
  }
}

export {
  getScrollBarWidth,
  CheckboxStateManager,
  throttle,
  declensionOfNumerals,
  scrollToTop,
};
