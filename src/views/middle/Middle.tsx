import "./middle.less";
import { useAppContext } from "../../context/context";
import { For, onMount } from "solid-js";

const Middle = () => {
    let container;
    onMount(() => {
        for(let i = 0;i < 2;i++){
            const baseClassName = "lc-middle-line";
            const div = document.createElement("div");
            div.className = baseClassName + " " + (i === 0 ? baseClassName + "-hoz" : baseClassName + "-ver");
            container.appendChild(div);
        }
    })
    const [state] = useAppContext();
    const onDragHandler = (key,x,y,el) => {
        el.style.left = x + 'px';
        el.style.top = y + 'px';
        const [hoz,ver] = Array.from(container.children).filter(item => item.className.indexOf("line") > -1);
        if(key !== "up"){
            hoz.classList.add("active");
            ver.classList.add("active");
            hoz.style.top = y + 'px';
            ver.style.left = x + 'px';
        }else{
            hoz.classList.remove("active");
            ver.classList.remove("active");
            hoz.style.top = 0;
            ver.style.left = 0;
        }
    }
    return (
        <section className="lc-middle-page" ref={container}>
            <For each={ state().componentData }>{
                (item) => (
                    <item.type 
                        style={{ left:item.left + 'px',top:item.top + 'px' }} 
                        onDragHandler={onDragHandler}
                        dragType="random"
                    >{ item.children }</item.type>
                )
            }</For>
        </section>
    )
}
export default Middle;