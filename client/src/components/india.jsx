import React, { Component } from 'react';
import { indiaInitialize, indiaSubmit } from '../api/api';
import '../styles/india.css'

class India extends Component {
    
    constructor(props){
        super(props);
        this.state = { 
            initialData: "",
            // data: "",
            value: "",
            dataConfirmedCases: "",
            dataActiveCases: "",
            dataRecoveredCases: "",
            dataDeathCases: ""
        }
        console.log("constructor called");
        this.handelChange = this.handelChange.bind(this);
        this.handelSubmit = this.handelSubmit.bind(this);
    }

    componentDidMount(){
        console.log("component did mount");
        this.recieveData();
    }

    async recieveData(){
        console.log(this.state.initialData);
        console.log("receive Data");
        const { data } = await indiaInitialize();
        console.log(data);
        this.setState({
           initialData: data
        });
        const dataConfirmedCases = this.state.initialData.cases;
        const dataActiveCases = this.state.initialData.active;
        const dataRecoveredCases = this.state.initialData.recovered;
        const dataDeathCases = this.state.initialData.deaths;

        this.setState({
            dataConfirmedCases,
            dataActiveCases,
            dataRecoveredCases,
            dataDeathCases
        })

        console.log(this.state.initialData);
    }

    async handelSubmit(event){
        event.preventDefault();
        console.log("handel submit");
        console.log(this.state.value);
        const { data } = await indiaSubmit();
        console.log(data);
        this.setState({
            data
        })

        console.log(this.state.data);
    }

    handelChange(event) {
        this.setState({
            value: event.target.value
        })
    }



    render() { 
        return ( 
            <React.Fragment>
                <div className="container india data-block">

                    <h1>India</h1>

                    <div className="container search-bar">
                        <form onSubmit={this.handelSubmit}>
                            <label>
                                <input type="text" name="name" value={this.state.value} placeholder="Search City/State" onChange={this.handelChange}/>
                            </label>
                            <button type="submit">
                                Submit
                            </button>
                        </form>
                    </div>

                    <div className="statistics">
                        <div className="container a-cases">
                            <div className="type">Active</div>
                            <div>{this.state.dataActiveCases}</div>
                        </div>
                        <div className="container c-cases">
                            <div className="type">Confirmed</div>
                            <div>{this.state.dataConfirmedCases}</div>
                        </div>
                        <div className="container r-cases">
                            <div className="type">Recovered</div>
                            <div>{this.state.dataRecoveredCases}</div>
                        </div>
                        <div className="container d-cases">
                            <div className="type">Deceased</div>
                            <div>{this.state.dataDeathCases}</div>
                        </div>
                    </div>

                </div>
            </React.Fragment>
         );
    }
}
 
export default India;