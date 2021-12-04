/// <reference types="react" />
import './Filter.css';
interface ContainerProps {
    filterData: object;
    callback: Function;
    closeFunction: Function;
}
declare const Filter: React.FC<ContainerProps>;
export default Filter;
