import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { fetchAPI } from './../utility'
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Select from 'muicss/lib/react/select';
import Option from 'muicss/lib/react/option';

const FormReceipts = (props) => {
    const [name, setName] = useState("genevieve");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState(new Date());
    const [type, setType] = useState("grocery");

    function handleChangeDate(date) {
        setDate(date);
    }

    function handleChangeAmount(e) {
        const amount = e.target.value
        setAmount(amount);
    }

    function handleSubmit(e) {
        e.preventDefault()
        defaultState()
        let body = ({ name, type, amount, date })
        fetchAPI("POST", "", body)
    }

    function defaultState() {
        setName("genevieve");
        setAmount("");
        setDate(new Date());
        setType("grocery");
    }

    return (
        <Form>
            <Select
                label="Name"
                value={name}
                onChange={e => { setName(e.target.value) }}
            >
                <Option value="genevieve" label="Genevi&egrave;ve" />
                <Option value="kerry" label="Kerry" />
            </Select>

            <Select
                label="type"
                onChange={e => { setType(e.target.value ) }}
            >
                <Option value="restaurent" label="Restaurant" />
                <Option value="bar" label="Bar" />
                <Option value="grocery" label="Grocery" />
                <Option value="pharmacy" label="Pharmacy" />
                <Option value="activity" label="Activity" />
                <Option value="other" label="Other" />
            </Select>

            <Input floatingLabel label="Amount" type="number" value={amount}
                onChange={handleChangeAmount} />

            <div className="datepicker">
                <DatePicker
                    inline
                    selected={date}
                    onChange={handleChangeDate}
                />
            </div>

            <div className="button-container">
                <button className="submit" type="submit" onClick={handleSubmit}>Save</button>
            </div>
            <p className="disclaimer">Made with <span>♥</span> by Kerry Gougeon</p>
        </Form>
    );
}


export default FormReceipts;
