const passport = require("passport");


// By default passport wants to use cookie based authentication for the user
// In our case we're using tokens so we set this behavior to false
const requireAuth = passport.authenticate("jwt", {session: false});
const requireSignIn = passport.authenticate("local", {session: false});

module.exports = {
    requireAuth,
    requireSignIn
}