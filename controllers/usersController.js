const db = require("../models");



module.exports = {
    findAll: function (req, res) {
        db.User
            .find(req.query)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findOne: function (req, res) {
        db.User
            .findOne({userName:req.params.userName})
            .populate({path:"workouts",options:{sort:{date:-1}}})
            .then(dbModel => {
                res.json(dbModel)})
            .catch(err => res.status(422).json(err));
    },
    checkPassword: function (req, res) {
        db.User
            .findOne({ userName: req.params.userName,password:req.params.password })
            .then(dbModel => {
                res.json(dbModel)
            })
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
        db.User.create(req.body)
            .then(dbUser => {
                return db.Program.findOneAndUpdate({ name: dbUser.program }, { $push: { users: dbUser._id } }, { new: true });
            })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    update: function (req, res) {
        db.User
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        db.User
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};
