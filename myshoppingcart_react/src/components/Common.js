import React, { useState,useEffect } from 'react';
import { TablePagination } from '@material-ui/core'


const Common = (product) => {
    const pages = [5,10,15]
    const[page,setPage] = useState(0)
    const[rowsPerPage,setRowsPerPage] = useState(pages[page])


    const TblPagination = () => (
        <TablePagination 
            component = "div"
            page = {page}
            rowsPerPageOptions = {pages}
            rowsPerPage = {rowsPerPage}
            count = {product.length}
        />
    )
    return (
       TblPagination
    )
}

export default Common
