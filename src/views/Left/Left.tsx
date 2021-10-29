import "./left.less";
import Button from "../../configComponents/button";
// import { useAppContext } from "../../context/context";
import useRedux from "../../store/useRedux";
import reduxStore from "../../store/store";
import actions from "../../store/actions";
const Left = (props) => {
    // const [state,{ changeState }] = useAppContext();
    const [store,{ addState }] = useRedux(reduxStore,actions);
    const onDragEndHandler = (data) => {
        // const { componentData } = state();
        const componentData = [];
        componentData.push(data);
        addState(componentData);
        // changeState({ componentData:componentData });
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