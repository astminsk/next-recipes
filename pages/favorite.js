import React, { useContext } from "react";
import dynamic from 'next/dynamic';
import Layout from "../components/Layout";
import { Store } from "../utils/Store";
import NextLink from "next/link";
import {
  Grid,
  TableContainer,
  Table,
  Typography,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Link,
  Button,
  CardMedia,
} from "@material-ui/core";

  function FavoriteScreen() {
  const { state, dispatch } = useContext(Store);
  const {
    favorite: { favoriteItems },
  } = state;

  const removeItemHandler = (item) => {
    dispatch({type:'FAVORITE_REMOVE_ITEM', payload: item });
  }

  return (
    <Layout title="Любимые рецепты">
      <Typography component="h1" variant="h1">
        Любимые рецепты
      </Typography>
      {favoriteItems.length === 0 ? (
        <div>
          Добавьте рецепт. <NextLink href="/" passHref>
            <Link>Выберите рецепт</Link>
            </NextLink>
        </div>
      ) : (
        <Grid container spacing={1}>
          <Grid item md={12} sx={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Картинка</TableCell>
                    <TableCell>Название</TableCell>
                    <TableCell>Ингредиенты</TableCell>
                    <TableCell>Описание рецепта</TableCell>
                    <TableCell>Время</TableCell>
                    <TableCell>Категория</TableCell>
                    {/* <TableCell align="right">Количество</TableCell> */}
                    <TableCell align="right">Удалить</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {favoriteItems.map((item) => (
                    <TableRow key={item._id}>

                      <TableCell>
                        <NextLink href={`/recipe/${item.slug}`} passHref>
                          <Link>
                            <CardMedia
                              component="img"
                              src={item.image}
                              alt={item.name}
                              width={80}
                              height={80}
                              //layout="responsive"
                            ></CardMedia>
                          </Link>
                        </NextLink>
                      </TableCell>

                      <TableCell>
                        <NextLink href={`/recipe/${item.slug}`} passHref>
                          <Link>
                            <Typography>{item.name}</Typography>
                          </Link>
                        </NextLink>
                      </TableCell>

                      <TableCell>
                            <Typography>{item.ingredients}</Typography>
                      </TableCell>

                      <TableCell>
                            <Typography>{item.description}</Typography>
                      </TableCell>

                      <TableCell align="right">{item.time} мин.</TableCell>

                      <TableCell align="right">{item.category}</TableCell>

                      {/* <TableCell align="right">
                        <Select value={item.quantity}>
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <MenuItem key={x + 1} value={x + 1}>
                              {x + 1}
                            </MenuItem>
                          ))}
                        </Select>
                      </TableCell> */}

                      <TableCell align="right">
                        <Button 
                        variant="contained" 
                        color="secondary"
                        onClick={() => removeItemHandler(item)}
                        >
                          x
                        </Button>
                      </TableCell>
                      
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          {/* <Grid item md={3} xs={12}>
            
          </Grid> */}
        </Grid>
      )}
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(FavoriteScreen), {ssr: false});
