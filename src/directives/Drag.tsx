import { DragDrop } from "../utils/drag";
const $ = selector => document.querySelector(selector);
const classByTagName = (name) => {
    if(name === "button"){
        return "btn";
    }
}
export const onDrag = (el,accessor) => {
    let node = null;
    const type = "dragType".toLowerCase();
    let isAdd = false;
    const setCursor = (style) => {
        el.style.cursor = style;
    }
    const followElementName = el.tagName.toLowerCase();
    const instance = DragDrop(el,(key,dragEl,event) => {
        switch(key){
            case "down":{
                setCursor("move");
                isAdd = el.getAttribute(type) === 'add';
                if(isAdd){
                    node = document.createElement(followElementName);
                    node.className = "lc-" + classByTagName(followElementName);
                    node.id = "drag-effect-" + followElementName;
                    node.style.position = "fixed";
                    node.textContent = el.textContent;
                    if(!$("#drag-effect-" + followElementName)){
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
                    const shouldRemove = $("#drag-effect-" + followElementName);
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