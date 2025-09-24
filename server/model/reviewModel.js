const mongoose = require("mongoose")

const reviewSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    review:{
        type: String,
        required: true
    },
    rating:{
        type: Number,
    },
    reviewedAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("ReviewUs", reviewSchema)