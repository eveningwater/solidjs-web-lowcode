/* @refresh reload */

import { render } from 'solid-js/web';
import App from "./App";
import "./style/reset.less";
const app = document.getElementById('app');
render(() => <App />, app);

if(module.hot){
  module.hot.accept("./App",() => {
    render(() => <App />, app);
  });
}