import { AppRegistry } from 'react-native';
import Main from './src/Main.js';
import React from 'react';

import Shopify from 'react-native-shopify';
Shopify.initialize('myntra-clone.myshopify.com', '98b5c4001fd4c42b4f7afa01b596bbb5');

export default class App extends React.Component {
  

  render() {
    return (
      <Main/>
    );
  }
}