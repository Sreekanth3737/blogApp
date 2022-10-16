import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from "@chakra-ui/react";

import {Provider} from 'react-redux'
import store from './redux/store/store';
import {ChatProvider} from './context/ChatProvider'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ChatProvider>
      <ChakraProvider>

       <App />
      </ChakraProvider>
     </ChatProvider>
  </Provider>
);

