import { Dynamic } from "solid-js/web";

const Title = (props) => {
    const { level,...rest } = props;
    const names = [1,2,3,4,5];
    const item = "h" + (names.indexOf(Number(level)) > -1 ? level : 1);
    return (
        <>
            <Dynamic { ...rest } component={item}></Dynamic>
        </>
    )
}
export default Title;