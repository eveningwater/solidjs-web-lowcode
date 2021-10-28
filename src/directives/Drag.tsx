import { DragDrop } from "../utils/drag";
const $ = selector => document.querySelector(selector);
export const onDrag = (el,accessor) => {
    let node = null;
    const type = "dragType".toLowerCase();
    let isAdd = false;
    const setCursor = (style) => {
        el.style.cursor = style;
    }
    const instance = DragDrop(el,(key,dragEl,event) => {
        switch(key){
            case "down":{
                setCursor("move");
                isAdd = el.getAttribute(type) === 'add';
                if(isAdd){
                    node = document.createElement("button");
                    node.className = "lc-btn";
                    node.id = "drag-effect-btn";
                    node.style.position = "fixed";
                    node.textContent = el.textContent;
                    if(!$("#drag-effect-btn")){
                        document.body.appendChild(node);
                    }
                }
                break;
            }
            case "move":
                if(node && isAdd){
                    node.style.left = event.clientX + 'px';
                    node.style.top = event.clientY + 'px';
                }
                break;
            case "up":{
                setCursor("");
                if(isAdd){
                    const shouldRemove = $("#drag-effect-btn");
                    if(shouldRemove) {
                        shouldRemove.remove();
                    }
                }
                break;
            }
        }
        accessor()(key,event,el);
    });
    instance.enable();
}