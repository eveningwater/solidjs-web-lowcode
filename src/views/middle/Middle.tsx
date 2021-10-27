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
    const [state] = useAppContext() as any;
    const onDragHandler = (key,x,y,el) => {
        if(!el){
            return;
        }
        el.style.left = x + 'px';
        el.style.top = y + 'px';
        const [hoz,ver] = Array.from(container.children).filter(item => (item as HTMLDivElement).className.indexOf("line") > -1);
        if(key !== "up"){
            (hoz as HTMLDivElement).classList.add("active");
            (ver as HTMLDivElement).classList.add("active");
            (hoz as HTMLDivElement).style.top = y - 1 + 'px';
            (ver as HTMLDivElement).style.left = x - 1 + 'px';
        }else{
            (hoz as HTMLDivElement).classList.remove("active");
            (ver as HTMLDivElement).classList.remove("active");
            (hoz as HTMLDivElement).style.top = "0";
            (ver as HTMLDivElement).style.left = "0";
        }
    }
    const NewFor = For as any;
    return (
        <section className="lc-middle-page" ref={container}>
            <NewFor each={ state().componentData }>{
                (item) => (
                    <item.type 
                        style={{ left:item.left + 'px',top:item.top + 'px' }} 
                        onDragHandler={onDragHandler}
                        dragType="random"
                    >{ item.children }</item.type>
                )
            }</NewFor>
        </section>
    )
}
export default Middle;