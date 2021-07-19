import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

function apiCallIndia(url, res){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
      
    fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => res.send(result))
        .catch(error => console.log('error', error));

}

function apiCallWorld(url, res){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
      
    fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => res.send(result))
        .catch(error => console.log('error', error));
}

router.get("/initialize-india", async (req, res) => {
    const urlIndia = "https://corona.lmao.ninja/v3/covid-19/countries/india?strict=true";
    apiCallIndia(urlIndia, res);
});

router.get("/initialize-world", async (req, res) => {
    const urlWorld = "https://corona.lmao.ninja/v3/covid-19/all";
    apiCallWorld(urlWorld, res);
});

export default router;