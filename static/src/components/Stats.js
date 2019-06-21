import React, { useState, useEffect } from 'react';
import { fetchAPI } from './../utility'
import Button from 'muicss/lib/react/button';

const Stats = (props) => {

    const [receipts, setReceipts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            let receipts = await getReceipts();
            setReceipts(receipts);
        }
        fetchData();
    }, [])

    const [due, setDue] = useState({ name: "", amount: "" })
    useEffect(()=>{
        handleDifferenceUnpaid();
    }, [receipts])

    const getReceipts = async () => {
        const answer = await fetchAPI("GET")
        return answer;
    }

    const unpaidAmount = (receipts) => {
        return receipts
            .filter(receipt => receipt.paid === false)
    }

    const handleDifferenceUnpaid = () => {
        let unpaid = unpaidAmount(receipts);
        let kerryUnpaidAmount = computeAmount("kerry", unpaid);
        let genUnpaidAmount = computeAmount("genevieve", unpaid);
        let differenceUnpaid = Math.abs(kerryUnpaidAmount - genUnpaidAmount)
        kerryUnpaidAmount > genUnpaidAmount
            ? setDue({ name: "Geneviève", amount: differenceUnpaid })
            : setDue({ name: "Kerry", amount: differenceUnpaid })
    }

    const computeAmount = (person, receiptsArray) => {
        return receiptsArray
            .filter(receipt => receipt.name === person)
            .reduce((acc, curr) => {
                return acc + curr.amount
            }, 0);
    }

    const handlePaid = () => {
        fetchAPI("PATCH")
        getReceipts()
            .then(receipt => handleDifferenceUnpaid(receipt))
            .catch(err => console.error(err))
    }

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const diff = (due.amount === 0)
        ? <p> We're quits </p>
        : <p> {due.name} owns {due.amount / 2}$ </p>
    const unpaid = unpaidAmount(receipts)
    const unpaidList = unpaid.map(
        (receipt, index) =>
            <li key={index}>
                {capitalizeFirstLetter(receipt.name)} added {receipt.amount}$ ({receipt.type})
            </li>
    )
    return (
        <>
            <h2>To be paid</h2>
            {diff}
            <Button variant="raised" onClick={handlePaid}>Paid</Button>
            <h2>Details</h2>
            {unpaidList}
        </>
    );

}

export default Stats;
