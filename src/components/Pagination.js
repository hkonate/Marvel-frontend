import { useState } from 'react'
const Pagination = ({ data, setNumberOfDataToSkip, numberOfDataToSkip }) => {
    const [pagesMinPerPageLimit, setMinPagesPerPageLimit] = useState(0)
    const [pagesMaxPerPageLimit, setMaxPagesPerPageLimit] = useState(5)
    const [currentPage, setCurrentPage] = useState(1)
    const pagesNumber = Math.ceil(data.count / data.limit);

    const pagesPerPage = 5;
    let arrayOfPages = [];
    for (let i = 0; i < pagesNumber; i++) {
        arrayOfPages[i] = i + 1;
    }

    return (
        <div className="page-char">
            <div>
                {currentPage !== arrayOfPages[0] &&

                    <>
                        <a href='#logo' onClick={() => {
                            setNumberOfDataToSkip(numberOfDataToSkip - 100)
                            if (currentPage - 1 === pagesMinPerPageLimit) {
                                setMinPagesPerPageLimit(pagesMinPerPageLimit - pagesPerPage)
                                setMaxPagesPerPageLimit(pagesMaxPerPageLimit - pagesPerPage)
                            }
                            setCurrentPage(currentPage - 1)
                        }}>&#60;
                        </a>
                        {
                            pagesMinPerPageLimit >= pagesPerPage &&
                            <>
                                <a href='#logo' className='pagination-left' onClick={() => {
                                    setCurrentPage(arrayOfPages[0])
                                    setNumberOfDataToSkip(arrayOfPages[0] - 1)
                                    setMaxPagesPerPageLimit(pagesPerPage)
                                    setMinPagesPerPageLimit(arrayOfPages[0] - 1)

                                }}>{arrayOfPages[0]}</a>

                                <a href='#logo' onClick={() => {

                                    if ((currentPage - 50) >= arrayOfPages[0]) {
                                        setCurrentPage(currentPage - 50)
                                        setMaxPagesPerPageLimit(pagesMaxPerPageLimit - pagesPerPage * 10)
                                        setMinPagesPerPageLimit(pagesMinPerPageLimit - pagesPerPage * 10)
                                    }
                                }}>...</a>
                            </>
                        }

                    </>

                }
            </div >
            {arrayOfPages.map((page, index) => {

                return (
                    page > pagesMinPerPageLimit && page < pagesMaxPerPageLimit + 1 &&
                    <div className="page" key={index}>
                        <a href='#logo' onClick={() => {
                            setNumberOfDataToSkip((index * 100));
                            setCurrentPage(page)
                        }} className={currentPage === page ? "pageActive" : null}>
                            {page}
                        </a>
                    </div>
                )

            })}
            {currentPage < arrayOfPages[arrayOfPages.length - 1] &&
                <div className='page-box-right'>
                    {pagesMaxPerPageLimit !== arrayOfPages[arrayOfPages.length - 1] &&
                        <>
                            <a href='#logo' className='ellipsis-right' onClick={() => {

                                if ((currentPage + 50) <= arrayOfPages[arrayOfPages.length - 1]) {
                                    setCurrentPage(currentPage + 50)
                                    setMaxPagesPerPageLimit(pagesMaxPerPageLimit + pagesPerPage * 10)
                                    setMinPagesPerPageLimit(pagesMinPerPageLimit + pagesPerPage * 10)
                                }
                            }}>...</a>
                            <a href='#logo' onClick={() => {
                                setCurrentPage(arrayOfPages[arrayOfPages.length - 1])
                                setNumberOfDataToSkip(arrayOfPages.length - 1)
                                setMaxPagesPerPageLimit(arrayOfPages[arrayOfPages.length - 1])
                                setMinPagesPerPageLimit(arrayOfPages[arrayOfPages.length - 1] - pagesPerPage)
                                setNumberOfDataToSkip(data.count - 100)
                            }}>{arrayOfPages[arrayOfPages.length - 1]}</a>
                        </>
                    }
                    <a href='#logo' onClick={() => {
                        setNumberOfDataToSkip(numberOfDataToSkip + 100)
                        if (currentPage + 1 > pagesMaxPerPageLimit) {
                            setMaxPagesPerPageLimit(pagesMaxPerPageLimit + pagesPerPage)
                            setMinPagesPerPageLimit(pagesMinPerPageLimit + pagesPerPage)
                        }
                        setCurrentPage(currentPage + 1)
                    }} >&#62;</a>
                </div>}

        </div >
    )
}
export default Pagination