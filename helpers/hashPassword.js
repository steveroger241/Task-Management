const bcrypt = require('bcrypt');

async function hashPassword(password) {
    try {
        const salt = 10;
        const hashpass = await bcrypt.hash(password, salt);
        return hashpass;
    }
    catch (err) {
        console.log(err);
    }
}

async function comparePassword(pass, hashpass) {
    try {
        const check = await bcrypt.compare(pass, hashpass);
        return check;
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = { hashPassword, comparePassword }