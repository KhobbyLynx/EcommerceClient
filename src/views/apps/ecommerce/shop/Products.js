// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** Product components
import ProductCards from './ProductCards'
import ProductsHeader from './ProductsHeader'
import ProductsSearchbar from './ProductsSearchbar'

// ** Third Party Components
import classnames from 'classnames'

// ** Reactstrap Imports
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'

const ProductsPage = (props) => {
  // ** Props
  const {
    store,
    dispatch,
    addToCart,
    activeView,
    sidebarOpen,
    getProducts,
    getCartItems,
    addToWishlist,
    setActiveView,
    deleteCartItem,
    setSidebarOpen,
    deleteWishlistItem,
  } = props

  // ** States
  const [paginatedData, setPaginatedData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  // ** Custom Pagination from ReconX
  const itemsData = store.products

  // Calculate the start and end index of the current page's data
  const pageSize = 9

  const maxPaginationButtons = 10

  useEffect(() => {
    // Calculate totalPages based on the totalItems and pageSize
    setTotalPages(Math.ceil(itemsData.length / pageSize))

    // Update paginatedData whenever data or currentPage changes
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    if (startIndex < itemsData.length) {
      setPaginatedData(itemsData.slice(startIndex, endIndex))
    }
  }, [itemsData, currentPage])

  // Define the handlePageChange function
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const renderPaginationButtons = () => {
    let startPage = Math.max(
      1,
      currentPage - Math.floor(maxPaginationButtons / 2)
    )
    const endPage = Math.min(totalPages, startPage + maxPaginationButtons - 1)

    if (endPage - startPage < maxPaginationButtons - 1) {
      startPage = Math.max(1, endPage - maxPaginationButtons + 1)
    }

    const buttons = []

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <PaginationItem active={i === currentPage} key={i}>
          <PaginationLink href='#' onClick={() => onPageChange(i)}>
            {i}
          </PaginationLink>
        </PaginationItem>
      )
    }

    return buttons
  }

  return (
    <div className='content-detached content-right'>
      <div className='content-body'>
        <ProductsHeader
          store={store}
          dispatch={dispatch}
          activeView={activeView}
          getProducts={getProducts}
          setActiveView={setActiveView}
          setSidebarOpen={setSidebarOpen}
        />
        <div
          className={classnames('body-content-overlay', {
            show: sidebarOpen,
          })}
          onClick={() => setSidebarOpen(false)}
        ></div>
        <ProductsSearchbar
          dispatch={dispatch}
          getProducts={getProducts}
          store={store}
        />
        {store.products.length ? (
          <Fragment>
            <ProductCards
              store={store}
              dispatch={dispatch}
              addToCart={addToCart}
              activeView={activeView}
              products={paginatedData}
              getProducts={getProducts}
              getCartItems={getCartItems}
              addToWishlist={addToWishlist}
              deleteCartItem={deleteCartItem}
              deleteWishlistItem={deleteWishlistItem}
            />

            <Pagination className='d-flex justify-content-center ecommerce-shop-pagination mt-2'>
              {/* Uncomment to activate First Pagination Button */}
              {/* <PaginationItem
                disabled={currentPage === 1}
                className='prev-item'
              >
                <PaginationLink
                  href='#'
                  onClick={() => onPageChange(1)}
                ></PaginationLink>
              </PaginationItem> */}

              {/* Previous Pagination Button - disabled if currentPage === 1 */}
              <PaginationItem
                disabled={currentPage === 1}
                className='prev-item'
              >
                <PaginationLink
                  href='#'
                  onClick={() => onPageChange(currentPage - 1)}
                />
              </PaginationItem>

              {/* All Pagination Buttons */}
              {renderPaginationButtons()}

              {/* Next Pagination Button */}
              <PaginationItem
                disabled={currentPage === totalPages}
                className='next-item'
              >
                <PaginationLink
                  href='#'
                  onClick={() => onPageChange(totalPages)}
                />
              </PaginationItem>

              {/* Uncomment to render Last Page Button */}
              {/* <PaginationItem
                disabled={currentPage === 1}
                className='next-item'
              >
                <PaginationLink
                  href='#'
                  onClick={() => onPageChange(1)}
                ></PaginationLink>
              </PaginationItem> */}
            </Pagination>
          </Fragment>
        ) : (
          <div className='d-flex justify-content-center mt-2'>
            <p>No Results</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductsPage
