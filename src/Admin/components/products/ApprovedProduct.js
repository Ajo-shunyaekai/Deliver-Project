import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../../style/order.module.css';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { postRequestWithToken } from '../../api/Requests';
import ApprovedNewProducts from './ApprovedNewProducts';
import ApprovedSecondaryProducts from './ApprovedSecondaryProducts';
const ApprovedProduct = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const adminIdSessionStorage = sessionStorage.getItem("admin_id");
    const adminIdLocalStorage   = localStorage.getItem("admin_id");

    const getActiveLinkFromPath = (path) => {
        switch (path) {
            case '/admin/approved-product/newproduct':
                return 'newproduct';
                case '/admin/approved-product/secondary':
                return 'secondary';
            default:
                return 'newproduct';
        }
    };

    const activeLink = getActiveLinkFromPath(location.pathname);

    const handleLinkClick = (link) => {
        setCurrentPage(1)
        switch (link) {
            case 'newproduct':
                navigate('/admin/approved-product/newproduct');
                break;
                case 'secondary':
                navigate('/admin/approved-product/secondary');
                break;
            default:
                navigate('/admin/approved-product/newproduct');
        }
    };

    const [productList, setProductList]     = useState([])
    const [totalProducts, setTotalProducts] = useState()
    const [currentPage, setCurrentPage] = useState(1); 
    const listPerPage = 5;

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        if (!adminIdSessionStorage && !adminIdLocalStorage) {
            navigate("/admin/login");
            return;
        }
        const medicineType = activeLink === 'newproduct' ? 'new' : activeLink === 'secondary' ? 'secondary market' : activeLink;
        const obj = {
            admin_id  : adminIdSessionStorage || adminIdLocalStorage,
            medicineType: medicineType,
            status  : 1,
            pageNo     : currentPage, 
            pageSize       : listPerPage,
        }

        postRequestWithToken('admin/get-medicine-list', obj, async (response) => {
            if (response.code === 200) {
                setProductList(response.result.data);
                setTotalProducts(response.result.totalItems);
            } else {
               console.log('error in order list api',response);
            }
          })
    },[activeLink, currentPage])

    return (
        <>
            <div className={styles[`order-container`]}>
                <div className={styles['complete-container-order-section']}>
                    <div className={styles['complete-conatiner-head']}>Approved Products List</div>
                </div>
                <div className={styles[`order-wrapper`]}>
                    <div className={styles[`order-wrapper-left`]}>
                        <div
                            onClick={() => handleLinkClick('newproduct')}
                            className={`${activeLink === 'newproduct' ? styles.active : ''} ${styles['order-wrapper-left-text']}`}
                        >
                            <DescriptionOutlinedIcon className={styles['order-wrapper-left-icons']} />
                            <div>Approved New Products</div>
                        </div>
                        <div
                            onClick={() => handleLinkClick('secondary')}
                            className={`${activeLink === 'secondary' ? styles.active : ''} ${styles['order-wrapper-left-text']}`}
                        >
                            <DescriptionOutlinedIcon className={styles['order-wrapper-left-icons']} />
                            <div>Approved Secondary Products</div>
                        </div>
                    </div>
                    <div className={styles[`order-wrapper-right`]}>
                        {activeLink === 'newproduct' &&
                         <ApprovedNewProducts
                         productList     = {productList} 
                         totalProducts    = {totalProducts} 
                         currentPage      = {currentPage}
                         listPerPage      = {listPerPage}
                         handlePageChange = {handlePageChange}
                         activeLink       = {activeLink}
                         />}
                        {activeLink === 'secondary' &&
                        <ApprovedSecondaryProducts
                        productList         = {productList} 
                        totalProducts       = {totalProducts} 
                        currentPage      = {currentPage}
                        listPerPage      = {listPerPage}
                        handlePageChange = {handlePageChange}
                       activeLink       = {activeLink}
                        />}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ApprovedProduct; 