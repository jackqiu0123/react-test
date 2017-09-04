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
        this.state = this.initState();
        this.onChildChanged = this.onChildChanged.bind(this);
    }

    render() {
        return <div>{this.list(this.props.list)}</div>
    }

    initState(){
        let obj = this.initStateData(this.props.list);
        console.log(obj);
        return obj;
    }


    initStateData(list){
        var obj = {};
        for(let listItem of list){
            obj[listItem.id] = {"checked":false,"parent":listItem.parent,"id":listItem.id};
            if(listItem.hasOwnProperty("list")){
                obj= Object.assign(obj,this.initStateData(listItem.list));
            }
        }
        return obj;
    }

    list(list){
        let arr= [];
        for(let listItem of list){
            listItem.onChildChanged = this.onChildChanged;
            arr.push(<div>{this.isCheckBoxList(listItem)}</div>);
        }
        return arr;
    }

    isCheckBoxList(listItem){
        if(listItem.hasOwnProperty("list")){
            return this.renderList(listItem);
        }else{
            return this.renderItem(listItem);
        }
    }


    renderList(listItem){
        return (<div key={listItem.id} className="CheckBox-list">
            <CheckBoxItem {...listItem} state={this.state[listItem.id].checked} onClick={this.onChildChanged}/>
            {this.boxItem(listItem)}
        </div>)
    }

    renderItem(listItem){
        return (<CheckBoxItem {...listItem} state={this.state[listItem.id].checked} onClick={this.onChildChanged}/>)
    }

    boxItem(data){
        if(data.hasOwnProperty("list")){
            let props = data.list;
            return (this.list(props))
        }
    }

    onChildChanged(obj){
        let oldStateData = this.state;
        oldStateData[obj.id] = obj;


        for(let oldState of Object.values(oldStateData)){
            if(oldState.parent === obj.id){
                oldState.checked = obj.checked;
            }
        }

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
                let parent = oldStateData[obj.parent];

                parent.checked = obj.checked;
            }

        }

        this.setState(Object.assign(this.state,oldStateData));
    }
}

export default CheckBoxList;