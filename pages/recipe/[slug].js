import React, { useContext } from "react";
import NextLink from "next/link";
import {
  Link,
  Grid,
  CardMedia,
  List,
  ListItem,
  Typography,
  Card,
  Button,
} from "@material-ui/core";
import Layout from "../../components/Layout";
import useStyles from "../../utils/styles";
import Recipe from "../../models/Recipe";
import db from "../../utils/db";
import axios from "axios";
import { Store } from '../../utils/Store';
import { useRouter } from 'next/router';

export default function RecipeScreen(props) {
  const router = useRouter();
  const { dispatch } = useContext(Store);
  const {recipe} = props;
  const classes = useStyles();
  if (!recipe) {
    return <div>Рецепт не найден</div>;
  }
  const addToFavoriteHandler = async () => {
    const { data } = await axios.get(`/api/recipes/${recipe._id}`);
    if (data.countInStock <= 0) {
      window.alert('Sorry. Recipe is not found');
      return;
    }
    dispatch({ type: 'FAVORITE_ADD_ITEM', payload: { ...recipe, quantity: 1 } });
    router.push('/favorite');
  }
  return (
    <div>
      <Layout title={recipe.name} description={recipe.description}>
        <div className={classes.section}>
          <NextLink href="/" passHref>
            <Typography>
              <Link>Назад к рецептам</Link>
            </Typography>
          </NextLink>
        </div>
        <Grid container spacing={1}>
          <Grid item md={6} xs={12}>
            <CardMedia
              component="img"
              src={recipe.image}
              alt={recipe.name}
              width={640}
              height={640}
              layout="responsive"
            ></CardMedia>
          </Grid>
          <Grid item md={3} xs={12}>
            <List>
              <ListItem>
                <Typography component="h1" variant="h1 ">
                  {recipe.name}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>{recipe.ingredients}</Typography>
              </ListItem>
              <ListItem>
                <Typography>{recipe.description}</Typography>
              </ListItem>
              <ListItem>
                <Typography>Категория: {recipe.category}</Typography>
              </ListItem>
            </List>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Grid container>
                    <Grid item xs={12}>
                      <Typography>{recipe.time} минут</Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <Typography>
                        Рэйтинг: {recipe.rating} звезды ({recipe.numReviews}{" "}
                        отзывов)
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Button 
                  fullWidth 
                  variant="contained" 
                  color="primary"
                  onClick={addToFavoriteHandler}
                  >
                    Добавить в любимые
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  const {params} = context;
  const {slug} = params;

  await db.connect();
  const recipe = await Recipe.findOne({slug}).lean();
  await db.disconnect();
  return {
    props: {
      recipe: db.convertDocToObj(recipe),
    },
  };
}
