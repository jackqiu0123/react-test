/**
 * Created by Ricardo on 2017/9/3.
 */
import React,{Component} from 'react';
import "./CheckBoxList.css"

class CheckBoxItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={this.classNames()}>
                <input type="checkbox" checked={this.props.state} onClick={this.click.bind(this)} ></input>
                <p className="name">{this.props.name}</p>
                <p className="number">{this.props.number}</p>
            </div>
        );
    }



    classNames(){
        let classNames = 'CheckBox-item';

        if(this.props.parent === "-1"){
            classNames += "";
        }else{
            if(this.props.hasOwnProperty("list")){
                classNames += "";
            }else{
                classNames += " secondary";
            }
        }





        return classNames;
    }

    click(event){
        event.stopPropagation();
        // this.props.callbackParent(event.target.checked);
        this.props.onChildChanged( {"checked":event.target.checked,"parent":this.props.parent,"id":this.props.id});

    }

}

export default CheckBoxItem;