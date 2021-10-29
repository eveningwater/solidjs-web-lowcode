export const ADD_STATE = "ADD_STATE";
export interface ActionsType {
    addState:<T>(T) => ({type:string,state:T })
}
const actions:ActionsType = {
    addState:(state) => ({type:ADD_STATE,state })
}
export default actions;