import express, { json } from "express";
import { createConnection } from "mysql";
import cors from "cors";

const app = express();

app.use(json());
app.use(cors());

const db = createConnection({
    user: "root",
    host: "localhost",
    password:"",
    database:"safeenviro"
});

app.post('/signup', (req, res)=> {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const type = req.body.type;

    db.query("INSERT INTO `users` (`username`, `password`, `email`, `type`) VALUES  (?,?,?,?)",
        [username, password, email, type], 
        (err, result)=>{
            if (err) {
                console.log(err);
                res.send({err: err});
            } 
            
            if (result){
                res.send(result);
            }
        }
    );
});

app.post('/login', (req, res)=> {
    const username = req.body.username;
    const password = req.body.password;
    const type = req.body.type;

    db.query("SELECT * FROM users WHERE username= ? AND password= ? AND type= ?", 
        [username, password, type], 
        (err, result)=>{
            if (err) {
                res.send({err: err});
            } 
            
            if (result.length > 0){
                res.send(result);
            } else {
                res.send({message: "Wrong User Name or Password"});
            }
        }
    );
});

app.listen(3001, () => {
    console.log("running server")
});