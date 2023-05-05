import { useState, useMemo, useEffect } from 'react'
import { useFetchApi } from '../hooks/useFetchApi'
import { useSelector } from 'react-redux'
import { allData } from '../redux/reducers/allProductsSlice'
import { SearchIcon } from '../assets'
import ProductCard from '../components/ProductCard'


const Store = ({ apiCall }) => {
  console.log("store render")
  const allProductsData = useSelector(allData)  /** Api response object with JSON data from redux state after the api call */
  const { data, loading, error } = allProductsData    /** destructuring the state that comes from redux */

  /** Below commented section is used to make api call using custom hook which runs on every re-render of the component. Which is not very optimal way to handle it. */
  // const fetchedData = useFetchApi('https://leaguex.s3.ap-south-1.amazonaws.com/task/shopping/catalogue.json')
  // const { data, error, loading } = fetchedData

  /** So using the function that is in the useCallback hook in the parent component will not re-run on every render of this component */
  useEffect(() => {
    apiCall()
    console.log("api call happening")
  }, [apiCall])

  /** Assign the data in a new State so if any filter is applied then it can be reassigned as new results in this state */
  const [updatedProducts, setUpdatedProducts] = useState([])
  useEffect(() => {
    /** Assigning the data to the state after fetching from api */
    setUpdatedProducts(data)
  }, [data])

  const [searchQuery, setSearchQuery] = useState('')
  const searchProduct = (e) => {
    e.preventDefault()

    /** Search using free text, if any one is true, result will appear */
    if (searchQuery !== "") {
      const trimmedQuery = searchQuery.trim().split(" ").filter(word => word !== '').join(' ').toLowerCase()
      setUpdatedProducts(data?.filter(product => product.name.toLowerCase() === trimmedQuery || product.type.toLowerCase() === trimmedQuery || product.color.toLowerCase() === trimmedQuery))
    }
  }


  const [poloType, setPoloType] = useState(false)
  const [hoodieType, setHoodieType] = useState(false)
  const [basicType, setBasicType] = useState(false)
  const [genderMen, setGenderMen] = useState(false)
  const [genderWomen, setGenderWomen] = useState(false)
  const [colorBlack, setColorBlack] = useState(false)
  const [colorBlue, setColorBlue] = useState(false)
  const [colorPink, setColorPink] = useState(false)
  const [colorGreen, setColorGreen] = useState(false)
  const [colorRed, setColorRed] = useState(false)
  const [colorGrey, setColorGrey] = useState(false)
  const [colorPurple, setColorPurple] = useState(false)
  const [colorWhite, setColorWhite] = useState(false)
  const [colorYellow, setColorYellow] = useState(false)
  const [priceLessThan250, setPriceLessThan250] = useState(false)
  const [priceAround450, setPriceAround450] = useState(false)
  const [priceAbove450, setPriceAbove450] = useState(false)


  useEffect(() => {
    if (poloType === true) {
      setUpdatedProducts(data?.filter(product => product.type === 'Polo'))
    } else if (hoodieType === true) {
      setUpdatedProducts(data?.filter(product => product.type === 'Hoodie'))
    } else if (basicType === true) {
      setUpdatedProducts(data?.filter(product => product.type === 'Basic'))
    } else if (genderMen === true) {
      setUpdatedProducts(data?.filter(product => product.gender === 'Men'))
    } else if (genderWomen === true) {
      setUpdatedProducts(data?.filter(product => product.gender === 'Women'))
    } else if (colorBlack === true) {
      setUpdatedProducts(data?.filter(product => product.color === 'Black'))
    } else if (colorBlue === true) {
      setUpdatedProducts(data?.filter(product => product.color === 'Blue'))
    } else if (colorGreen === true) {
      setUpdatedProducts(data?.filter(product => product.color === 'Green'))
    } else if (colorPink === true) {
      setUpdatedProducts(data?.filter(product => product.color === 'Pink'))
    } else if (colorGrey === true) {
      setUpdatedProducts(data?.filter(product => product.color === 'Grey'))
    } else if (colorRed === true) {
      setUpdatedProducts(data?.filter(product => product.color === 'Red'))
    } else if (colorPurple === true) {
      setUpdatedProducts(data?.filter(product => product.color === 'Purple'))
    } else if (colorWhite === true) {
      setUpdatedProducts(data?.filter(product => product.color === 'White'))
    } else if (colorYellow === true) {
      setUpdatedProducts(data?.filter(product => product.color === 'Yellow'))
    } else if (priceLessThan250 === true) {
      setUpdatedProducts(data?.filter(product => product.price <= 250))
    } else if (priceAround450 === true) {
      setUpdatedProducts(data?.filter(product => product.price > 250 && product.price <= 450))
    } else if (priceAbove450 === true) {
      setUpdatedProducts(data?.filter(product => product.price > 450))
    } else if (poloType === false || hoodieType === false || basicType === false || genderMen === false || genderWomen === false || colorBlack === false || colorBlue === false || colorGreen === false || colorPink === false || colorRed === false || colorGrey === false || colorPurple === false || colorWhite === false || colorYellow === false || priceLessThan250 === false || priceAround450 === false || priceAbove450 === false) {
      setUpdatedProducts(data)
    }
  }, [poloType, hoodieType, basicType, genderMen, genderWomen, colorBlack, colorBlue, colorGreen, colorPink, colorRed, colorGrey, colorPurple, colorWhite, colorYellow, priceLessThan250, priceAround450, priceAbove450])

  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className='px-12 flex gap-16 justify-center md:justify-between w-full h-full pb-8 relative'>
      {
        error !== null && loading === false && data === null ?
          <h1 className='font-red-700 text-xl'>{error}</h1> :
          loading === true && data === null && error === null ?
            <div className='flex w-full h-full justify-center items-center text-xl relative'>Loading...</div> :
            loading === false && error === null && data !== null ?
              <>
                <div className={!showFilters ? 'hidden md:grid md:w-2/5 lg:w-1/5 md:border md:mt-24 md:div-shadow md:p-6 md:h-fit gap-2 div-shadow' : 'absolute top-0 p-10 w-full bg-white z-50'}>
                  {
                    showFilters ? <div className='absolute border bg-black text-white px-4 py-2 top-10 right-10' onClick={() => {
                      if (showFilters === true) {
                        setShowFilters(false)
                      }
                    }}>X</div> : null
                  }
                  <div className='flex flex-col gap-2'>
                    <h3 className="font-semibold">Color</h3>
                    <div className='grid'>
                      <div className='flex gap-3 px-2'>
                        <input
                          type="checkbox"
                          id="color_black"
                          value={colorBlack}
                          onChange={() => {
                            !colorBlack ? setColorBlack(true) : setColorBlack(false)
                          }}
                        />
                        <label htmlFor="color_black">Black</label>
                      </div>
                      <div className='flex gap-3 px-2'>
                        <input
                          type="checkbox"
                          id="color_blue"
                          value={colorBlue}
                          onChange={() => {
                            !colorBlue ? setColorBlue(true) : setColorBlue(false)
                          }}
                        />
                        <label htmlFor="color_blue">Blue</label>
                      </div>
                      <div className='flex gap-3 px-2'>
                        <input
                          type="checkbox"
                          id="color_pink"
                          value={colorPink}
                          onChange={() => {
                            !colorPink ? setColorPink(true) : setColorPink(false)
                          }}
                        />
                        <label htmlFor="color_pink">Pink</label>
                      </div>
                      <div className='flex gap-3 px-2'>
                        <input
                          type="checkbox"
                          id="color_green"
                          value={colorGreen}
                          onChange={() => {
                            !colorGreen ? setColorGreen(true) : setColorGreen(false)
                          }}
                        />
                        <label htmlFor="color_green">Green</label>
                      </div>
                      <div className='flex gap-3 px-2'>
                        <input
                          type="checkbox"
                          id="color_red"
                          value={colorRed}
                          onChange={() => {
                            !colorRed ? setColorRed(true) : setColorRed(false)
                          }}
                        />
                        <label htmlFor="color_red">Red</label>
                      </div>
                      <div className='flex gap-3 px-2'>
                        <input
                          type="checkbox"
                          id="color_grey"
                          value={colorGrey}
                          onChange={() => {
                            !colorGrey ? setColorGrey(true) : setColorGrey(false)
                          }}
                        />
                        <label htmlFor="color_grey">Grey</label>
                      </div>
                      <div className='flex gap-3 px-2'>
                        <input
                          type="checkbox"
                          id="color_purple"
                          value={colorPurple}
                          onChange={() => {
                            !colorPurple ? setColorPurple(true) : setColorPurple(false)
                          }}
                        />
                        <label htmlFor="color_purple">Purple</label>
                      </div>
                      <div className='flex gap-3 px-2'>
                        <input
                          type="checkbox"
                          id="color_white"
                          value={colorWhite}
                          onChange={() => {
                            !colorWhite ? setColorWhite(true) : setColorWhite(false)
                          }}
                        />
                        <label htmlFor="color_white">White</label>
                      </div>
                      <div className='flex gap-3 px-2'>
                        <input
                          type="checkbox"
                          id="color_yellow"
                          value={colorYellow}
                          onChange={() => {
                            !colorYellow ? setColorYellow(true) : setColorYellow(false)
                          }}
                        />
                        <label htmlFor="color_yellow">Yellow</label>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <h3 className="font-semibold">Gender</h3>
                    <div className='grid'>
                      <div className='flex gap-3 px-2'>
                        <input
                          type="checkbox"
                          id="gender_men"
                          value={genderMen}
                          onChange={() => {
                            !genderMen ? setGenderMen(true) : setGenderMen(false)
                          }}
                        />
                        <label htmlFor="gender_men">Men</label>
                      </div>
                      <div className='flex gap-3 px-2'>
                        <input
                          type="checkbox"
                          id="gender_women"
                          value={genderWomen}
                          onClick={() => {
                            !genderWomen ? setGenderWomen(true) : setGenderWomen(false)
                          }}
                        />
                        <label htmlFor="gender_women">Women</label>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <h3 className="font-semibold">Price</h3>
                    <div className="grid">
                      <div className='flex gap-3 px-2'>
                        <input type="checkbox" id="rs0-250" value={priceLessThan250} onClick={() => {
                          !priceLessThan250 ? setPriceLessThan250(true) : setPriceLessThan250(false)
                        }} />
                        <label htmlFor="rs0-250">0 - Rs250</label>
                      </div>
                      <div className='flex gap-3 px-2'>
                        <input type="checkbox" id="rs251-450" value={priceAround450} onClick={() => {
                          !priceAround450 ? setPriceAround450(true) : setPriceAround450(false)
                        }} />
                        <label htmlFor="rs0-250">Rs251 - Rs450</label>
                      </div>
                      <div className='flex gap-3 px-2'>
                        <input type="checkbox" id="above-rs450" value={priceAbove450} onClick={() => {
                          !priceAbove450 ? setPriceAbove450(true) : setPriceAbove450(false)
                        }} />
                        <label htmlFor="above-rs450">Above Rs450</label>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <h3 className="font-semibold">Type</h3>
                    <div className='grid'>
                      <div className='flex gap-3 px-2'>
                        <input type="checkbox" id='polo_type' value={''} onChange={() => {
                          !poloType ? setPoloType(true) : setPoloType(false)
                        }} />
                        <label htmlFor='polo_type'>Polo</label>
                      </div>
                      <div className='flex gap-3 px-2'>
                        <input type="checkbox" id='hoodie_type' value={''} onChange={() => {
                          !hoodieType ? setHoodieType(true) : setHoodieType(false)
                        }} />
                        <label htmlFor='hoodie_type'>Hoodie</label>
                      </div>
                      <div className='flex gap-3 px-2'>
                        <input type="checkbox" id='basic_type' value={''} onChange={() => {
                          !basicType ? setBasicType(true) : setBasicType(false)
                        }} />
                        <label htmlFor='basic_type'>Basic</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='w-3/4 mt-8'>
                  <div className='flex w-full justify-center gap-4'>
                    <form className='flex w-full justify-center gap-1'>
                      <input
                        type="text"
                        className='border-b-2 focus:outline-0 focus:ring-0 py-2 w-[80%] md:w-[40%]'
                        placeholder='Search for products'
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value)
                        }}
                      />
                      <button className='bg-gray-400 px-4 py-2 rounded' onClick={searchProduct} type='submit'>
                        <SearchIcon />
                      </button>
                    </form>

                    <button className='md:hidden px-4 py-2 rounded bg-gray-400 text-white' onClick={() => {
                      showFilters ? setShowFilters(false) : setShowFilters(true)
                    }}>Filter</button>
                  </div>

                  <div className='w-full mt-6 h-[30rem] flex flex-col lg:flex-row lg:flex-wrap items-start lg:justify-start gap-8'>
                    {
                      updatedProducts?.map((product, index) => {
                        return <div key={index} className='w-full lg:w-[30%]'>
                          <ProductCard product={product} />
                        </div>
                      })
                    }
                  </div>
                </div>
              </>
              : null
      }
    </div>
  )
}

export default Store