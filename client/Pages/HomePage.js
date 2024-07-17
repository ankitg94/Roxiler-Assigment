import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "../HomePage.css"

const HomePage = () => {
    const [allData, setAllData] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    const handleSearch = async (e) => {
        const query = e.target.value
        setSearchQuery(query)

        if (query) {
            try {
                const { data } = await axios.get(`/api/v1/data/search/${query}`)
                if (data?.success) {
                    setSearchResults(data.result)
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            setSearchResults([])
        }
    }

    const GetAllData = async () => {
        try {
            const { data } = await axios.get('/api/v1/data/get-data')
            if (data?.success) {
                setAllData(data.GetData)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        GetAllData()
    }, [])

    const displayedData = searchQuery ? searchResults : allData
//Pagination concept start 
    const totalPages = Math.ceil(displayedData.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginatedData = displayedData.slice(startIndex, endIndex)

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    return (
        <>
            <h1>Roxiler Assignment</h1>
            <input
                value={searchQuery}
                onChange={handleSearch}
                placeholder='Search your Product'
            />
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Price</th>
                            <th scope="col">Category</th>
                            <th scope="col">Date</th>
                            <th scope="col">Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((c) => (
                            <tr key={c.id}>
                                <td>{c.id}</td>
                                <td>{c.price}</td>
                                <td>{c.category}</td>
                                <td>{c.dateOfSale}</td>
                                <td>{c.title}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination">
                    <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
                </div>
            </div>
        </>
    )
}

export default HomePage


