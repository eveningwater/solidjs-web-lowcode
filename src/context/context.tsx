import { createSignal, createContext, useContext } from "solid-js";

const AppContext = createContext();
export function AppProvider(props) {
  const [state, setState] = createSignal(props.state || {}),
  store = [
    state,
    {
      changeState(newState){
         setState(newState);
      }
    }
  ];
  return (
    <AppContext.Provider value={ store }>
      { props.children }
    </AppContext.Provider>
  );
}

export function useAppContext() { 
  return useContext(AppContext); 
}