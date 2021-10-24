export const EventUtil = (() => {
    const util = {
        addHandler(element,type,handler,useCapture = false){
            if(element.addEventListener){
                element.addEventListener(type,handler,useCapture);
            }else if(element.attachEvent){
                element.attachEvent("on" + type,handler);
            }else{
                element["on" + type] = handler;
            }
        },
        getEvent(event){
            return event ? event : window.event;
        },
        getTarget(event){
            return event.target || event.srcElement;
        },
        preventDefault(event){
            if(event.preventDefault){
                event.preventDefault();
            }else{
                event.returnValue = false;
            }
        },
        removeHandler(element,type,handler,useCapture = false){
            if(element.removeEventListener){
                element.removeEventListener(type,handler,useCapture);
            }else if(element.detachEvent){
                element.detachEvent("on" + type,handler);
            }else{
                element["on" + type] = null;
            }
        },
        stopPropagation(event){
            if(event.stopPropagation){
                event.stopPropagation();
            }else{
                event.cancelBubble = true;
            }
        }
    };
    return util;
})();