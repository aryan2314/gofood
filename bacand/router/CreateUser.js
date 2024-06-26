const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const jwt=require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jwtSeceret="my name  is aryan kumar and your name is kumar$#"


router.post("/createuser", 
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password','incorrect password').isLength({ min: 5 }),
    async (req, res) => {
        const errors=validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const salt=await bcrypt.genSalt(10);
        let setPassword=await bcrypt.hash(req.body.password,salt)
        try {
            

            // Create a user document
            const newUser = await User.create({
                name: req.body.name,
                email: req.body.email,
                password:setPassword,
                location: req.body.location,
            });
            console.log(newUser)
            
            // Send a success response with the created user
            res.status(201).json({ success: true, user: "fdsfs" });
        } catch (err) {
            // Handle errors
            console.error("Error creating user:", err);
            res.status(500).json({ success: false, error: "Internal Server Error" });
        }
    });
    router.post("/loginuser" ,
    body('email').isEmail(),
    body('password',).isLength({ min: 5 }),
    async (req, res) => {
        const errors=validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let {email,password} = req.body;
        
        try {

            
            // Create a user document
            let userdata=await User.findOne({email})
            if(!userdata) {
                return res.status(400).json({ errors:"try login with correct credential"  });
            };
            const pwdCompare=await bcrypt.compare(password, userdata.password)
            if(!pwdCompare) {
                return res.status(400).json({ errors:"try login with correct credentials"  });
            }
            

            
            const data={
                user:{
                    id:userdata.id
                }
            }
            const authtoken=jwt.sign(data,jwtSeceret)
            res.status(200).json({ success: true, authtoken:authtoken });
            
            
            
            // Send a success response with the created user
            
        } catch (err) {
            // Handle errors
            console.error("Error creating user:", err);
            res.status(500).json({ success: false, error: "Internal Server Error" });
        }
    });


module.exports = router;
