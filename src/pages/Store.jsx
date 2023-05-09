import { useState, useEffect, memo } from 'react'
import { useSelector } from 'react-redux'
import { allData } from '../redux/reducers/allProductsSlice'
import { SearchIcon } from '../assets'
import ProductCard from '../components/ProductCard'
// import { useFetchApi } from '../hooks/useFetchApi'


const Store = ({ apiCall }) => {
  console.log('store re-render')
  const allProductsData = useSelector(allData)  /** Api response object with JSON data from redux state after the api call */
  const { data, loading, error } = allProductsData    /** destructuring the state that comes from redux */

  /** state to show all products when true, if false program should show the filtered results */
  const [showAllProducts, setShowAllProducts] = useState(false)

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

  /** Assign the data in a new State so if any filter is applied then it can be reassigned as new results in this state */
  const [updatedProducts, setUpdatedProducts] = useState([])
  /** state to get the search query */
  const [searchQuery, setSearchQuery] = useState('')
  /** State to store filtered products */
  const [finalFiltered, setFinalFiltered] = useState([])


  /** Below commented section is used to make api call using custom hook which runs on every re-render of the component. Which is not very optimal way to handle it. */
  // const fetchedData = useFetchApi('https://leaguex.s3.ap-south-1.amazonaws.com/task/shopping/catalogue.json')
  // const { data, error, loading } = fetchedData

  /** Below using the function that is in the useCallback hook in the parent component will not re-run on every render of this component */
  useEffect(() => {
    apiCall()
  }, [apiCall])

  useEffect(() => {
    /** Assigning the data to the state after fetching from api */
    setUpdatedProducts(data)
    /** setting show all data to true so that it renders all data in the screen instead of filtered data */
    setShowAllProducts(true)
  }, [data])

  const searchProduct = (e) => {
    e.preventDefault()
    /** Search using free text, if any one is true, result will appear */
    if (searchQuery !== "") {
      const trimmedQuery = searchQuery.trim().split(" ").filter(word => word !== '').join(' ').toLowerCase()
      setUpdatedProducts(data?.filter(product => product.name.toLowerCase() === trimmedQuery || product.type.toLowerCase() === trimmedQuery || product.color.toLowerCase() === trimmedQuery))
    }
  }

  /** resetting the updated products data to default when states are cleared or checked out */
  useEffect(() => {
    if (poloType === false && hoodieType === false && basicType === false && genderMen === false && genderWomen === false && colorBlack === false && colorBlue === false && colorGreen === false && colorPink === false && colorRed === false && colorGrey === false && colorPurple === false && colorWhite === false && colorYellow === false && priceLessThan250 === false && priceAround450 === false && priceAbove450 === false) {
      setUpdatedProducts(data)
    }
  }, [poloType, hoodieType, basicType, genderMen, genderWomen, colorBlack, colorBlue, colorGreen, colorPink, colorRed, colorGrey, colorPurple, colorWhite, colorYellow, priceLessThan250, priceAround450, priceAbove450])

  /** state to store all the filteration properties */
  const [filterObject, setFilterObject] = useState({
    color: [],
    gender: [],
    type: [],
    price: []
  })

  /** defining filter function to apply filteration feature */
  const filterFunction = () => {
    /** setting showAllProducts  state to false to hide all products and show the filtered products */
    setShowAllProducts(false)
    /** taking all the filter arrays in one single array */
    const filterArray = Object.values(filterObject).filter(array => array.length > 0)
    /** below variable will be re-assigned later */
    let filteredProducts = updatedProducts

    filterArray.forEach(array => {
      /** finalData is the array to hold all the products after filters have been applied */
      let finalData = []
      /** below property indicates the filter that has been selected */
      array.forEach(property => {
        if (typeof property === 'number') {
          if (property === 250) {
            filteredProducts.forEach(product => {
              if (product.price <= property) {
                finalData.push(product)
              }
            })
          } else if (property === 450) {
            filteredProducts.forEach(product => {
              if (product.price > 250 && product.price < property) {
                finalData.push(product)
              }
            })
          } else if (property === 451) {
            filteredProducts.forEach(product => {
              if (product.price > 450) {
                finalData.push(product)
              }
            })
          }
        } else {
          filteredProducts.forEach(product => {
            if (product.color === property || product.gender === property || product.type === property) {
              finalData.push(product)
            }
          })
        }
      })
      filteredProducts = finalData
    })
    setFinalFiltered(filteredProducts)
  }
  /** Call the filter function as soon as any filter is being applied */
  useEffect(() => {
    filterFunction()
  }, [filterObject])

  /** one generic function for selcecting/toggling any color */
  const onChangeColor = (state, setState, value) => {
    if (!state) {
      setState(true)
      if (filterObject.color.includes(value) === false) {
        setFilterObject({ ...filterObject, color: [...filterObject.color, value] })
      }
    } else {
      setState(false)
      if (filterObject.color.includes(value) === true) {
        const removedColor = filterObject.color.filter(color => color !== value)
        setFilterObject({ ...filterObject, color: removedColor })
      }
    }
  }
  /** one generic function for selecting/toggling any gender */
  const onChangeGender = (state, setState, value) => {
    if (!state) {
      setState(true)
      if (filterObject.gender.includes(value) === false) {
        setFilterObject({ ...filterObject, gender: [...filterObject.gender, value] })
      }
    } else {
      setState(false)
      if (filterObject.gender.includes(value) === true) {
        const removedGender = filterObject.gender.filter(color => color !== value)
        setFilterObject({ ...filterObject, gender: removedGender })
      }
    }
  }
  /** one generic function for selecting/toggling any type */
  const onChangeType = (state, setState, value) => {
    if (!state) {
      setState(true)
      if (filterObject.type.includes(value) === false) {
        setFilterObject({ ...filterObject, type: [...filterObject.type, value] })
      }
    } else {
      setState(false)
      if (filterObject.type.includes(value) === true) {
        const removedType = filterObject.type.filter(color => color !== value)
        setFilterObject({ ...filterObject, type: removedType })
      }
    }
  }
  /** one generic function for selecting/toggling any price */
  const onChangePrice = (state, setState, value) => {
    if (!state) {
      setState(true)
      if (filterObject.price.includes(value) === false) {
        setFilterObject({ ...filterObject, price: [...filterObject.price, value] })
      }
    } else {
      setState(false)
      if (filterObject.price.includes(value) === true) {
        const removedPrice = filterObject.price.filter(color => color !== value)
        setFilterObject({ ...filterObject, price: removedPrice })
      }
    }
  }

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
    setFilterObject({
      color: [],
      gender: [],
      type: [],
      price: []
    })
  }

  return (
    <div className='px-12 flex gap-16 justify-center md:justify-between w-full h-full pb-8 relative'>
      {
        error !== null && loading === false && data === null ?
        // Showing error state here
          <h1 className='font-red-700 text-xl'>{error}</h1> :
          loading === true && data === null && error === null ?
          // showing loading state here
            <div className='flex w-full h-full justify-center items-center text-xl relative'>Loading...</div> :
            loading === false && error === null && data !== null ?
            // showing all filters and data
              <>
              {/* sidebar with filters here */}
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
                            onChangeColor(colorBlack, setColorBlack, 'Black')
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
                            onChangeColor(colorBlue, setColorBlue, 'Blue')
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
                            onChangeColor(colorPink, setColorPink, 'Pink')
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
                            onChangeColor(colorGreen, setColorGreen, 'Green')
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
                            onChangeColor(colorRed, setColorRed, 'Red')
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
                            onChangeColor(colorGrey, setColorGrey, 'Grey')
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
                            onChangeColor(colorPurple, setColorPurple, 'Purple')
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
                            onChangeColor(colorWhite, setColorWhite, 'White')
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
                            onChangeColor(colorYellow, setColorYellow, 'Yellow')
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
                            onChangeGender(genderMen, setGenderMen, 'Men')
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
                            onChangeGender(genderWomen, setGenderWomen, 'Women')
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
                          onChangePrice(priceLessThan250, setPriceLessThan250, 250)
                        }} />
                        <label htmlFor="rs0-250">0 - Rs250</label>
                      </div>
                      <div className='flex gap-3 px-2'>
                        <input type="checkbox" id="rs251-450" value={priceAround450} onClick={() => {
                          onChangePrice(priceAround450, setPriceAround450, 450)
                        }} />
                        <label htmlFor="rs251-450">Rs251 - Rs450</label>
                      </div>
                      <div className='flex gap-3 px-2'>
                        <input type="checkbox" id="above-rs450" value={priceAbove450} onClick={() => {
                          onChangePrice(priceAbove450, setPriceAbove450, 451)
                        }} />
                        <label htmlFor="above-rs450">Above Rs450</label>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <h3 className="font-semibold">Type</h3>
                    <div className='grid'>
                      <div className='flex gap-3 px-2'>
                        <input type="checkbox" id='polo_type' value={poloType} onChange={() => {
                          onChangeType(poloType, setPoloType, 'Polo')
                        }} />
                        <label htmlFor='polo_type'>Polo</label>
                      </div>
                      <div className='flex gap-3 px-2'>
                        <input type="checkbox" id='hoodie_type' value={hoodieType} onChange={() => {
                          onChangeType(hoodieType, setHoodieType, 'Hoodie')
                        }} />
                        <label htmlFor='hoodie_type'>Hoodie</label>
                      </div>
                      <div className='flex gap-3 px-2'>
                        <input type="checkbox" id='basic_type' value={basicType} onChange={() => {
                          onChangeType(basicType, setBasicType, 'Basic')
                        }} />
                        <label htmlFor='basic_type'>Basic</label>
                      </div>
                    </div>
                  </div>
                </div>
                {/* filter sidebar ends */}

                <div className='w-3/4 mt-8'>
                  <div className='flex w-full justify-center gap-4'>
                    {/* search bar here */}
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
                      {/* showing filters button for small screens */}
                    <button className='md:hidden px-4 py-2 rounded bg-gray-400 text-white' onClick={() => {
                      showFilters ? setShowFilters(false) : setShowFilters(true)
                    }}>Filter</button>
                  </div>

                  <div className='w-full mt-6 h-[30rem] flex flex-col lg:flex-row lg:flex-wrap items-start lg:justify-start gap-8'>
                    {
                      /** if showAllProducts is true show all the products, else show filtered products. If filtered product is not available show 'Out of stock' */
                      showAllProducts ? updatedProducts?.map((product, index) => {
                        return <div key={index} className='w-full lg:w-[30%]'>
                          <ProductCard product={product} />
                        </div>
                      }) :
                      showAllProducts === false && finalFiltered.length > 0 ?
                          finalFiltered?.map((product, index) => {
                            return <div key={index} className='w-full lg:w-[30%]'>
                              <ProductCard product={product} />
                            </div>
                          }) :
                          <div className='w-full text-center text-lg text-red-600 font-bold'>Sorry we are out of stock!</div>
                    }
                  </div>
                </div>
              </>
              : null
      }
    </div>
  )
}

export default memo(Store)