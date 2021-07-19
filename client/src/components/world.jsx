import React, { Component } from 'react';
import { worldInitialize, worldSubmit} from '../api/api.js'
import '../styles/world.css'

class World extends Component {

    constructor(props){
        super(props);
        this.state = { 
            data: "",
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
        console.log(this.state.data);
        console.log("receive Data");
        const { data } = await worldInitialize();
        console.log(data);
        this.setState({
            data
        })

        const dataConfirmedCases = this.state.data.cases;
        const dataActiveCases = this.state.data.active;
        const dataRecoveredCases = this.state.data.recovered;
        const dataDeathCases = this.state.data.deaths;

        this.setState({
            dataConfirmedCases,
            dataActiveCases,
            dataRecoveredCases,
            dataDeathCases
        })

        console.log(this.state.data);
    }

    async handelSubmit(event){
        event.preventDefault();
        console.log(this.state.data);
        console.log("handel submit");
        const { data } = await worldSubmit();
        console.log(data);
        this.setState({
            data: data
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
                <div className="container world data-block">

                    <h1>World</h1>

                    <div className="container search-bar">
                        <form onSubmit={this.handelSubmit}>
                            <label>
                                <input type="text" name="name" value={this.state.value} placeholder="Search Country" onChange={this.handelChange}/>
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
 
export default World;