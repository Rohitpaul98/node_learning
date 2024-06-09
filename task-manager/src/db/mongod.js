const mongoose = require('mongoose')

const connectionUrl = process.env.DATABASE_URL;

const hasConnected = mongoose.connect(connectionUrl)

if (hasConnected) {
    console.log("Connected to " + connectionUrl)

}



