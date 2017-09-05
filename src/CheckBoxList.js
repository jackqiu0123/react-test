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
        this.clear = this.clear.bind(this);
    }

    render() {
        return (<div>
                <p>招聘职位</p>
                <button className="clear-button " onClick={this.clear}>清空</button>
                <div className="clear"></div>
                <div>{this.list(this.props.list)}</div>
                </div>
                );
    }

    initState(){
        let obj = this.initStateData(this.props.list);
        console.log(obj);
        return obj;
    }


    initStateData(list){
        var obj = {};
        for(let listItem of list){
            obj[listItem.id] = {"checked":false,"parent":listItem.parent,"id":listItem.id,"number":listItem.number};
            if(listItem.hasOwnProperty("list")){
                obj[listItem.id].children = listItem.list;
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

    classNames(listItem){
        let classNames = 'CheckBox-list';
        classNames += listItem.parent != "-1" ? " secondary" : "";
        return classNames;
    }

    renderList(listItem){
        return (<div key={listItem.id} className={this.classNames(listItem)}>
            <CheckBoxItem {...listItem} number={this.state[listItem.id].number} state={this.state[listItem.id].checked} onClick={this.onChildChanged}/>
            {this.boxItem(listItem)}
        </div>)
    }

    renderItem(listItem){
        return (<CheckBoxItem {...listItem} number={this.state[listItem.id].number} state={this.state[listItem.id].checked} onClick={this.onChildChanged}/>)
    }

    boxItem(data){
        if(data.hasOwnProperty("list")){
            let props = data.list;
            return (this.list(props))
        }
    }

    clear(){
        let oldStateData = this.state;
        for(let child of Object.values(oldStateData)){
            oldStateData[child.id].checked = false;
            if(child.hasOwnProperty("children")){
                oldStateData[child.id].number = 0;
            }
        }
        this.setState(Object.assign(this.state,oldStateData));
    }

    changeChildCheck(oldStateData,obj){
        let current = oldStateData[obj.id];
        if(current.hasOwnProperty("children")){
            for(let child of Object.values(oldStateData)){
                if(child.parent === current.id){
                    oldStateData[child.id].checked = obj.checked;
                    if(child.hasOwnProperty("children")){
                        oldStateData =this.changeChildCheck(oldStateData,child);
                    }
                }

            }
        }

        return oldStateData;
    }


    changeParentCheck(oldStateData,obj){
        // for(let oldState of Object.values(oldStateData)){
        //     if(oldState.parent === obj.id){
        //         oldState.checked = obj.checked;
        //     }
        // }
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
        let oldStateData = this.state;
        oldStateData[obj.id].checked = obj.checked;
        oldStateData = this.changeChildCheck(oldStateData,obj);
        oldStateData = this.changeParentCheck(oldStateData,obj);

        // for(let child of oldStateData){
        //     if(child.parent === obj.parent){
        //
        //     }else{
        //
        //     }
        // }


        oldStateData = this.refreshNumber(oldStateData,this.getFirstCheckBox(oldStateData,obj.id));
        this.setState(Object.assign(this.state,oldStateData));
    }

    getFirstCheckBox(oldStateData,id){
        if(oldStateData[id].parent === "-1"){
            return oldStateData[id];
        }else{
            return this.getFirstCheckBox(oldStateData,oldStateData[id].parent);
        }
    }

    refreshNumber(oldStateData,obj){
        if(obj.hasOwnProperty("children")){
            let number = 0;

            for(let child of Object.values(oldStateData)){
                if(obj.id === child.parent){
                    if(child.hasOwnProperty("children")){
                       oldStateData = this.refreshNumber(oldStateData,child);
                       number += oldStateData[child.id].number;
                    }else{
                        if(child.checked){
                            number += child.number;
                        }
                    }
                }
            }

            oldStateData[obj.id].number = number;
        }
        return oldStateData;
    }
}

export default CheckBoxList;