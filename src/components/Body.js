import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class Body extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name:"camille",
            amount:"",
            startDate: moment(),
            type:"grocery",
        };
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeDate = this.handleChangeDate.bind(this);
    }

    handleChangeDate(date) {
        this.setState({
            startDate: date
        });
        console.log(date)
    }

    handleSubmit(e){
        e.preventDefault()
        this.defaultState()
        console.log(this.state)
    }

    defaultState(){
        this.setState({
            name:"camille",
            amount:"",
            startDate: moment(),
            type:"grocery"
        })
    }

    render() {
        return (
            <div className="container">
                <form>
                <div className="input-field">
                    <h2>Nom</h2>
                    <select onChange={e=>{this.setState({name:e.target.value})}}>
                        <option value="camille">Camille</option>
                        <option value="kerry">Kerry</option>
                    </select>
                </div>
                <div className="input-field">
                <h2>Date</h2>
                <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleChangeDate}
                />
                </div>
                <div className="input-field">
                    <h2>Amount</h2>
                    <input type="number" value={this.state.amount} onChange={e=>this.setState({amount:e.target.value})}/>
                </div>
                <div className="input-field">
                    <h2>Reason</h2>
                    <select onChange={e=>{this.setState({type:e.target.value})}}>
                        <option value="grocery">Grocery</option>
                        <option value="pharmacy">Pharmacy</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="button-container">
                    <button type="submit" onClick={this.handleSubmit}>Save</button>
                </div>
                </form>
            </div>
        );
    }
}

export default Body;
