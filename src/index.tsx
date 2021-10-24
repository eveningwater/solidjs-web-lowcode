/* @refresh reload */

import { render } from 'solid-js/web';
import App from "./App";
import "./style/reset.less";

render(() => <App />, document.getElementById('app'));

if(module.hot){
  module.hot.accept("./App",() => {
    render(() => <App />, document.getElementById('app'));
  });
}