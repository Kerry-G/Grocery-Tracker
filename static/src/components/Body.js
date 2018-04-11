import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { fetchAPI } from './../utility'
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Select from 'muicss/lib/react/select';
import Option from 'muicss/lib/react/option';

class Body extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "camille",
            amount: "",
            date: moment(),
            type: "grocery",
        };
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeAmount = this.handleChangeAmount.bind(this);
    }

    handleChangeDate(date) {
        this.setState({date});
    }

    handleChangeAmount(e) {
        const amount = e.target.value
        this.setState({ amount })
    }
    handleSubmit(e) {
        e.preventDefault()
        this.defaultState()
        console.log(this.state)
        let date = this.state.date.format()
        let body =({
            name: this.state.name,
            type: this.state.type,
            amount: this.state.amount,
            date
        })
        fetchAPI("POST", "", body)
    }

    defaultState() {
        this.setState({
            name: "camille",
            amount: "",
            startDate: moment(),
            type: "grocery"
        })
    }

    render() {
        return (
            <div className="container">
                <Form>
                    <Select
                        label="Name"
                        defaultValue="Camille"
                        onChange={e => { this.setState({ name: e.target.value }) }}
                    >
                        <Option value="camille" label="Camille" />
                        <Option value="kerry" label="Kerry" />
                    </Select>

                    <Select
                        label="type"
                        onChange={e => { this.setState({ type: e.target.value }) }}
                    >
                        <Option value="grocery" label="Grocery" />
                        <Option value="pharmacy" label="Pharmacy" />
                        <Option value="other" label="Option" />
                    </Select>

                    <Input floatingLabel label="Amount" type="number" value={this.state.amount}
                        onChange={this.handleChangeAmount} />


                    <div className="datepicker">
                        <DatePicker
                            inline
                            selected={this.state.date}
                            onChange={this.handleChangeDate}
                        />
                    </div>

                    <div className="button-container">
                        <button className="submit" type="submit" onClick={this.handleSubmit}>Save</button>
                    </div>
                </Form>
            </div>
        );
    }
}

export default Body;
