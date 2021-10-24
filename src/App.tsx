import { createSignal } from "solid-js";
/* @refresh reload */
function HelloWorld() {
  const [message] = createSignal("world")
  return <div>Hello { message() }!</div>;
}
export default HelloWorld;