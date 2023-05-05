import { useState, useEffect } from 'react'

export const useFetchApi = (api) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)
    /** Checking if it's being called upon every re-render */
    console.log('I am running')

    const asyncApiCall = async (url) => {
        setLoading(true)
        try {
            const response = await fetch(url)
            const jsonData = await response.json()
            setData(jsonData)
            setLoading(false)
        } catch (err) {
            setLoading(false)
            setData(null)
            setError(err)
        }
    }

    useEffect(() => {
        asyncApiCall(api)
    }, [])

    return { data, loading, error }
}