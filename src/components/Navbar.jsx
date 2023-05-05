import { useState, memo } from 'react'
import CartDiv from './CartDiv'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const [showStore, setShowStore] = useState(true)
    const [showCart, setShowCart] = useState(false)
    const switchStoreCart = (param) => {
        if (param === "store") {
            setShowStore(true)
            setShowCart(false)
        } else if (param === "cart") {
            setShowStore(false)
            setShowCart(true)
        }
    }

    return (
        <nav className='w-full h-fit flex bg-gray-200 justify-between items-center font-semibold px-12 py-4'>
            <Link to='/' onClick={() => switchStoreCart("store")}>TeeRex Store</Link>

            <ul className="flex gap-6 items-center">
                {/* first li will disappear as given in the UI, when the screen hits 768px and below */}
                <li onClick={() => switchStoreCart("store")}>
                    <Link to='/' className='w-full flex flex-col'>
                        Products
                        {/* The black line below the text appears if Store page is being shown */}
                        <div className={`h-[1px] w-[70%] ${showStore === true ? 'bg-black' : ''}`}></div>
                    </Link>
                </li>
                <li onClick={() => switchStoreCart("cart")}>
                    <Link to='/cart'>
                        {
                            /** cart icon will appear only while we're in the store page and when navigated to cart page, cart icon will disappear and show the text as "Shopping Cart" along with black line below the text */
                            showCart === false ?
                                <CartDiv />
                                : <div className='w-full flex flex-col'>
                                    Shopping Cart
                                    <div className={`h-[1px] w-[70%] bg-black`}></div>
                                </div>
                        }
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default memo(Navbar)