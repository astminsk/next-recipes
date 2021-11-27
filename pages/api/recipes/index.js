import nc from "next-connect";
import Recipe from '../../../models/Recipe'
import db from "../../../utils/db";
 

const handler = nc();

handler.get(async (req, res) => {
    await db.connect();
    const recipes = await Recipe.find({});
    await db.disconnect();
    res.send(recipes);
});

export default handler;

