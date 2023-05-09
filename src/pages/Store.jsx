import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { allData } from '../redux/reducers/allProductsSlice'
import { SearchIcon } from '../assets'
import ProductCard from '../components/ProductCard'
// import { useFetchApi } from '../hooks/useFetchApi'


const Store = ({ apiCall }) => {
  const allProductsData = useSelector(allData)  /** Api response object with JSON data from redux state after the api call */
  const { data, loading, error } = allProductsData    /** destructuring the state that comes from redux */

  /** Below commented section is used to make api call using custom hook which runs on every re-render of the component. Which is not very optimal way to handle it. */
  // const fetchedData = useFetchApi('https://leaguex.s3.ap-south-1.amazonaws.com/task/shopping/catalogue.json')
  // const { data, error, loading } = fetchedData

  /** Below using the function that is in the useCallback hook in the parent component will not re-run on every render of this component */
  useEffect(() => {
    apiCall()
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

  const previousProducts = useRef([])

  /** States to check individual filters */
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
      setUpdatedProducts(updatedProducts?.filter(product => product.type === 'Polo'))
      previousProducts.current = updatedProducts
    } else {
      setUpdatedProducts(previousProducts.current)
    }
  }, [poloType])

  useEffect(() => {
    if (hoodieType === true) {
      setUpdatedProducts(updatedProducts?.filter(product => product.type === 'Hoodie'))
      previousProducts.current = updatedProducts
    } else {
      setUpdatedProducts(previousProducts.current)
    }
  }, [hoodieType])

  useEffect(() => {
    if (basicType === true) {
      setUpdatedProducts(updatedProducts?.filter(product => product.type === 'Basic'))
      previousProducts.current = updatedProducts
    } else {
      setUpdatedProducts(previousProducts.current)
    }
  }, [basicType])

  useEffect(() => {
    if (genderMen === true) {
      setUpdatedProducts(updatedProducts?.filter(product => product.gender === 'Men'))
      previousProducts.current = updatedProducts
    } else {
      setUpdatedProducts(previousProducts.current)
    }
  }, [genderMen])

  useEffect(() => {
    if (genderWomen === true) {
      setUpdatedProducts(updatedProducts?.filter(product => product.gender === 'Women'))
      previousProducts.current = updatedProducts
    } else {
      setUpdatedProducts(previousProducts.current)
    }
  }, [genderWomen])

  useEffect(() => {
    if (colorBlack === true) {
      setUpdatedProducts(updatedProducts?.filter(product => product.color === 'Black'))
      previousProducts.current = updatedProducts
    } else {
      setUpdatedProducts(previousProducts.current)
    }
  }, [colorBlack])

  useEffect(() => {
    if (colorBlue === true) {
      setUpdatedProducts(updatedProducts?.filter(product => product.color === 'Blue'))
      previousProducts.current = updatedProducts
    } else {
      setUpdatedProducts(previousProducts.current)
    }
  }, [colorBlue])

  useEffect(() => {
    if (colorGreen === true) {
      setUpdatedProducts(updatedProducts?.filter(product => product.color === 'Green'))
      previousProducts.current = updatedProducts
    } else {
      setUpdatedProducts(previousProducts.current)
    }
  }, [colorGreen])

  useEffect(() => {
    if (colorPink === true) {
      setUpdatedProducts(updatedProducts?.filter(product => product.color === 'Pink'))
      previousProducts.current = updatedProducts
    } else {
      setUpdatedProducts(previousProducts.current)
    }
  }, [colorPink])

  useEffect(() => {
    if (colorGrey === true) {
      setUpdatedProducts(updatedProducts?.filter(product => product.color === 'Grey'))
      previousProducts.current = updatedProducts
    } else {
      setUpdatedProducts(previousProducts.current)
    }
  }, [colorGrey])

  useEffect(() => {
    if (colorRed === true) {
      setUpdatedProducts(updatedProducts?.filter(product => product.color === 'Red'))
      previousProducts.current = updatedProducts
    } else {
      setUpdatedProducts(previousProducts.current)
    }
  }, [colorRed])

  useEffect(() => {
    if (colorPurple === true) {
      setUpdatedProducts(updatedProducts?.filter(product => product.color === 'Purple'))
      previousProducts.current = updatedProducts
    } else {
      setUpdatedProducts(previousProducts.current)
    }
  }, [colorPurple])

  useEffect(() => {
    if (colorWhite === true) {
      setUpdatedProducts(updatedProducts?.filter(product => product.color === 'White'))
      previousProducts.current = updatedProducts
    } else {
      setUpdatedProducts(previousProducts.current)
    }
  }, [colorWhite])

  useEffect(() => {
    if (colorYellow === true) {
      setUpdatedProducts(updatedProducts?.filter(product => product.color === 'Yellow'))
      previousProducts.current = updatedProducts
    } else {
      setUpdatedProducts(previousProducts.current)
    }
  }, [colorYellow])

  useEffect(() => {
    if (priceLessThan250 === true) {
      setUpdatedProducts(updatedProducts?.filter(product => product.price <= 250))
      previousProducts.current = updatedProducts
    } else {
      setUpdatedProducts(previousProducts.current)
    }
  }, [priceLessThan250])

  useEffect(() => {
    if (priceAround450 === true) {
      setUpdatedProducts(updatedProducts?.filter(product => product.price > 250 && product.price <= 450))
      previousProducts.current = updatedProducts
    } else {
      setUpdatedProducts(previousProducts.current)
    }
  }, [priceAround450])

  useEffect(() => {
    if (priceAbove450 === true) {
      setUpdatedProducts(updatedProducts?.filter(product => product.price > 450))
      previousProducts.current = updatedProducts
    } else {
      setUpdatedProducts(previousProducts.current)
    }
  }, [priceAbove450])

  useEffect(() => {
    if (poloType === false && hoodieType === false && basicType === false && genderMen === false && genderWomen === false && colorBlack === false && colorBlue === false && colorGreen === false && colorPink === false && colorRed === false && colorGrey === false && colorPurple === false && colorWhite === false && colorYellow === false && priceLessThan250 === false && priceAround450 === false && priceAbove450 === false) {
      setUpdatedProducts(data)
    }
  }, [poloType, hoodieType, basicType, genderMen, genderWomen, colorBlack, colorBlue, colorGreen, colorPink, colorRed, colorGrey, colorPurple, colorWhite, colorYellow, priceLessThan250, priceAround450, priceAbove450])

  /** state to show the side filters menu in mobile screen */
  const [showFilters, setShowFilters] = useState(false)

  /** Function to clear all the filters */
  const clearAllFilters = () => {
    setPoloType(false)
    setHoodieType(false)
    setBasicType(false)
    setColorBlack(false)
    setColorBlue(false)
    setColorGreen(false)
    setColorGrey(false)
    setColorPink(false)
    setColorPurple(false)
    setColorRed(false)
    setColorWhite(false)
    setColorYellow(false)
    setGenderMen(false)
    setGenderWomen(false)
    setPriceLessThan250(false)
    setPriceAround450(false)
    setPriceAbove450(false)
    document.querySelectorAll('input[type="checkbox"]').forEach(input => input.checked = false)
  }

  return (
    <div className='px-12 flex gap-16 justify-center md:justify-between w-full h-full pb-8 relative'>
      {
        error !== null && loading === false && data === null ?
          <h1 className='font-red-700 text-xl'>{error}</h1> :
          loading === true && data === null && error === null ?
            <div className='flex w-full h-full justify-center items-center text-xl relative'>Loading...</div> :
            loading === false && error === null && data !== null ?
              <>
                <div className={!showFilters ? 'hidden md:grid md:w-2/5 lg:w-1/5 md:border md:mt-24 md:div-shadow md:p-6 md:h-fit gap-2 div-shadow' : 'absolute top-0 p-10 w-full bg-white z-50 transition-opacity'}>
                  {
                    showFilters ? <div className='absolute border bg-black text-white px-4 py-2 top-10 right-10 cursor-pointer z-40' onClick={() => {
                      if (showFilters === true) {
                        setShowFilters(false)
                      }
                    }}>X</div> : null
                  }
                  <div className='flex flex-col gap-2 relative'>
                    <button
                      className={`absolute bg-green-600 top-0 px-3 py-1 text-sm text-white ${!showFilters ? 'right-0' : 'left-20'}`}
                      onClick={clearAllFilters}
                    >Clear All Filters</button>
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
                            if (!genderMen) {
                              setGenderMen(true)
                              setGenderWomen(false)
                            } else {
                              setGenderMen(false)
                            }
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
                            if (!genderWomen) {
                              setGenderWomen(true)
                              setGenderMen(false)
                            } else {
                              setGenderWomen(false)
                            }
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
                        <label htmlFor="rs251-450">Rs251 - Rs450</label>
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