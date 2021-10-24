/* @refresh reload */
import Header from "./views/Header/Header";
import Left from "./views/Left/Left";
import Middle from "./views/middle/Middle";
import Right from "./views/Right/Right";
import "./style/app.less";

function App() {
  return (
    <main class="lc-main">
      <Header></Header>
      <div className="lc-layout">
          <Left></Left>
          <Middle></Middle>
          <Right></Right>
      </div>
    </main>
  );
}
export default App;