/* @refresh reload */

import { render } from 'solid-js/web';
import HelloWorld from "./App";
import "./style/reset.less";

render(() => <HelloWorld />, document.getElementById('app'));

if(module.hot){
  module.hot.accept("./App",() => {
    render(() => <HelloWorld />, document.getElementById('app'));
  });
}