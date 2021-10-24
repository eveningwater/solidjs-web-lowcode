import { createSignal } from "solid-js";
import { onDrag } from "../directives/Drag";
import "../style/components/button.less";
const Button = (props) => {
    const [baseClassName] = createSignal("lc-btn");
    const onDragHandler = (key,event,dragging) => {
        if(props.disabled){
            return;
        }
        const target = event.target;
        if(target.className.indexOf("middle") > -1){
            const rect = target.getBoundingClientRect();
            const { layerX,layerY,clientX,clientY } = event;
            if(clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom){
                if(target){
                    if(props.dragType === "add" && key === "up"){
                        props.onDragHandler && props.onDragHandler({
                            type:Button,
                            key:"button",
                            children:props.children,
                            left:layerX,
                            top:layerY
                        },event);
                    }else if(props.dragType === "random"){
                        const { width,height } = dragging.getBoundingClientRect();
                        props.onDragHandler && props.onDragHandler(key,Math.max(layerX - width,0),Math.max(layerY - height,0),dragging);
                    }
                }
            }
        }
    }
    return (
        <button 
            className={baseClassName()}
            classList={{ [baseClassName() + "-disabled"]:props.disabled}} 
            {...props} 
            type="button"
            use:onDrag={onDragHandler}
        ></button>
    )
}
export default Button;