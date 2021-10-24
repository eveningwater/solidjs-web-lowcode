import "./left.less";
import Button from "../../components/button";
import { useAppContext } from "../../context/context";
const Left = (props) => {
    const [state,{ changeState }] = useAppContext();
    const onDragEndHandler = (data) => {
        const { componentData } = state();
        componentData.push(data);
        changeState({ componentData:componentData });
    }
    return (
        <aside className="lc-left">
            <div className="lc-left-row">
                <Button onDragHandler={onDragEndHandler} dragType="add">按钮</Button>
            </div>
        </aside>
    )
}
export default Left;