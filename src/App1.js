/**
 * Created by Ricardo on 2017/9/3.
 */
import React,{Component} from 'react';
import "./CheckBoxList.css"
import CheckBoxList from "./CheckBoxList"
class App1 extends Component {
    constructor(props) {
        super(props);
        this.state = {"1":"list1","2":"list2"};
        this.clearAll = this.clearAll.bind(this);
    }

    render() {
        return (
            <div>
                <p className="title">招聘职位</p>
                <button className="clear-button " onClick={this.clearAll}>清空</button>
                <div className="clear"></div>
                {this.list()}
            </div>)
    }

    componentDidMount(){
        this.setState({"1":"1","2":"2"});
    }


    clearAll(){
        // let obj = this.state;
        // obj.clear +=1;
        // this.setState(obj);
        for(let value of Object.values(this.state)){
            this.refs[value].clear();
        }

    }


    list(){
        let arr =[];
        for(let value of Object.values(this.state)){
            arr.push(<CheckBoxList type={value} ref={value}/>)
        }
        return arr;
    }

}

export default App1;