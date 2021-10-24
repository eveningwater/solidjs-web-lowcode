import { onCleanup } from "solid-js";
import { createStore, reconcile } from "solid-js/store";
export const useReducer = (reducer, state) => {
    const [store, setStore] = createStore(state);
    const dispatch = (action) => {
      state = reducer(state, action);
      setStore(reconcile(state));
    }
    return [store, dispatch];
};
export default function useRedux(store, actions) {
  const [state, setState] = createStore(store.getState());
  const unsubscribe = store.subscribe(
    () => setState(store.getState())
  );
  onCleanup(() => unsubscribe());
  return [
    state,
    mapActions(store, actions)
  ];
};

function mapActions(store, actions) {
  const mapped = {};
  for (const key in actions) {
    mapped[key] = (...args) => store.dispatch(actions[key](...args));
  }
  return mapped;
}
