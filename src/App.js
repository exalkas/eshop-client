import './App.css';
import {FaFilter} from 'react-icons/fa'
import {RiFilterOffFill} from 'react-icons/ri'
import { useContext, useEffect, useState, useCallback } from 'react';
import HeaderUser from './components/HeaderUser'
import axios from 'axios'
import {AppContext} from './components/Context'
import CardBuyer from './components/CardBuyer'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { baseUrl } from './utils/baseUrl';

function priceLabel(value) {
  return `${value}€`;
}

function App() {
  const {state, dispatchState} = useContext(AppContext)
  const [total, setTotal] = useState(0)

  const [priceRange, setPriceRange] = useState([0, 0])

  const [filter, setFilter] = useState({
    text: '',
    minPrice: 0,
    maxPrice: 0
  })

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {

    const response = await axios.get(baseUrl + '/products/list')
    console.log("🚀 ~ getData ~ response", response)

    if (response.data.success) {

      dispatchState({
      type: 'loadProducts',
      payload: response.data.products
    })

    setTotal(response.data.total)

  }
  }

  const handleLoadMore = async () => {

    const response = await axios.get(baseUrl + '/products/list?skip=' + state.products.length)
      console.log("🚀 ~ getData ~ response", response)

      if (response.data.success) {

        dispatchState({
        type: 'addProducts',
        payload: response.data.products
      })

      setTotal(response.data.total)

    }
  }

  const handleSearch = async() => {

    const response = await axios.post(baseUrl + '/products/search', filter)
    console.log("🚀 ~ response", response)

    if (response.data.success) {

      dispatchState({
      type: 'loadProducts',
      payload: response.data.products
    })

    setTotal(response.data.total)

  }
  }

  const handlePriceRangeChange = (event, newValue) => {
    
    console.log("🚀 ~ newValue", newValue)
    setPriceRange(newValue)
    setFilter({...filter, minPrice: newValue[0], maxPrice: newValue[1]});
  }

  const handleResetFilter = () => {
    setFilter({text: '', minPrice: 0, maxPrice: 0})
    setPriceRange([0,0])
    getData()
  
  }

  console.log("🚀 ~ App ~ state", filter)
  // console.log("🚀 ~ App ~ state", state)

  return (
    <div className='w-full bg-slate-50 min-h-[100vh] py-[20px] flex flex-col items-center justify-start'>
        <HeaderUser/>
      <div className='flex items-top justify-center w-[80%] m-auto'>

        <div className='w-[20%] bg-slate-600 py-[20px] flex flex-col justify-start items-center gap-[20px] text-white'>
          <h5>Filters</h5>
          <input 
            type="text" 
            id="base-input" 
            value={filter.text}
            onChange={(e) => setFilter({...filter, text: e.target.value})}
            placeholder='Search product name'
            className="
              bg-gray-50 
              border 
              border-gray-300 
              text-gray-900 
              text-sm rounded-lg 
              focus:ring-blue-500 
              focus:border-blue-500 
              block 
              w-[80%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " 
            />
            <span>Price range</span>
            <Box sx={{ width: '80%' }}>
              <Slider
                getAriaLabel={() => 'Temperature range'}
                value={priceRange}
                onChange={handlePriceRangeChange}
                valueLabelDisplay="auto"
                getAriaValueText={priceLabel}
              />
            </Box>

            <button 
              onClick={handleSearch}
              type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <FaFilter />
              Apply filter
            </button>
            <button 
              onClick={handleResetFilter}
              type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <RiFilterOffFill />
              Reset filter
            </button>
        </div>

        <div className='flex items-top w-[80%] min-h-[80vh] gap-[20px] flex-wrap p-[20px]'>

        {
          state.products.map(item => <CardBuyer key={item._id} product={item}/>)
        }

      </div>
      </div>
      <div className='flex justify-center'>

        {  
          state.products.length > 0 && 
          state.products.length < total ?

          <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleLoadMore}
            >Load more</button>

            : 'No more products to load'
          }
    </div>
      </div>
  );
}

export default App;
