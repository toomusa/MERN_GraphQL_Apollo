const passport      = require("passport");
const User          = require("../models/User");
const JwtStrategy   = require("passport-jwt").Strategy;
const ExtractJwt    = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");

// Create local strategy

// By default LocalStrategy is expecting a username and a password
const localOptions = { usernameField: "email"};

const localLogin = new LocalStrategy(localOptions, async (email, password, done) => {
    try {
        const user = await User.findOne({ email });
        if (!user) return done(null, false);

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return done(null, false);

        const validUser = await User.findById(user._id).select('-password');
        return done(null, validUser);
    } catch(e) {
        done(e, false);
    }
})

// Set up options of Jwt Strategy
// We need to tell our strategy where to look for the token

const jwtOptions = {
    // Tells Jwt Strategy that whenever a request comes in
    // and we want passport to handle it
    // it needs to look in the header for the property call authorization
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    // tells jwt strategy what secret we used to encode the token
    // so that it can decode it
    secretOrKey: process.env.SECRET
}

// We are going to get the payload argument from an incoming request
// The payload argument is coming from the function that we will create in authRoutes
// done is the function we call once we tried to autenticate this user

const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
        console.log(payload)
        const user = await User.findById(payload.sub);
        console.log(user)
        if (!user) return done(null, false);
        done(null, user);
    } catch (e) {
        done(e, false);
    }
})

// This tells passport that we declared these strategies
// The local login says we have a strategy called "local"
// The jwt login says we have a strategy called "jwt"

// When we say passport.authenticate("jwt")
// passport will look for a strategy called "jwt"

passport.use(localLogin);
passport.use(jwtLogin);