const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const bcrypt = require("bcryptjs");

const validateEmail = email => {
    return validator.isEmail(email);
}

const UserSchema = new Schema ({
    fname: { type: String },
    lname: { type: String },
    title: { type: String },
    org: { type: String },
    focus: { type: String },
    regtype: { type: String },
    lang: { type: String, default: "en" },
    city: { type: String },
    state: { type: String },
    cell: { type: String },
    bday: { type: Date },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        validate: [
            validateEmail,
            "Please enter a valid email address"
        ]
    },
    password: {
        type: String,
        required: true
    },
    journey: {
        type: Schema.Types.ObjectId,
        ref: "Journey"
    }
})

UserSchema.pre("save", async function(next) {
    const user = this;
    if (user.isModified('password')) {
        try { 
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(user.password, salt);
            user.password = hash;
            next();
        } catch(e) {
            return next(e);
        }
    }
    next();
})

// methods attach to each instance of a document when queried 
UserSchema.methods.comparePassword = async function (candidatePassword) {
    const user = this;
    try {
      const isMatch = await bcrypt.compare(candidatePassword, user.password);
      return Promise.resolve(isMatch);
    } catch (e) {
      return Promise.reject(e);
    }
};

const User = mongoose.model("User", UserSchema);

module.exports = User;