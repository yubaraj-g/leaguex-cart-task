import { memo } from 'react'
import { useSelector } from 'react-redux'
import { CartIcon } from '../assets'
import { addedProducts } from '../redux/reducers/addedProductsSlice'

const CartDiv = () => {
    const allCartProducts = useSelector(addedProducts)

    return (
        <div className='flex relative rounded bg-gray-300 py-2 px-3 shadow-md shadow-gray-400 cursor-pointer'>
            <div className='absolute -top-1 right-1'>{allCartProducts.length}</div>
            <CartIcon />
        </div>
    )
}

export default memo(CartDiv)