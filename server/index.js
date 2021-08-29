const express = require ('express');
const mysql = require ('mysql');
const cors = require ('cors');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const bcrypt = require ('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());
app.use(cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true
    })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

app.use(
    session({
        key: "userId",
        secret: "Safeenviro",
        resave: false,
        saveUninitialized: false,
        cookie:{
            expires: 60 * 60 * 24,
        },
    })
);

const db = mysql.createConnection({
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

        bcrypt.hash(password, saltRounds, (err, hash) => {
            if(err){
                console.log(err);
            }
            
            db.query(
                "INSERT INTO `users` (`username`, `password`, `email`, `type`) VALUES  (?,?,?,?)",
                [username, hash, email, type], 
                (err, result)=>{
                    if (err) {
                        res.send({err: err});
                    } 
                    if (result){
                        res.send({reg:true});
                    }
                }
            );
        });
});

const verifyJWT = (req, res, next) => {
    const token = req.header["x-access-token"];

    if (!token) {
        res.send("We need a token")
    } else {
        jwt.verify( token, "jwtSecret", (err, decoded) => {
            if(err){
                res.json({auth: false, message: "You failed to authenticate"});
            } else {
                req.userId = decoded.id;
                next();
            }
        })
    }
}

app.get('/isUserAuth', verifyJWT , (req, res) => {
    res.send("yo, u are authenticated!!");
});

app.get('/login', (req, res)=> {
    if (req.session.user) {
        res.send({loggedIn: true, user: req.session.user, auth: true});
    } else {
        res.send({loggedIn: false, auth: true});
    }
});

app.post('/login', (req, res)=> {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM `users` WHERE `username` = ?", 
        username, 
        (err, result)=>{
            if (err) {
                res.send({err: err});
            } 
            
            if ( result.length > 0){
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if(response){
                        
                        const id = result[0].id;
                        const token = jwt.sign({id}, "jwtSecret", {
                            expiresIn : 300,
                        });

                        req.session.user = result;
                        res.json({auth: true, token: token, result: result});
                    } else {
                        res.json({auth: false,  message: "Wrong User Name, Password Combination"});
                    }
                });
            }else{
                res.json({auth: false,  message: "This User doesn't exist"});
            }
        }
    );
});


app.post('/collectionform', (req, res)=> {
    const collectionpoint = req.body.collectionpoint;
    const wastetype = req.body.wastetype;
    const quantity = req.body.quantity;
    const collectedby = req.body.collectedby;
    const collectingequipment = req.body.collectingequipment;
    const date = req.body.date;

    db.query(
        "INSERT INTO `collectionform` (`collectionid`, `collectionpoint`, `collectedby`, `wastetype`, `collectingequipment`, `quantity`, `dateandtime`) VALUES (?,?,?,?,?,?)",
        [collectionpoint, wastetype, quantity, collectedby, collectingequipment, date],
        (err, result)=>{
            if (err) {
                res.send({err: err});
            } 
            if (result){
                res.send({message: "Collection Successfully Submited"});
            }
        }
    );
});

app.listen(3001, () => {
    console.log("running server")
});