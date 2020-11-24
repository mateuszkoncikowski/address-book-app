import * as React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../reducers';

const store = createStore(rootReducer);

const user = {
  phone: '777888333',
  cell: '4871812',
  picture: { thumbnail: 'thumnailUrl' },
  name: { first: 'John', last: 'Doe' },
  email: 'abc@gmail.com',
  login: { username: 'BigJohn98' },
  location: {
    street: {
      name: 'Main St',
      number: 111,
    },
    city: 'London',
    state: 'London state',
    postcode: 50100,
  },
};

const render = (ui, { ...options } = {}) => {
  // eslint-disable-next-line react/prop-types
  const Wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );
  return rtlRender(ui, { wrapper: Wrapper, ...options });
};

export * from '@testing-library/react';
// override React Testing Library's render with our own
export { render, user };
