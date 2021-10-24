import { createSignal } from "solid-js";
import { onDrag } from "../directives/Drag";
import "../style/components/button.less";
const Button = (props) => {
    const [baseClassName] = createSignal("lc-btn");
    const [btnData,setBtnData] = createSignal({
        type:Button,
        key:"button",
        children:props.children
    });
    const onDragHandler = (key) => {
        console.log(key);
    }
    return (
        <button 
            className={`${baseClassName()}${ props.disabled ? " " + baseClassName() + "-disabled" : ""}`} 
            {...props} 
            type="button"
            use:onDrag={onDragHandler}
        ></button>
    )
}
export default Button;