import React from "react";
import DatePicker from "react-datepicker";
import moment from 'moment'
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
 
class Calendar2 extends React.Component {
  state = {
    startDate: new Date(),
    deadLine:null
  };
  render() {
    return (
      <DatePicker  className="form-control"
        selected={this.state.startDate}
        onSelect={this.handleSelect}  //kada se klikne datum
        onChange={(date)=>{
            this.setState({
            startDate: date,
            deadLine:`${new Date().getFullYear()}0${new Date().getMonth()+1 }${new Date().getDate()}`
            })
            this.props.setDeadline(`${date.getFullYear()}0${date.getMonth()+1 }${date.getDate()===30 || date.getDate()===31? (date.getDate()):(date.getDate()+1)}`,`${date.getDate()}-0${date.getMonth()+1}-${date.getFullYear()}`)
        }}
        minDate={moment().toDate()}
      />
    );
  }
}
export default Calendar2