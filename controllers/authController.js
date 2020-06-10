const db = require("../models");
const jwt = require("jwt-simple");

const tokenForUser = user => {
    const timestamp = new Date().getTime();
    return jwt.encode({sub: user.id, iat: timestamp}, process.env.SECRET);
}

module.exports = {
    signup: async (req, res) => {
        const { email, password } = req.body;
        console.log("In controller", email, password)
        if (!email || !password) return res.status(422).json({error: "You must provide an email and password"});
        
        try {
            // Check if the email already exists in db
            const existingUser = await db.User.findOne({email});
            // If user exists, throw error
            if (existingUser) return res.status(422).json({error: "Email is in use"});
            // Create new user object
            const user = new db.User(req.body);
            // save user in db
            await user.save();
            // send user back
            res.json({token: tokenForUser(user), userId: user._id});
        } catch(e) {
            res.status(404).json({e});
        }
    },
    login: (req, res) => {
        console.log(req.user)
        res.json({token: tokenForUser(req.user), userId: req.user._id});
    },
    getAllEmails: async (req, res) => {
        const { email } = req.query;
        console.log(email)
        try {
            const userEmail = await db.User.findOne({ email }, 'email');
            console.log(userEmail)
            return res.status(200).json(userEmail);
        } catch (e) {
            return res.status(403).json({ e });
        }
    },
}