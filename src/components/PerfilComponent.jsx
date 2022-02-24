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

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [items, setItems] = useState([])
  const [detailsProduct, setDetailsProduct] = useState(typesProducto)


  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem('listaDeseos')) || [])
    return () => {
      setItems([])
    }
  }, [])


  const detallesProducto = (detailsRow)=> {
    setDetailsProduct(detailsRow.row)
    console.log('detailsRow: ', detailsRow.row)
    handleOpen()
  }
  const quitarListaDeseos = (itemDelete) => {
    listaDeseos = (JSON.parse(localStorage.getItem('listaDeseos')) || [])
      let newlistaDeseos = listaDeseos.filter((item)=>{return item.id !== itemDelete.id })    
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
