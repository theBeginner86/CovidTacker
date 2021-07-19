import React, { Component } from 'react';
import { indiaInitialize, indiaSubmit } from '../api/api';
import '../styles/india.css'

class India extends Component {
    
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

    findStateCode(){
        console.log("find state code");
        const stateToBeSearched = this.state.value;
        var stateCodeToBeSearched = "";
        var isFound=0;
        const stateCodes = {
            "Andaman and Nicobar Islands": "AN",
            "Andhra Pradesh": "AP",
            "Arunachal Pradesh": "AR",
            "Assam": "AS",
            "Bihar": "BR",
            "Chandigarh": "CH",
            "Dadra and Nagar Haveli": "DN",
            "Daman and Diu": "DD",
            "Delhi": "DL",
            "Goa": "GA",
            "Gujarat": "GJ",
            "Haryana": "HR",
            "Himachal Pradesh": "HP",
            "Jammu and Kashmir": "JK",
            "Jharkhand": "JH",
            "Karnataka": "KA",
            "Kerala":	"KL",
            "Lakshadweep": "LD",
            "Madhya Pradesh": "MP",
            "Maharashtra": "MH",
            "Manipur": "MN",
            "Meghalaya": "ML",
            "Mizoram":	"MZ",
            "Nagaland":	"NL",
            "Odisha": "OR",
            "Puducherry": "PY",
            "Punjab": "PB",
            "Rajasthan": "RJ",
            "Sikkim": "SK",
            "Tamil Nadu": "TN",
            "Telangana": "TG",
            "Tripura": "TR",
            "Uttar Pradesh": "UP",
            "Uttarakhand": "UT",
            "West Bengal":	"WB"
        }

        for(const [key, value] of Object.entries(stateCodes)){
            if(stateToBeSearched.toLowerCase() === key.toLowerCase()){
                stateCodeToBeSearched = value;
                console.log(value);
                isFound = 1;
                break;
            }
        }

        this.setState({
            searchDataFound: isFound
        })

        return stateCodeToBeSearched

    }

    calcValues(totalDataOfPlace){
        const dataConfirmedCases = totalDataOfPlace["confirmed"];
        const dataRecoveredCases = totalDataOfPlace["recovered"];
        const dataDeathCases = totalDataOfPlace["deceased"];
        const dataActiveCases = dataConfirmedCases - dataRecoveredCases - dataDeathCases;

        this.setState({
            dataConfirmedCases,
            dataActiveCases,
            dataRecoveredCases,
            dataDeathCases
        })
    }

    findSearchDataFromState(stateCode){
        const totalDataOfPlace = this.state.searchData[stateCode]["total"];

        this.calcValues(totalDataOfPlace);

    }

    findSearchData(){
        console.log("finding search data");
        const stateCode = this.findStateCode();

        if(stateCode !== ""){
            this.findSearchDataFromState(stateCode);
        }

    }

    async handelSubmit(event){
        event.preventDefault();
        console.log("handel submit");
        console.log(this.state.value);
        const { data } = await indiaSubmit();
        console.log(data);
        this.setState({
            searchData: data
        })

        this.findSearchData();


        // console.log(this.state.data);
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