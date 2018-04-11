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
    }

    componentDidMount() {
        this.getReceipts()
        .then(receipt=>this.handleUnpaidAmount(receipt))
        .catch(err=>console.error(err))
    }
    
    getReceipts(){
        return new Promise((res,rej) => {
            fetchAPI("GET")
            .then(receipts => this.setState({receipts}, res(receipts)) )
            .catch(err => rej(err))
        })
    }

    handleUnpaidAmount(receipts){
        let unpaid = receipts
        .filter(receipt => receipt.paid === false)
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

    render() {
        let diff = (this.state.due.amount === 0 ) 
            ? <p> Neither of us should put less money in the joint account! </p> 
            : <p> {this.state.due.name} should put {this.state.due.amount}$ <i>less</i> in the joint account </p>
        return (
            <div>
                {diff}
                <Button variant="raised" onClick={()=>fetchAPI("PATCH")}> Paid </Button>
            </div>
        );
    }
}

export default Stats;
