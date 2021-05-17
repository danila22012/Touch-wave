// const {Schema, model} = require('mongoose')


// const User = new Schema({
//     username: {type: String, unique: true, required: true},
//     password: {type: String, required: true},
//     roles: [{type: String, ref: 'Role'}]
// })

const users = []
class User {
    constructor({username, password}) {
        this.username = username
        this.password = password
        this.id = Math.round(Math.random() * (10000000 - 1) + 1);
    }

    save() {
        users.push({username: this.username, password: this.password, id: this.id});
    }
}

// module.exports = model('User', User)
module.exports.User = User;
module.exports.users = users;
