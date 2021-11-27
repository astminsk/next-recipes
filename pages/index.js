import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";
import NextLink from "next/link";
import Layout from "../components/Layout";
import Recipe from "../models/Recipe";
import db from "../utils/db";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Store } from "../utils/Store";

export default function Home(props) {
  const router = useRouter();
  const { dispatch } = useContext(Store);
  const {recipes} = props;
  const addToFavoriteHandler = async (recipe) => {
    const { data } = await axios.get(`/api/recipes/${recipe._id}`);
    if (data.countInStock <= 0) {
      window.alert('Sorry. Recipe is not found');
      return;
    }
    dispatch({ type: 'FAVORITE_ADD_ITEM', payload: { ...recipe } }); //, quantity: 1
    router.push('/favorite');
  }
  return (
    <Layout>
      <div>
        <h1>Все рецепты</h1>
        <Grid container spacing={3}>
          {recipes.map((recipe) => (
            <Grid item md={4} key={recipe.name}>
              <Card>
                <NextLink href={`/recipe/${recipe.slug}`} passHref>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={recipe.image}
                      title="recipe.name"
                    ></CardMedia>
                    <CardContent>
                      <Typography>{recipe.name}</Typography>
                    </CardContent>
                  </CardActionArea>
                </NextLink>
                <CardActions>
                  <Typography>
                    {recipe.ingredients}
                    <br />
                    <br />
                    {recipe.description}
                    <br />
                    <br />
                    {recipe.time} минут
                  </Typography>
                </CardActions>
                <Typography>
                  <Button size="small" color="primary"
                    onClick={() => addToFavoriteHandler(recipe)}>
                    Любимые
                  </Button>
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
   
  ); 
}

export async function getServerSideProps() {
  await db.connect();
  const recipes = await Recipe.find({}).lean();
  await db.disconnect();
  return {
    props: {
      recipes: recipes.map(db.convertDocToObj),
    },
  };
}
