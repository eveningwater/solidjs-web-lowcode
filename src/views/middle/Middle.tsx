import "./middle.less";
import { useAppContext } from "../../context/context";
import { For, onMount } from "solid-js";
import { RefLine } from "../../utils/line";
import { onDrag } from "../../directives/Drag";
const Middle = () => {
    let container,rl;
    onMount(() => {
        rl = new RefLine();
    })
    const [state] = useAppContext();
    const onDragHandler = (key,e,el) => {
        if(!el){
            return;
        }
        const { x,y } = container.getBoundingClientRect();
        if(key === "move"){
          const cx = e.clientX
          const cy = e.clientY
          el.style.left = (cx - x) + 'px';
          el.style.top = (cy - y) + 'px';
          requestAnimationFrame(() => rl.checkNearNode(el,Array.from(document.querySelectorAll(".lc-component-container")),container));
        }else if(key === "up"){
            rl.uncheckNearNode();
        }
    }
    const onDragDirective = onDrag;
    return (
        <section className="lc-middle-page" ref={container}>
            <For each={ state().componentData }>{
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