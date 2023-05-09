import { useEffect, useState, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addProducts, addedProducts, deleteWholeProduct, removeProducts } from '../redux/reducers/addedProductsSlice'

const Cart = () => {
  const dispatch = useDispatch()
  const allCartProducts = useSelector(addedProducts)
  const [nonDuplicatedProducts, setNonDuplicatedProducts] = useState([])

  useEffect(() => {
    /** Below adding all the products to a Set, to remove duplicates so that a product doesn't appear repeatedly in the cart list, and it's necessary to Stringify the products since they are objects and Set won't be able to check if they are identical or not. Later we are using JSON.parse to use them again as objects */
    const noDuplicates = new Set()
    allCartProducts?.forEach(product => {
      noDuplicates.add(JSON.stringify(product))
    })
    /** Taking the Set and sending it to the nonDuplicatedProducts state as an array */
    setNonDuplicatedProducts([...noDuplicates])
  }, [allCartProducts])

  return (
    <div className='px-12 py-8 flex flex-col w-full gap-4' id='shopping_cart'>
      <div className='flex justify-between w-full'>
        <h3>Shopping Cart</h3>
        <span className='px-4 py-2 bg-gray-200 text-lg font-bold'>Total Products Added {allCartProducts.length}</span>
      </div>
      <div className='w-full px-32 flex flex-col gap-3'>
        {
          nonDuplicatedProducts?.map((product, index) => {
            const productObject = JSON.parse(product)
            const { imageURL, name, price, currency, quantity, gender } = productObject
            /** Below is the function to get the array of each item that exists in the cart for multiple times */
            const currentProductCount = allCartProducts.filter(item => {
              if (item.name === name && item.price === price && item.gender === gender && item.quantity === quantity) {
                return item
              }
            })

            const addOneItem = () => {
              /** if the product we are sending to redux (adding to cart) exists then check how many of it is there, if the count is less than maximum quantity it has only then add one of it more to the cart otherwise show an alert of "Maximum Quantity Added" */
              if (allCartProducts?.filter(product => JSON.stringify(product) === JSON.stringify(productObject)).length < quantity) {
                dispatch(addProducts(productObject))
              } else {
                alert('Maximum quantity added.')
              }
            }
            const removeOneItem = () => {
              dispatch(removeProducts(productObject))
            }

            return <div className='flex gap-6 border p-4 items-center' key={index}>
              <div className='w-24'>
                <img src={imageURL} alt={name} className='w-full object-cover' />
              </div>
              <div className='flex flex-col font-bold justify-center gap-2'>
                <h5>{name}</h5>
                <h6>{`${currency} ${price}`}</h6>
              </div>
              <div className='flex gap-2 items-center'>
                <button onClick={removeOneItem}
                  className='bg-gray-100 px-2 py-1 rounded'>-</button>
                <span>{currentProductCount.length}</span>
                <button onClick={addOneItem}
                  className='bg-gray-100 px-2 py-1 rounded'>+</button>
              </div>
              <button
                className='bg-white w-fit h-fit px-3 py-1 border border-red-500 text-red-600 rounded'
                onClick={() => {
                  dispatch(deleteWholeProduct(productObject))
                }}
              >Delete
              </button>
              <span>{`Max quantity of this item is ${quantity}`}</span>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default memo(Cart)