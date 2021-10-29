import { createStore } from "redux";
import { ADD_STATE } from "./actions";
const initStore = (state = { componentData:[] },action) => {
    switch(action.type){
        case ADD_STATE:{
            return {
                componentData:[
                    ...state.componentData,
                    ...action.state
                ]
            }
        }
        default:{
            return state;
        }           
    }
}
export default createStore(initStore);