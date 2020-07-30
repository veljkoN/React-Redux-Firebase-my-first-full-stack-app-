import React, { Component } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment'
import 'react-calendar/dist/Calendar.css';
class CalendarDate extends Component {
  state = {
    date: null,
    deadline:null
  }
  onChange = date => this.setState({ ...this.state,deadline:date })
  //activeStartDate=new Date(2017, 0, 1)


 
  render() {
  const { setDeadline }=this.props
  moment("20120620", "YYYYMMDD").fromNow()
 
    return ( 
      <div className='container'>
        <p>Choose deadline</p>
        <Calendar 
       
      // activeStartDate={this.activeStartDate}
        onChange={(e)=>{
            //console.log(new Date(e).getDate(),new Date(e).getMonth()+1,new Date().getFullYear())
            let dateTemp=moment((`${new Date().getFullYear()}0${new Date(e).getMonth()+1 }${new Date(e).getDate()}`).toString(), "YYYYMMDD").fromNow() +' '+  (moment().endOf('day').fromNow().toString()).replace('in', 'and')    // `${new Date(e).getDate()} ${new Date(e).getMonth()+1} ${new Date().getFullYear()}`
            this.onChange(`${new Date().getFullYear()}0${new Date(e).getMonth()+1 }${new Date(e).getDate()}`)
            setDeadline( moment("20200716", "YYYYMMDD").fromNow())
            //console.log(dateTemp)
           // console.log(`${new Date().getFullYear()}0${new Date(e).getMonth()+1 }${new Date(e).getDate()}`)
            //console.log(moment().endOf('day').fromNow())
          }} value={this.state.date}
        />
      </div>
    );
  }
}
export default CalendarDate

/*import React from 'react'
import Calendar from 'react-calendar'

const CalendarDate = () => {

    return (
        <div className='container'>
            <h6 className="pink-text">Choose deadline for todo</h6>
            <Calendar />
        </div>
    )
}

export default CalendarDate*/
