import React, { Component } from 'react';
import { worldInitialize, worldSubmit} from '../api/api.js'
import '../styles/world.css'

class World extends Component {

    constructor(props){
        super(props);
        this.state = { 
            initialData: "",
            searchData: "",
            value: "",
            searchDataFound: "",
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
        const { data } = await worldInitialize();
        console.log(data);
        this.setState({
            initialData: data
        })

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

        console.log(this.state.data);
    }

    findSearchCountryTotalData(){
        console.log("finding search country");
        var isFound = 0;
        var countryTotalDataToBeSearch = "";
        for(var i=0; i<this.state.searchData.length; i++){
            var currentCountryTotalData = this.state.searchData[i];
            var currentCountryName = currentCountryTotalData["country"];
            if(currentCountryName.toLowerCase() === this.state.value.toLowerCase()){
                isFound = 1;
                countryTotalDataToBeSearch = currentCountryTotalData;
                break;
            }
        }
        // for(const [key, value] of Object.entries(this.state.searchData)){
        //     if(key.toLowerCase() === this.state.value){
        //         isFound = 1;
        //         countryTotalDataToBeSearch = value;
        //         break;
        //     }
        // }

        this.setState({
            searchDataFound: isFound
        })

        return countryTotalDataToBeSearch;
    }

    findSearchData(){
        console.log("finding search data");
        
        const totalDataOfPlace = this.findSearchCountryTotalData();

        if(totalDataOfPlace !== ""){
            const dataConfirmedCases = totalDataOfPlace["cases"];
            const dataRecoveredCases = totalDataOfPlace["recovered"];
            const dataDeathCases = totalDataOfPlace["deaths"];
            const dataActiveCases = totalDataOfPlace["active"];

            this.setState({
                dataConfirmedCases,
                dataActiveCases,
                dataRecoveredCases,
                dataDeathCases
            })
        }

    }

    async handelSubmit(event){
        event.preventDefault();
        console.log(this.state.searchData);
        console.log("handel submit");
        const { data } = await worldSubmit();
        console.log(data);
        this.setState({
            searchData: data
        })
        
        this.findSearchData();

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