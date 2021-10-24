import { EventUtil } from "./event";
export const DragDrop = (el = document,callback) => {
    let dragging = null;
    const mountListener = () => {
        EventUtil.addHandler(document,"mousemove",handleEvent);
        EventUtil.addHandler(document,"mouseup",handleEvent);
    }
    const unmountListener = () => {
        EventUtil.removeHandler(document,"mousemove",handleEvent);
        EventUtil.removeHandler(document,"mouseup",handleEvent);
    }
    const handleEvent = (event) => {
        event = EventUtil.getEvent(event);
        const target = EventUtil.getTarget(event);
        switch(event.type){
            case "mousedown":{
                dragging = target;
                mountListener();
                callback("down",dragging,event);
                break;
            }
            case "mousemove":{
                if(dragging !== null){
                    callback("move",dragging,event);
                }
                break;
            }
            case "mouseup":{
                dragging = null;
                unmountListener();
                callback("up",dragging,event);
                break;
            }
        }
    }
    return {
        enable(){
            EventUtil.addHandler(el,"mousedown",handleEvent);
            mountListener();
        },
        disable(){
            // EventUtil.removeHandler(el,"mousedown",handleEvent);
            unmountListener();
        }
    }
}