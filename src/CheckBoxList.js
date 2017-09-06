/**
 * Created by Ricardo on 2017/9/3.
 */
import React,{Component} from 'react';
import "./CheckBoxList.css"
import CheckBoxItem from "./CheckBoxItem"

class CheckBoxList extends Component {

    constructor(props) {
        super(props);
        // this.initState(this.props.list)
        this.state ={}

        this.clear = this.clear.bind(this);
        this.onChildChanged = this.onChildChanged.bind(this);

    }

    clear(){
        let oldStateData = this.state;
        for(let [key, value] of Object.entries(oldStateData)){
            oldStateData[key].checked = false;
            if(value.hasOwnProperty("children")){
                oldStateData[key].number = 0;
            }
        }
        this.setState(Object.assign(this.state,oldStateData));
    }

    render() {
        return (<div>
                <div>{this.list(this.state)}</div>
                </div>
                );
    }

    componentDidMount(){

        if(this.props.type == "list1"){
            let obj =  {
                "1": {"checked":false,"name":"aaa","number":0,"parent":"-1","children":["1_1","1_2","1_3"]},
                "1_1": {"checked":false,"name":"aaa","number":1,"parent":"1","children":["1_1_1","1_1_2","1_1_3"]},
                "1_1_1": {"checked":false,"name":"aaa","number":1,"parent":"1_1"},
                "1_1_2": {"checked":false,"name":"aaa","number":1,"parent":"1_1"},
                "1_1_3": {"checked":false,"name":"aaa","number":1,"parent":"1_1"},
                "1_2": {"checked":false,"name":"aaa","number":2,"parent":"1","children":["1_2_1","1_2_2"]},
                "1_2_1": {"checked":false,"name":"aaa","number":2,"parent":"1_2"},
                "1_2_2": {"checked":false,"name":"aaa","number":2,"parent":"1_2"},
                "1_3": {"checked":false,"name":"aaa","number":2,"parent":"1"},
            }
            this.setState(obj);
        }else{
            let obj =  {
                "2": {"checked":false,"name":"bbb","number":0,"parent":"-1","children":["2_1","2_2","2_3"]},
                "2_1": {"checked":false,"name":"bbb","number":1,"parent":"2","children":["2_1_1","2_1_2","2_1_3"]},
                "2_1_1": {"checked":false,"name":"bbb","number":1,"parent":"2_1"},
                "2_1_2": {"checked":false,"name":"bbb","number":1,"parent":"2_1"},
                "2_1_3": {"checked":false,"name":"bbb","number":1,"parent":"2_1"},
                "2_2": {"checked":false,"name":"bbb","number":2,"parent":"2","children":["2_2_1","2_2_2"]},
                "2_2_1": {"checked":false,"name":"bbb","number":2,"parent":"2_2"},
                "2_2_2": {"checked":false,"name":"bbb","number":2,"parent":"2_2"},
                "2_3": {"checked":false,"name":"bbb","number":2,"parent":"2"},
            }
            this.setState(obj);
        }

    }

    list(list){
        let arr= [];
        for(let [key,value] of Object.entries(list)){
            arr.push((<CheckBoxItem {...value} id={key} onChildChanged={this.onChildChanged}/>));
        }
        return arr;
    }



    changeChildCheck(oldStateData,obj){
        let current = obj;
        if(current.hasOwnProperty("children")){
            for(let child of current.children){
                oldStateData[child].checked = obj.checked;
                if(oldStateData[child].hasOwnProperty("children")){
                    oldStateData =this.changeChildCheck(oldStateData,oldStateData[child]);
                }
            }
        }
        return oldStateData;
    }


    changeParentCheck(oldStateData,obj){
        if(obj.parent === "-1"){

        }else{
            let changeParent = true;
            for(let oldState of Object.values(oldStateData)){
                if(obj.parent === oldState.parent){
                    if(oldState.checked == obj.checked){
                        continue;
                    }else{
                        changeParent = false;
                        break;
                    }
                }
            }
            if(changeParent){
                oldStateData[obj.parent].checked = obj.checked;
                oldStateData = this.changeParentCheck(oldStateData,oldStateData[obj.parent]);
            }


        }
        return oldStateData;
    }


    onChildChanged(obj){
        console.log(obj);
        let oldStateData = this.state;

        oldStateData[obj.id].checked = obj.checked;


        oldStateData = this.changeChildCheck(oldStateData,oldStateData[obj.id]);
        oldStateData = this.changeParentCheck(oldStateData,oldStateData[obj.id]);

        oldStateData = this.refreshNumber(oldStateData,this.getFirstCheckBox(oldStateData));
        this.setState(Object.assign(this.state,oldStateData));
    }

    getFirstCheckBox(oldStateData){
        for(let [key,value] of Object.entries(oldStateData)){
            if(value.parent === "-1"){
                return key;
            }
        }
    }

    refreshNumber(oldStateData,key){
        let obj = oldStateData[key];
        if(obj.hasOwnProperty("children")){
            let number = 0;
            for(let child of obj.children){
                if(oldStateData[child].hasOwnProperty("children")){
                    oldStateData = this.refreshNumber(oldStateData,child);
                    number += oldStateData[child].number;
                }else{
                    if(oldStateData[child].checked){
                        number += oldStateData[child].number;
                    }
                }
            }
            oldStateData[key].number = number;
        }
        return oldStateData;
    }
}

export default CheckBoxList;