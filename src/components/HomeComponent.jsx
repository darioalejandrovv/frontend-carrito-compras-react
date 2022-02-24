import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { URLBACKEND } from '../types'
import ProductComponent from './ProductComponent'

const HomeComponent = () => {

  let carrito, listaDeseos

  const [productos, setProductos] = useState([])

  const obtenerProductos = async () => {
    const response = await axios.get(`${URLBACKEND}/productos`)
    console.log('response: ', response)
    setProductos(response.data)
  }

  const verificacionExistenciaProducto = (arrayItems, item) => {
    let valueReturn
    arrayItems.map((itemOnArray) => {
      if (itemOnArray.id === item.id) {
        valueReturn = true
      }
      else {
        valueReturn = false
      }
    })
    return valueReturn

  }

  const agregarCarrito = (item) => {
    carrito = (JSON.parse(localStorage.getItem('carrito')) || [])
    //En caso de contener productos el carrito se verifica si previamente ya había sido agregado dicho producto
    if (verificacionExistenciaProducto(carrito, item) === true) {
      alert('El producto ya fue agregado previamente al carrito ')
    }
    //Si el carrito está vacio agrega el producto
    else {
      console.log('itemToAdd:', item)
      carrito.push(item)
      localStorage.setItem('carrito', JSON.stringify(carrito))
      alert('Producto agregado al carrito')
    }
  }

  const agregarListaDeseos = (item) => {
    listaDeseos = (JSON.parse(localStorage.getItem('listaDeseos')) || [])
    //En caso de contener items similares la lista de deseos se verifica si previamente ya había sido agregado dicho producto
    if (verificacionExistenciaProducto(listaDeseos, item) === true) {
      alert('El producto ya fue agregado previamente a la lista de deseos ')
    }
    //Si el carrito está vacio agrega el producto
    else {
      console.log('itemToAddwishList:', item)
      listaDeseos.push(item)
      localStorage.setItem('listaDeseos', JSON.stringify(listaDeseos))
      alert('Producto agregado a la lista de deseos')
    }
  }

  useEffect(() => {
    obtenerProductos()
    return () => {
      setProductos([])
    }
  }, [])

  return (
    <div className="container">
      <div className="row justify-content-around align-items-center">
        {productos.map((item, i) => {
          return <ProductComponent className='col-5 my-2 mx-2 containerProduct' key={i} item={item} agregarListaDeseos={agregarListaDeseos} agregarCarrito={agregarCarrito} />
        })
        }
      </div>
    </div>
  )
}

export default HomeComponent