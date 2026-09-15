import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },

    userId: {
        type: String,
        required: true
    },

    userName: {
        type: String,
        required: true,
        trim: true
    },

    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },

    comment: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500
    }
}, {
    timestamps: true
});

reviewSchema.index(
    { productId: 1, userId: 1 },
    { unique: true }
);

const Review =
    mongoose.models.Review ||
    mongoose.model("Review", reviewSchema);

export default Review;