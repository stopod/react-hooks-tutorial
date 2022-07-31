import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const myInfo = {
  name: 'sampleName',
  age: 27,
};
// useContextを使う際はだいたい大文字始まりらしい
const MyInfoContext = createContext(myInfo);

ReactDOM.createRoot(document.getElementById('root')).render(
  <MyInfoContext.Provider value={myInfo}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </MyInfoContext.Provider>
);

export default MyInfoContext;
