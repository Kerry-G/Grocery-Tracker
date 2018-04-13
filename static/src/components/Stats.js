import React, { Component } from 'react';
import { fetchAPI } from './../utility'
import Button from 'muicss/lib/react/button';

class Stats extends Component {
    constructor(props) {
        super(props)
        this.state = {
            receipts: [],
            due: { name: "", amount: "" }
        };
        this.handlePaid = this.handlePaid.bind(this)
    }

    componentDidMount() {
        this.getReceipts()
        .then(receipt=>this.handleDifferenceUnpaid(receipt))
        .catch(err=>console.error(err))
    }
    
    getReceipts(){
        return new Promise((res,rej) => {
            fetchAPI("GET")
            .then(receipts => this.setState({receipts}, res(receipts)) )
            .catch(err => rej(err))
        })
    }

    unpaidAmount(receipts){
        return receipts
        .filter(receipt => receipt.paid === false)
    }

    handleDifferenceUnpaid(receipts){
        let unpaid = this.unpaidAmount(receipts);
        let kerryUnpaidAmount = this.computeAmount("kerry", unpaid);
        let camilleUnpaidAmount = this.computeAmount("camille", unpaid);
        let differenceUnpaid = Math.abs(kerryUnpaidAmount - camilleUnpaidAmount)
        kerryUnpaidAmount > camilleUnpaidAmount 
            ? this.setState ({due:{name:"Kerry", amount:differenceUnpaid}})
            : this.setState ({due:{name:"Camille", amount:differenceUnpaid}})
    }

    computeAmount(person, receiptsArray) {
        return receiptsArray
            .filter(receipt => receipt.name === person)
            .reduce((acc, curr) => {
                return acc + curr.amount
            }, 0);
    }

    handlePaid(){
        fetchAPI("PATCH")
        this.getReceipts()
        .then(receipt=>this.handleDifferenceUnpaid(receipt))
        .catch(err=>console.error(err))
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render() {
        let diff = (this.state.due.amount === 0 ) 
            ? <p> Neither of us should put less money in the joint account! </p> 
            : <p> {this.state.due.name} should put {this.state.due.amount}$ <i>less</i> in the joint account </p>
        let unpaid = this.unpaidAmount(this.state.receipts)
        let unpaidList = unpaid.map((receipt,index)=>
        <li key={index}>{this.capitalizeFirstLetter(receipt.name)} added {receipt.amount} $</li>
        )
        return (
            <React.Fragment>
                <h2>To be paid</h2>
                {diff}
                <Button variant="raised" onClick={this.handlePaid}>Paid</Button>
                <h2>Details</h2>
                {unpaidList}
            </React.Fragment>
        );
    }
}

export default Stats;
