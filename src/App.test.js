import React from "react";
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import App from './App';
import {Provider} from "react-redux";
import store from "./redux/redux_store";

test('renders learn react link', () => {
  render( <Provider store={store}><App /></Provider>);
  const linkElement = screen.getByText('React App');
  expect(linkElement).toBeInTheDocument();
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App/>, div);
  ReactDOM.unmountComponentAtNode(div);
})