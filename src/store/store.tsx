import { createStore } from "redux";
import { ADD_STATE } from "./action";
const initStore = (state = { componentData:{} },action) => {
    switch(action.type){
        case ADD_STATE:{
            return {
                componentData:{
                    ...state.componentData,
                    ...{
                        type:action.Button,
                        key:action.key,
                        children:action.children
                    }
                }
            }
        }
        default:{
            return state;
        }           
    }
}
export default createStore(initStore);