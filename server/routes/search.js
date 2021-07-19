import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();


function apiCallIndianState(url, res){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
      
    fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => res.send(result))
        .catch(error => console.log('error', error));
}


router.get("/submit-india", async (req, res) => {
    const url = "https://api.covid19india.org/v4/min/data.min.json";
    apiCallIndianState(url, res);
});

// router.post("/submit-world", async (req, res) => {
//     const url = "https://corona.lmao.ninja/v3/covid-19/all";
//     apiCallWorld(url, res);
// });

// router.post("/submit-india-city", async (req, res) => {
//     const url = "https://api.covid19india.org/v4/min/data.min.json";
//     apiCallIndianCity(url, res);
// });

export default router;
