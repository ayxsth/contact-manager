const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, () => {
    console.log("🔗 Connected to MongoDB 😉");
});
