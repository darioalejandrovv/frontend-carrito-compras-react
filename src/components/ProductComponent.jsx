import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
const ProductComponent = (props) => {
    return (
        <Card className={props.className}>
            <CardMedia
                component="img"
                alt="product colores"
                height="140"
                image={`${props.item.urlImagen}`}
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {props.item.nombre}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.item.descripcion}
                </Typography>
            </CardContent>
            <CardActions>
                {/* dependendiendo de las funciones pasadas al componente mediante props, este renderiza los botones que ejecutan funciones sobre dicho componente */}
                {
                    props.agregarListaDeseos
                        ? (<IconButton aria-label="Agregar a lista de deseos" onClick={() => props.agregarListaDeseos(props.item)}>
                            <FavoriteIcon />
                        </IconButton>)
                        : null
                }
                {
                    props.agregarCarrito
                        ? (<IconButton aria-label="Agregar al Carrito de compras" onClick={() => props.agregarCarrito(props.item)}>
                            <AddShoppingCartIcon />
                        </IconButton>)
                        : null
                }
                {props.quitarListaDeseos
                    ? (<IconButton aria-label="Quitar de lista de deseos" onClick={() => props.quitarListaDeseos(props.item)}>
                        <DeleteIcon />
                    </IconButton>)
                    : null
                }
                {
                    props.quitarCarrito
                        ? (<IconButton aria-label="Quitar del Carrito de compras" onClick={() => props.quitarCarrito(props.item)}>
                            <DeleteIcon />
                        </IconButton>)
                        : null
                }


            </CardActions>
        </Card>
    )
}

export default ProductComponent




