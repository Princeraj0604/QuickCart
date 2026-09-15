import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    userId: {type:String, required:true},
    name: {type:String, required:true, trim:true},
    slug: {type:String, required:true, unique:true, trim:true, lowercase:true},
    shortDescription: {type:String, required:true, trim:true},
    description: {type:String, required:true, trim:true},
    category: {type:String, required:true, trim:true},
    subcategory: {type:String, default:"", trim:true},
    price: {type:Number, required:true, min:0},
    offerPrice: {type:Number, required:true, min:0},
    images: {type:[String], required:true},
    ingredients: {type:[String], default:[]},
    allergens: {type:[String], default:[]},
    packSize: {type:String, default:"", trim:true},
    shelfLife: {type:String, default:"", trim:true},
    storageInstructions: {type:String, default:"", trim:true},
    rating: {type:Number, default:0, min:0, max:5},
    reviewCount: {type:Number, default:0, min:0},
    tags: {type:[String], default:[]},
    featured: {type:Boolean, default:false},
    bestSeller: {type:Boolean, default:false},
    newArrival: {type:Boolean, default:true},
    isActive: {type:Boolean, default:true},
    date: {type:Number, default:Date.now},
}, {timestamps:true});

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;