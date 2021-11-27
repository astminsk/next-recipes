import nc from "next-connect";
import Recipe from '../../../models/Recipe'
import db from "../../../utils/db";
 

const handler = nc();

handler.get(async (req, res) => {
    await db.connect();
    const recipe = await Recipe.findById(req.query.id);
    await db.disconnect();
    res.send(recipe);
});

export default handler;