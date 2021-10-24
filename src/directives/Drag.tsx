import { DragDrop } from "../utils/drag";
export const onDrag = (el,accessor) => {
    const setCursor = (style) => {
        el.style.cursor = style;
    }
    const instance = DragDrop(el,(key,dragEl,event) => {
        switch(key){
            case "down":{
                setCursor("move");
                break;
            }
            case "up":{
                setCursor("");
                break;
            }
        }
        accessor()(key,event,el);
    });
    instance.enable();
}