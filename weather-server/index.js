const express = require("express");
const app = express();
const cors = require('cors');
const pool = require('./db');
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.post('/singleweather', async(req, res) =>{
        try{
            const {city,year} = req.body
            const student = await pool.query("select temp,month from weather_data where city=$1 and year=$2",[city, year ])
            res.status(200).json(student.rows);
            console.log(student.rows);
        } catch(err){
            console.log(err);
            res.sendStatus(404)
        }
    }
)
app.post('/avgweather', async(req, res) =>{
    try{
        const {city} = req.body
        const student = await pool.query("select temp,month from avg_weather_data where city=$1",[city])
        res.status(200).json(student.rows);
        console.log(student.rows);
    } catch(err){
        console.log(err);
        res.sendStatus(404)
    }
}
)


app.listen(PORT, () =>{
    console.log("App Listening in ", PORT)
})