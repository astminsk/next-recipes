import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
    name: {type: String, required: true },
    slug: {type: String, required: true, unique: true },
    category: {type: String, required: true },
    ingredients: {type: String, required: true },
    description: {type: String, required: true },
    image: {type: String, required: true },
    time: {type: Number, required: true, default: 0 },
    rating: {type: Number, required: true, default: 0 },
    numReviews: {type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
},
{
    timestamps: true,
}
);

const Recipe = mongoose.models.Recipe || mongoose.model('Recipe', recipeSchema);
export default Recipe;