import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../style/inquirypurchaseorder.css';
import order_list from '../assest/dashboard/order_list.svg';
import OnGoingOrder from './inquiry/OnGoingOrder';
import PurchasedOrder from './inquiry/PurchasedOrder'
import { postRequestWithToken } from '../api/Requests';


const InquiryPurchaseOrder = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [inquiryList, setInquiryList] = useState([])
    const [totalInquiries, setTotalInquiries] = useState()
    const [currentPage, setCurrentPage] = useState(1); 
    const inquiryPerPage = 3;

    const [poList, setPOList] = useState([])
    const [totalPoList, setTotalPoList] = useState()

    const getActiveLinkFromPath = (path) => {
        switch (path) {
            case '/buyer/inquiry-purchase-orders/ongoing':
                return 'ongoing';
            case '/buyer/inquiry-purchase-orders/purchased':
                return 'purchased';
            default:
                return 'ongoing';
        }
    };

    const activeLink = getActiveLinkFromPath(location.pathname);

    const handleLinkClick = (link) => {
        switch (link) {
            case 'ongoing':
                navigate('/buyer/inquiry-purchase-orders/ongoing');
                break;
            case 'purchased':
                navigate('/buyer/inquiry-purchase-orders/purchased');
                break;
            default:
                navigate('/buyer/inquiry-purchase-orders/ongoing');
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        const buyerIdSessionStorage = sessionStorage.getItem("buyer_id");
        const buyerIdLocalStorage   = localStorage.getItem("buyer_id");
        if (!buyerIdSessionStorage && !buyerIdLocalStorage) {
            navigate("/buyer/login");
            return;
        }
        const status = activeLink === 'ongoing' ? 'pending' : 'completed'
        const obj = {
            buyer_id : buyerIdSessionStorage || buyerIdLocalStorage,
            status   : status,
            pageNo   : currentPage, 
            pageSize : inquiryPerPage,
        }
        postRequestWithToken('buyer/enquiry/enquiry-list', obj, async (response) => {
            if (response.code === 200) {
                setInquiryList(response.result.data)
                setTotalInquiries(response.result.totalItems)
            } else {
               console.log('error in order list api',response);
            }
        })
        if (activeLink === 'purchased') {
            obj.status = 'pending'
            postRequestWithToken('buyer/purchaseorder/get-po-list', obj, async (response) => {
                if (response.code === 200) {
                    setPOList(response.result.data)
                    setTotalPoList(response.result.totalItems)
                } else {
                    console.log('error in purchased order list api', response);
                }
            });
        } 
    },[activeLink, currentPage])

    return (
        <div className='inquiry-purchase-main-container'>
            <div className="inquiry-purchase-name">
                Inquiry & Purchased Orders
            </div>
            <div className="inquiry-purchase-container">
                <div className="inquiry-purchase-container-left">
                    <div
                        onClick={() => handleLinkClick('ongoing')}
                        className={activeLink === 'ongoing' ? 'active inquiry-purchase-left-wrapper' : 'inquiry-purchase-left-wrapper'}
                    >
                        <img src={order_list} alt="inquiry-purchase icon" />
                        <div>Ongoing Inquiries</div>
                    </div>
                    <div
                        onClick={() => handleLinkClick('purchased')}
                        className={activeLink === 'purchased' ? 'active inquiry-purchase-left-wrapper' : 'inquiry-purchase-left-wrapper'}
                    >
                        <img src={order_list} alt="inquiry-purchase icon" />
                        <div>Purchased Orders</div>
                    </div>
                </div>
                <div className="inquiry-purchase-container-right">
                    <div responsive="xl" className='inquiry-purchase-table-responsive'>
                        {activeLink === 'ongoing' && 
                        <OnGoingOrder
                        inquiryList        = {inquiryList} 
                        totalInquiries      = {totalInquiries} 
                        currentPage      = {currentPage}
                        inquiryPerPage    = {inquiryPerPage}
                        handlePageChange = {handlePageChange}
                        activeLink       = {activeLink}
                        />}
                        {activeLink === 'purchased' && 
                        <PurchasedOrder
                            poList           = {poList}
                            totalPoList      = {totalPoList} 
                            currentPage      = {currentPage}
                            inquiryPerPage   = {inquiryPerPage}
                            handlePageChange = {handlePageChange}
                            activeLink       = {activeLink}
                        />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InquiryPurchaseOrder;