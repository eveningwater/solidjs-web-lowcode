import { onCleanup } from "solid-js"

export const onDrag = (el,accessor) => {
    const setCursor = (e,style) => {
        const { target } = e;
        target.style.cursor = style;
    } 
    const moveHandler = (e) => {
        accessor()("move",e);
    }
    const upHandler = (e) => {
        setCursor(e,"");
        accessor()("up",e);
        unmountListeners();
    }
    const downHandler = (e) => {
        setCursor(e,"move");
        accessor()("down",e);
        document.addEventListener("mousemove",moveHandler);
        document.addEventListener("mouseup",upHandler);
    }
    const unmountListeners = () => {
        el.removeEventListener("mousedown",downHandler);
        document.removeEventListener("mousemove",moveHandler);
        document.removeEventListener("mouseup",upHandler);
    }
    el.addEventListener("mousedown",downHandler);
    onCleanup(() => unmountListeners())
}