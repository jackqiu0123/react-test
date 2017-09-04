/**
 * Created by Ricardo on 2017/9/3.
 */
import React,{Component} from 'react';
import "./CheckBoxList.css"
import CheckBoxList from "./CheckBoxList"
class App1 extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return <CheckBoxList {...this.props.list}/>
    }


    list(){
        // let arr =[];
        // for(let listItem of this.props.list){
        //     arr.push(<CheckBoxList {...listItem}/>)
        // }
        // return arr;
    }

}

export default App1;