const User = require ('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const sign = process.env.SIGN;

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if(!user) {
                res.status(401).json({ message: 'no match found' });
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if(!valid) {
                            res.status(401).json({ message: "No match found" });
                        } else {
                            res.status(200).json({
                                userId: user._id,
                                isAdmin: user.isAdmin,
                                token: jwt.sign(
                                    {
                                        userId: user._id,
                                        isAdmin: user.isAdmin
                                    },
                                    sign,
                                    { expiresIn: '12h' }
                                )
                            });
                        }
                    })
                    .catch(error => res.status(500).json({ error }));
            }
        })
        .catch(error => res.status(500).json({ error }));
};

exports.signup = (req, res, next) => {

    delete req.body.isAdmin;

    function passwordIsStrong(password) {
        const caps = /[A-Z]/g;
        const lower = /[a-z]/g;
        const number = /[1-9]/g;
        const special = /[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;

        if(caps.test(password)) {
            if(lower.test(password)) {
                if(number.test(password)) {
                    if(special.test(password)) {
                        return true;
                    }
                }
            }
        } else {
            return false;
        }
    };
    if(!passwordIsStrong(req.body.password)) {
        res.status(400).json({ message: 'The password is not secure enough' });
    } else {
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User ({
                email: req.body.email,
                password: hash,
            });
            user.save()
                .then(() => res.status(200).json({ message: 'User created' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
    }
};

exports.deleteAccount = (req, res, next) => {
    User.findOne({ _id: req.params.id })
        .then((user) => {
            if(user._id != req.auth.userId && !req.auth.isAdmin) {
                res.status(403).json({ message: 'You are not allowed to do that' });
            } else {
                User.deleteOne({ _id: req.params.id })
                    .then(() => { res.status(200).json({ message: 'User account deleted' })})
                    .catch(error => {res.status(500).json({ error })});
            }
        })
        .catch(error => {res.status(404).json({ error })});
};

exports.modifyAccount = (req, res, next) => {
    
    const objectUser = { ...req.body };

    // delete user entry of isAdmin if not an admin
    if(!req.auth.isAdmin) {
        delete objectUser.isAdmin;
    }

    function passwordIsStrong(password) {
        const caps = /[A-Z]/g;
        const lower = /[a-z]/g;
        const number = /[1-9]/g;
        const special = /[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;

        if(caps.test(password)) {
            if(lower.test(password)) {
                if(number.test(password)) {
                    if(special.test(password)) {
                        return true;
                    }
                }
            }
        } else {
            return false;
        }
    };

    User.findOne({ _id: req.params.id })
        .then((user) => {
            if(user._id != req.auth.userId && !req.auth.isAdmin) {
                res.status(403).json({ message: 'You are not allowed to do that' });
            } else {
                if(!passwordIsStrong(objectUser.password)) {
                    res.status(400).json({ message: 'The password is not secure enough' });
                } else {
                    bcrypt.hash(objectUser.password, 10)
                        .then(hash => { 
                            User.updateOne({ _id: req.params.id}, {
                                email: objectUser.email,
                                password: hash,
                                _id: req.params.id
                            })
                                .then(() => res.status(200).json({ message: "User modified." }))
                                .catch(error => res.status(500).json({ error }));
                        })
                        .catch();
                }
            }
        })
        .catch(error => {res.status(404).json({ error })});
}