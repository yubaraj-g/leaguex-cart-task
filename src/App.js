import { lazy, Suspense, useCallback } from 'react';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Loader from './components/Loader';
import { useDispatch } from 'react-redux'
import { asyncApiCall } from './redux/reducers/allProductsSlice';

/** Implementing lazy loading to improve performance and load pages only when they're called */
const Cart = lazy(() => import('./pages/Cart'));
const Store = lazy(() => import('./pages/Store'));

function App() {
  const dispatch = useDispatch()

  /** Encapsulation of API link for inaccessibility to everyone globally. */
  const apiInformation = {
    apiUrl: 'https://leaguex.s3.ap-south-1.amazonaws.com/task/shopping/catalogue.json'
  }

  /** But below is api call from redux thunk implementation which doesn't call the function every time this component is re-rendered. */
  const apiCall = useCallback(() => {
    dispatch(asyncApiCall(apiInformation.apiUrl))
  }, [])

  return (
    <>
      <section className='w-full h-full flex items-center flex-col'>
        <Navbar />

        {/* Suspense is the react's inbuilt component that takes any component or JSX as fallback prop to show it when any component is being downloaded/loaded. */}
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Store apiCall={apiCall} />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
          </Routes>
        </Suspense>
      </section>
    </>
  );
}

export default App;
