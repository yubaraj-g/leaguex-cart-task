import { memo } from 'react'

const Loader = () => {
  return (
    <div className='m-auto flex w-full h-full justify-center items-center text-xl'>Loading...</div>
  )
}

export default memo(Loader)