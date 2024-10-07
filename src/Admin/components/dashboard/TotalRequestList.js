import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../style/dashboardorders.css';
import Table from 'react-bootstrap/Table';
import Pagination from "react-js-pagination";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { postRequestWithToken } from '../../api/Requests';
const TotalRequestList = () => {

    const navigate = useNavigate()
    const adminIdSessionStorage = sessionStorage.getItem("admin_id");
    const adminIdLocalStorage   = localStorage.getItem("admin_id");

    const requestSection = [
        { registration_type:"Supplier",
            type: "Distributor",
            name: "Shunya Ekai",
            origin: "Dubai",
            license_no: "LKJK98797",
            status: "Pending"
        },
        { registration_type:"Buyer",
            type: "End User",
            name: "Shunya Ekai",
            origin: "Dubai",
            license_no: "LKJK98797",
            status: "Pending"
        },
        { registration_type:"Supplier",
            type: "Manufacturer",
            name: "Shunya Ekai",
            origin: "Dubai",
            license_no: "LKJK98797",
            status: "Pending"
        },
        { registration_type:"Buyer",
            type: "Distributor",
            name: "Shunya Ekai",
            origin: "Dubai",
            license_no: "LKJK98797",
            status: "Pending"
        },
    ]


    const [loading, setLoading]             = useState(true);
    const [requestList, setRequestList]   = useState([])
    const [totalRequests, setTotalRequests] = useState()
    const [currentPage, setCurrentPage]     = useState(1);
    const listPerPage = 5;

    // const indexOfLastOrder  = currentPage * listPerPage;
    // const indexOfFirstOrder = indexOfLastOrder - listPerPage;
    // const currentOrders     = requestList.slice(indexOfFirstOrder, indexOfLastOrder);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        if (!adminIdSessionStorage && !adminIdLocalStorage) {
            navigate("/admin/login");
            return;
        }
        const obj = {
            admin_id  : adminIdSessionStorage || adminIdLocalStorage ,
            filterKey : 'pending',
            pageNo    : currentPage, 
            pageSize  : listPerPage,
        }

        postRequestWithToken('admin/get-buyer-supplier-reg-req-list', obj, async (response) => {
            if (response.code === 200) {
                setRequestList(response.result.data)
                setTotalRequests(response.result.totalItems)
            } else {
               console.log('error in get-buyer-reg-req-list api',response);
            }
            setLoading(false);
        })
    },[currentPage])

    return (
        <>
            <div className='completed-order-main-container'>
                <div className="completed-order-main-head">Total Request List</div>
                <div className="completed-order-container">
                    <div className="completed-order-container-right-2">
                        <Table responsive="xxl" className='completed-order-table-responsive'>
                            <thead>
                                <div className='completed-table-row-container m-0' style={{ backgroundColor: 'transparent' }} >
                                < div className='table-row-item table-order-1' >
                                        <span className='completed-header-text-color' >Registration Type</span>
                                    </div>
                                    < div className='table-row-item table-order-1' >
                                        <span className='completed-header-text-color' >Company Type</span>
                                    </div>
                                    <div className='completed-table-row-item completed-table-order-1'>
                                        <span className='completed-header-text-color'>Company Name</span>
                                    </div>
                                    <div className='completed-table-row-item completed-table-order-2'>
                                        <span className='completed-header-text-color'>Country of Origin	</span>
                                    </div>
                                    <div className='completed-table-row-item completed-table-order-1'>
                                        <span className='completed-header-text-color'>Company License No.</span>
                                    </div>
                                    <div className='completed-table-row-item completed-table-order-1'>
                                        <span className='completed-header-text-color'>Status</span>
                                    </div>
                                    <div className='completed-table-row-item completed-table-order-1'>
                                        <span className='completed-header-text-color'>Action</span>
                                    </div>

                                </div>
                            </thead>

                            <tbody className='bordered'>
                                {requestList?.map((request, index) => (
                                    <div className='completed-table-row-container'>
                                         <div className='completed-table-row-item completed-table-order-1'>
                                            <div className='completed-table-text-color'>{request.registration_type}</div>
                                        </div>
                                        <div className='completed-table-row-item completed-table-order-1'>
                                            <div className='completed-table-text-color'>{request.buyer_type || request.supplier_type}</div>
                                        </div>

                                        <div className='completed-table-row-item completed-table-order-1'>
                                            <div className='completed-table-text-color'>{request.buyer_name || request.supplier_name}</div>
                                        </div>
                                        <div className='completed-table-row-item  completed-table-order-2'>
                                            <div className='table-text-color'>{request.country_of_origin}</div>
                                        </div>
                                        <div className='completed-table-row-item completed-table-order-1'>
                                            <div className='completed-table-text-color'>{request.license_no}</div>
                                        </div>
                                        <div className='completed-table-row-item completed-table-order-1'>
                                            <div className='completed-table-text-color'>{request.status || 'Pending'}</div>
                                        </div>
                                        <div className='completed-table-row-item  completed-order-table-btn completed-table-order-1'>
                                        <Link 
                                            to={
                                                request.registration_type === 'Buyer' 
                                                ? `/admin/buyer-request-details/${request.buyer_id}` 
                                                : `/admin/supplier-request-details/${request.supplier_id}`
                                            }
                                        >
                                                <div className='completed-order-table completed-order-table-view '><RemoveRedEyeOutlinedIcon className="table-icon" /></div>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </tbody>
                        </Table>
                        <div className='completed-pagi-container'>
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={listPerPage}
                                totalItemsCount={totalRequests}
                                pageRangeDisplayed={5}
                                onChange={handlePageChange}
                                itemClass="page-item"
                                linkClass="page-link"
                                prevPageText={<KeyboardDoubleArrowLeftIcon style={{ fontSize: '15px' }} />}
                                nextPageText={<KeyboardDoubleArrowRightIcon style={{ fontSize: '15px' }} />}
                                hideFirstLastPages={true}
                            />
                            <div className='completed-pagi-total'>
                                <div className='completed-pagi-total'>
                                    Total Items: {totalRequests}
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div>



        </>
    )
}

export default TotalRequestList