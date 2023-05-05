import { memo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addProducts, addedProducts } from '../redux/reducers/addedProductsSlice'

const ProductCard = ({ product }) => {
    const dispatch = useDispatch()
    const { name, imageURL, price, currency, color, gender, quantity } = product
    const addedProductsData = useSelector(addedProducts)

    const addToCart = () => {
        /** In the below function addedProductsData is the array of added elements that are present in redux state. This function will check that all the products that are present in the redux state, and look for the present product in this component, if it exists there then it will take the count of how many products already exists in the redux state array, and give us the count. */
        let alreadyAddedProductsCount = 0
        addedProductsData?.forEach((existingProduct, index) => {
            // "existingProduct" means the product which exists in the Redux state (present in the array of products)
            if (existingProduct.name === name) {
                alreadyAddedProductsCount += 1
            }
        })
        /** After getting the count of the product that already is in the cart (redux state), below if statement will check if the alreadyAddedProductsCount is less than the actual stock count of the product only then add one more product, or else alert that "maximum stock has been added" */
        if (alreadyAddedProductsCount < quantity) {
            dispatch(addProducts(product))
            // alert('Product added to cart')
        } else {
            alert("Maximum stock has been added.")
        }
    }

    return (
        <>
            <div className='w-full h-80 lg:h-64 border div-shadow flex flex-col overflow-hidden p-4 gap-2 relative'>
                <h5 className='absolute top-4 left-4 bg-[#0009] text-white w-[90%] py-2 px-1 font-semibold'>{name}</h5>
                <div className='w-full overflow-hidden border'>
                    <img src={imageURL} alt={name} className='object-cover' />
                </div>
                <div className='flex justify-between items-center'>
                    <h6 className='font-semibold'>Color:&nbsp;{color}</h6>
                    <h6 className='font-semibold'>Gender:&nbsp;{gender}</h6>
                </div>
                <div className='flex justify-between items-center'>
                    <h6 className='font-semibold'>{price}&nbsp;{currency}</h6>
                    <button className='bg-gray-500 hover:bg-gray-600 text-white px-3 py-1' onClick={addToCart}>Add to cart</button>
                </div>
            </div>
        </>
    )
}

export default memo(ProductCard)