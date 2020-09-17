import React, { Component } from 'react'
import axios from 'axios'


class Fib extends Component{
    state = { 
        seenIndexes : [],
        values : {},
        index : "" 
    
    }

    componentDidMount(){
        this.fetchIndexes();
        this.fetchValues();
    }

    async fetchValues(){
        const values = await axios.get("/api/values/current")
        this.setState({values:values.data})
    }

    async fetchIndexes(){
        const seenIndexes=await axios.get("/api/values/all")
        setState({seenIndexes:seenIndexes.data)
    }


}


export default Fib