import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { typesProducto } from '../types'
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ProductComponent from './ProductComponent';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const PerfilComponent = (props) => {

  let listaDeseos

// columnas de la tabla de la lista de deseos
  const columns = [
    {
      field: typesProducto.id,
      headerName: 'ID',
      width: 100
    },
    {
      field: typesProducto.nombre,
      headerName: 'Nombre',
      width: 300,
    },
    {
      field: typesProducto.precio,
      headerName: 'Precio',
      type: 'number',
      width: 300,
      valueGetter: (params) => `$${params.row.precio}`,
    },
    {
      field: typesProducto.descripcion,
      headerName: 'Descripción',
      sortable: false,
      width: 500,
    },
  ]; 

// estados y manejadores de modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [items, setItems] = useState([])
  const [detailsProduct, setDetailsProduct] = useState(typesProducto)

  // obtiene la lista de elementos de lista de deseos y los envia al estado Item
  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem('listaDeseos')) || [])
    return () => {
      setItems([])
    }
  }, [])

  // carga detalles del producto a la ventana modal y apertura de la misma
  const detallesProducto = (detailsRow)=> {
    setDetailsProduct(detailsRow.row)
    console.log('detailsRow: ', detailsRow.row)
    handleOpen()
  }

  // elimina el item de la lista de deseos y actualiza estado en el localstorage
  const quitarListaDeseos = (itemDelete) => {
    listaDeseos = (JSON.parse(localStorage.getItem('listaDeseos')) || [])
      let newlistaDeseos = listaDeseos.filter((item)=>{return item.id !== itemDelete.id })    
      // en caso de quedar vacia la lista de deseos se elimina elemento del localstorage y se cierra ventana modal, actualiza items de la tabla
      if(newlistaDeseos!==undefined){
        localStorage.setItem('listaDeseos', JSON.stringify(newlistaDeseos))
      }
      else {
        localStorage.removeItem('listaDeseos')
      }
      setItems(newlistaDeseos)
      handleClose()
      alert('Producto eliminado de la lista de deseos')
  }
  return (
    <>
      <Typography gutterBottom variant="h3" component="div">
        Detalles de la lista de deseos
      </Typography>
      <div className='container' style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={items}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          onRowDoubleClick={(rowDetails)=>detallesProducto(rowDetails)}
        />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Detalles del producto
          </Typography>
          <ProductComponent item={detailsProduct} quitarListaDeseos={quitarListaDeseos} className='col-12 my-2 mx-2 containerProduct' />
        </Box>
      </Modal>

    </>
  )
}

export default PerfilComponent
