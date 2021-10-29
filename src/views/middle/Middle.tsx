import "./middle.less";
// import { useAppContext } from "../../context/context";
import { For, onMount } from "solid-js";
import { RefLine } from "../../utils/line";
import { onDrag } from "../../directives/Drag";
import useRedux from "../../store/useRedux";
import reduxStore from "../../store/store";
import actions from "../../store/actions";
const Middle = () => {
    let container,rl;
    onMount(() => {
        rl = new RefLine({ container });
    })
    // const [state] = useAppContext();
    const [store] = useRedux(reduxStore,actions);
    let offsetX = 0,offsetY = 0,x,y,width,height;
    const onDragHandler = (key,e,el) => {
        if(!el){
            return;
        }
        
        if(key === "down"){
            const containerRect = container.getBoundingClientRect();
            x = containerRect.x;
            y = containerRect.y;
            width = containerRect.width;
            height = containerRect.height;
            offsetX = el.offsetWidth;
            offsetY = el.offsetHeight;
        }
        if(key === "move"){
          const cx = e.clientX;
          const cy = e.clientY;
          const moveX = Math.max(0,Math.min(width - offsetX,cx - x)),
          moveY = Math.max(0,Math.min(height - offsetY,cy - y));
          el.style.left = Math.floor(moveX) + 'px';
          el.style.top = Math.floor(moveY) + 'px';
          const otherNodes = Array.from(document.querySelectorAll(".lc-component-container"));
          if(otherNodes.length <= 1){
              return;
          }
          requestAnimationFrame(() => rl.checkNearNode(el,otherNodes,container));
        }else if(key === "up"){
            rl.uncheckNearNode();
        }
    }
    const onDragDirective = onDrag;
    return (
        <section className="lc-middle-page" ref={container}>
            <For each={ store.componentData }>{
                (item:any) => (
                    <div 
                        class="lc-component-container" 
                        style={{ left:item.left + 'px',top:item.top + 'px' }}
                        use:onDragDirective={onDragHandler}
                    >
                        <item.type>{ item.children }</item.type>
                    </div>
                )
            }</For>
        </section>
    )
}
export default Middle;