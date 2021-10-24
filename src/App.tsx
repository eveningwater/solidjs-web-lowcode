/* @refresh reload */
import { createSignal } from "solid-js";

function HelloWorld() {
  const [message] = createSignal("world")
  return <div>Hello { message() }!</div>;
}
export default HelloWorld;