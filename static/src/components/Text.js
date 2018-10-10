import React from 'react'
import message from './message'

const Text = () => 
    <div>
       {message.text}
       <br/>
       <br/>
       {message.ending}
       <br/>
       {message.love}
    </div>

export default Text;