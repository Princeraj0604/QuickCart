import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {type:String, required:true, unique:true, trim:true},
    slug: {type:String, required:true, unique:true, trim:true, lowercase:true},
    description: {type:String, default:"", trim:true},
    image: {type:String, default:""},
    isActive: {type:Boolean, default:true},
    sortOrder: {type:Number, default:0},
}, {timestamps:true});

const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;