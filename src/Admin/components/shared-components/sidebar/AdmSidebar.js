import React, { useState, useEffect, useRef } from 'react';
import styles from "./sidebar.module.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import order_list from "../../../assest/Images/dashboard/order_list.svg";
import DeliverLogo from "../../../assest/Images/logo.svg";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CropFreeOutlinedIcon from "@mui/icons-material/CropFreeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import TocOutlinedIcon from "@mui/icons-material/TocOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import Box from "@mui/material/Box";
import Badge from '@mui/material/Badge';
import Drawer from "@mui/material/Drawer";


const AdmSidebar = ({ children, dragWindow, notificationList, count, handleClick }) => {
  const navigate = useNavigate()
  const [isDropOpen, setIsDropOpen] = useState(false);
  const [isSellerOpen, setIsSellerOpen] = useState(false);
  const [isManageOpen, setIsManageOpen] = useState(false);

  const [isIconOpen, setIsIconOpen] = useState(false);
  const [isBuyerIconOpen, setIsBuyerIconOpen] = useState(false);
  const [isProductIconOpen, setIsProductIconOpen] = useState(false);


  const toggleDropdown = () => {
    setIsDropOpen(!isDropOpen);
    setIsSellerOpen(false);
    setIsManageOpen(false);
    setIsBuyerIconOpen(!isBuyerIconOpen);
  };

  const toggleSellerDropdown = () => {
    setIsSellerOpen(!isSellerOpen);
    setIsDropOpen(false);
    setIsManageOpen(false);
    setIsIconOpen(!isIconOpen);

  };

  const toggleManageDropdown = () => {
    setIsManageOpen(!isManageOpen);
    setIsDropOpen(false);
    setIsSellerOpen(false);
    setIsProductIconOpen(!isProductIconOpen);
  };

  // Search bar toggle function
  const [isSearchVisible, setSearchVisible] = useState(false);
  const toggleSearchBar = () => {
    setSearchVisible(!isSearchVisible);
  };

  // Add full screen code
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const handleFullScreenChange = () => {
      const isCurrentlyFullScreen = document.fullscreenElement !== null;
      setIsFullScreen(isCurrentlyFullScreen);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  // Notification and profile dropdown code here
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  const NotificationDropdown = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setIsProfileOpen(false); // Close profile dropdown if open
    handleClick(); // for notification status update
  };

  const ProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsNotificationOpen(false); // Close notification dropdown if open
  };

  const handleClickOutside = (event) => {
    // Close dropdowns if clicking outside
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target) &&
      profileRef.current &&
      !profileRef.current.contains(event.target)
    ) {
      setIsNotificationOpen(false);
      setIsProfileOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Side bar code start from here
  const [isOpen, setIsOpen] = useState(true);
  const [isIcon, setIsIcon] = useState(true);
  const [isDropdown, setIsDropdown] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);

    if (window.innerWidth <= 992) {
      setIsIcon(!isIcon);
    } else {
      setIsIcon(true);
    }
  };
  // Effect to close sidebar when screen size is 1050px or less
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 992) {
        setIsOpen(true);
        setIsIcon(true);
      } else {
        setIsOpen(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Mobile sidebar
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };


  const handleSignout = () => {
    setIsProfileOpen(!isProfileOpen);
    localStorage.clear()
    sessionStorage.clear()
    navigate('/admin/login')
  }

  const toggleAccordion = () => {
    setIsDropdown(!isDropdown);
  };
  const DrawerList = (
    <Box sx={{ width: 200 }} role="presentation" onClick={toggleDrawer(true)}>
      <Link
        to="/admin"
        className={styles.sidebar_text}
        activeclassname={styles.active}
      >
        <div className={styles.icon}>
          <HomeOutlinedIcon style={{ color: "#448BFF", fontSize: "20px" }} />
        </div>
        <div
          style={{ display: isOpen ? "block" : "none" }}
          className={styles.sidebar_text}
        >
          Dashboard
        </div>
      </Link>

      <Box sx={{ width: 200 }} role="presentation">
        <div className={styles.mobile_order_btn}>
          <div className={styles.sidebar_text} onClick={toggleAccordion}>
            <div className={styles.icon}>
              {" "}
              <TocOutlinedIcon style={{ color: "#31c971", fontSize: "20px" }} />
            </div>
            <div style={{ marginLeft: "10px", padding: "5px 0px" }}>Orders</div>
          </div>
          {isDropdown && (
            <div className={styles.accordion_content}>
              <Link
                to="/admin/alotted-order"
                className={styles.sidebar_text}
                activeclassname={styles.active}
                style={{ width: "170px" }}
              >
                <img
                  src={order_list}
                  alt="order icon"
                  style={{ padding: "6px 6px 0px 10px" }}
                />
                Active Orders
              </Link>

              <Link
                to="/admin/active-order"
                className={styles.sidebar_text}
                activeclassname={styles.active}
                style={{ width: "170px" }}
              >
                <img
                  src={order_list}
                  alt="order icon"
                  style={{ padding: "6px 6px 0px 10px" }}
                />
                Completed Orders
              </Link>

              <Link
                to="/admin/complete-order"
                className={styles.sidebar_text}
                activeclassname={styles.active}
                style={{ width: "170px" }}
              >
                <img
                  src={order_list}
                  alt="order icon"
                  style={{ padding: "6px 6px 0px 10px" }}
                />
                Pending Orders
              </Link>
            </div>
          )}
          <div className={styles.dropdown} style={{ marginTop: '8px' }}>
            <div className={styles.dropdownToggle} onClick={toggleSellerDropdown}>
              <LocalMallOutlinedIcon style={{ color: '#14bae4', fontSize: '20px' }} />
              <div className={styles.dropdownText} style={{ display: isOpen ? "block" : "none" }}>Manage Seller
                {isIconOpen ? <KeyboardArrowUpOutlinedIcon style={{ color: '#5e676f' }} /> : <KeyboardArrowDownOutlinedIcon style={{ color: '#5e676f' }} />}
              </div>
            </div>
            {isOpen && isSellerOpen && (
              <div className={styles.dropdownContent}>
                <Link to="/admin/seller-request" className={styles.sidebar_text} activeclassname={styles.active}>
                  <FiberManualRecordIcon style={{ color: '#d3d3d3', fontSize: '12px', marginLeft: "10px" }} />
                  <div className={styles.sidebar_text}>Seller Requests</div>
                </Link>
                <Link to="/admin/approved-seller" className={styles.sidebar_text} activeclassname={styles.active}>
                  <FiberManualRecordIcon style={{ color: '#d3d3d3', fontSize: '12px', marginLeft: "10px" }} />
                  <div className={styles.sidebar_text}>Approved Seller</div>
                </Link>
                <Link to="/admin/rejected-seller" className={styles.sidebar_text} activeclassname={styles.active}>
                  <FiberManualRecordIcon style={{ color: '#d3d3d3', fontSize: '12px', marginLeft: "10px" }} />
                  <div className={styles.sidebar_text}>Rejected Seller </div>
                </Link>

                <Link to="/admin/seller-transaction" className={styles.sidebar_text} activeclassname={styles.active}>
                  <FiberManualRecordIcon style={{ color: '#d3d3d3', fontSize: '12px', marginLeft: "10px" }} />
                  <div className={styles.sidebar_text}>Seller Transaction</div>
                </Link>
                <Link to="/admin/manage-seller/feedback" className={styles.sidebar_text} activeclassname={styles.active}>
                  <FiberManualRecordIcon style={{ color: '#d3d3d3', fontSize: '12px', marginLeft: "10px" }} />
                  <div className={styles.sidebar_text}>Support</div>
                </Link>
                <Link to="#" className={styles.sidebar_text} activeclassname={styles.active}>
                  <FiberManualRecordIcon style={{ color: '#d3d3d3', fontSize: '12px', marginLeft: "10px" }} />
                  <div className={styles.sidebar_text}>Invoices </div>
                </Link>
              </div>
            )}
          </div>

          <div className={styles.dropdown} style={{ marginTop: '8px' }}>
            <div className={styles.dropdownToggle} onClick={toggleDropdown}>
              <LocalShippingOutlinedIcon
                style={{ color: "#31c971", fontSize: "20px" }}
              />
              <div className={styles.dropdownText} style={{ display: isOpen ? "block" : "none" }}>Manage Buyer
                {isBuyerIconOpen ? <KeyboardArrowUpOutlinedIcon style={{ color: '#5e676f' }} /> : <KeyboardArrowDownOutlinedIcon style={{ color: '#5e676f' }} />}
              </div>

            </div>
            {isOpen && isDropOpen && (
              <div className={styles.dropdownContent}>
                <Link to="/admin/buyer-request" className={styles.sidebar_text} activeclassname={styles.active}>
                  <FiberManualRecordIcon style={{ color: '#d3d3d3', fontSize: '12px', marginLeft: "10px" }} />
                  <div className={styles.sidebar_text}>Buyer Requests</div>
                </Link>
                <Link to="#" className={styles.sidebar_text} activeclassname={styles.active}>
                  <FiberManualRecordIcon style={{ color: '#d3d3d3', fontSize: '12px', marginLeft: "10px" }} />
                  <div className={styles.sidebar_text}>Approved Buyer</div>
                </Link>
                <Link to="#" className={styles.sidebar_text} activeclassname={styles.active}>
                  <FiberManualRecordIcon style={{ color: '#d3d3d3', fontSize: '12px', marginLeft: "10px" }} />
                  <div className={styles.sidebar_text}>Rejected Buyer </div>
                </Link>
                <Link to="/admin/buyer-transaction" className={styles.sidebar_text} activeclassname={styles.active}>
                  <FiberManualRecordIcon style={{ color: '#d3d3d3', fontSize: '12px', marginLeft: "10px" }} />
                  <div className={styles.sidebar_text}>Buyer Transaction</div>
                </Link>
                <Link to="/admin/manage-buyer/feedback" className={styles.sidebar_text} activeclassname={styles.active}>
                  <FiberManualRecordIcon style={{ color: '#d3d3d3', fontSize: '12px', marginLeft: "10px" }} />
                  <div className={styles.sidebar_text}>Support</div>
                </Link>
                <Link to="#" className={styles.sidebar_text} activeclassname={styles.active}>
                  <FiberManualRecordIcon style={{ color: '#d3d3d3', fontSize: '12px', marginLeft: "10px" }} />
                  <div className={styles.sidebar_text}>Invoices </div>
                </Link>
              </div>
            )}
          </div>
          <div className={styles.dropdown} style={{ marginTop: '8px' }}>
            <div className={styles.dropdownToggle} onClick={toggleManageDropdown}>
              <DescriptionOutlinedIcon style={{ color: '#f4c414', fontSize: '20px' }} />
              <div className={styles.dropdownText} style={{ display: isOpen ? "block" : "none" }}>Manage Products </div>
              {isProductIconOpen ? <KeyboardArrowUpOutlinedIcon style={{ color: '#5e676f' }} /> : <KeyboardArrowDownOutlinedIcon style={{ color: '#5e676f' }} />}

            </div>
            {isOpen && isManageOpen && (
              <div className={styles.dropdownContent}>
                <Link to="#" className={styles.sidebar_text} activeclassname={styles.active}>
                  <FiberManualRecordIcon style={{ color: '#d3d3d3', fontSize: '12px', marginLeft: "10px" }} />
                  <div className={styles.sidebar_text}>Approved Products
                  </div>
                </Link>
                <Link to="#" className={styles.sidebar_text} activeclassname={styles.active}>
                  <FiberManualRecordIcon style={{ color: '#d3d3d3', fontSize: '12px', marginLeft: "10px" }} />
                  <div className={styles.sidebar_text}>Rejected Products
                  </div>
                </Link>
              </div>
            )}
          </div>
          <Link to="#" className={styles.sidebar_text} activeclassname={styles.active}>
            <div className={styles.icon}><ManageAccountsOutlinedIcon style={{ color: '#f54394', fontSize: '20px' }} /></div>
            <div style={{ display: isOpen ? "block" : "none" }} className={styles.sidebar_text}>Manage Commission</div>
          </Link>
        </div>
      </Box>
    </Box>
  );

  // ======================
  const [sidebarWidth, setSidebarWidth] = useState(0);
  useEffect(() => {
    // Function to calculate sidebar width
    const calculateSidebarWidth = () => {
      const width = document.querySelector(".sidebar")?.offsetWidth;
      setSidebarWidth(width);
    };

    // Call the function initially and on window resize
    calculateSidebarWidth();
    window.addEventListener("resize", calculateSidebarWidth);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", calculateSidebarWidth);
    };
  }, []); // Empty dependency array to run this effect only once on mount


  const handleNavigation = (notificationId, event, eventId, linkId) => {
    const eventRoutes = {
      addnewmedicinerequest: '/admin/product-requests/newproduct',
      addsecondarymedicinerequest: '/admin/product-requests/secondary',
      editnewmedicinerequest: '/admin/product-update-requests/newproduct',
      editsecondarymedicinerequest: '/admin/product-update-requests/secondary',
      buyerregistration: '/admin/buyer-request',
      supplierregistration: '/admin/seller-request',
    };

    const route = eventRoutes[event] || '/admin/';
    setIsNotificationOpen(false);
    navigate(route);
    // handleClick(notificationId, event); // Uncomment this if needed
  };


  const handleNotificationNavigate = () => {
    setIsNotificationOpen(false)
    navigate(`/admin/notification-list`)
  }
  // ======================
  return (
    <>
      {/* Header Bar Code start from here  */}
      <div className={styles.nav_container}>
        <div className={styles.nav_wrapper}>
          <div className={styles.nav_img}>
            <Link to="/admin">
              <img src={DeliverLogo} alt="Deliver Logo" />
            </Link>
            {/* <MenuOutlinedIcon
              className={`${styles.nav_icon_color} ${styles.bar_icon}`}
              onClick={toggle}
            /> */}
          </div>

          <div className={styles.nav_search_container}>
            <div className={`${styles.nav_search} ${styles.nav_search_one}`}>
              <SearchOutlinedIcon className={styles.nav_icon_color} />
              <input
                type="text"
                placeholder="Search products..."
                className={styles.product_search_input}
              />
            </div>
            <div className={styles.nav_notifi_right}>
              {/* <CropFreeOutlinedIcon
                className={styles.nav_icon_color}
                onClick={toggleFullScreen}
              /> */}
              <SearchOutlinedIcon
                className={styles.nav_icon_color_two}
                onClick={toggleSearchBar}
              />
              <div ref={notificationRef}>
                <Badge badgeContent={count > 9 ? '9+' : count} color="secondary">
                  <NotificationsNoneOutlinedIcon
                    className={styles.nav_icon_color}
                    onClick={NotificationDropdown}
                  />
                </Badge>
                {isNotificationOpen && (
                  <div className={styles.noti_container}>
                    <div className={styles.noti_wrapper}>
                      <div className={styles.noti_top_wrapper}>
                        {notificationList?.slice(0, 5).map((data, i) => (
                          <div
                            key={data.notification_id}
                            className={styles.noti_profile_wrapper}
                            onClick={() => handleNavigation(data.notification_id, data.event, data.event_id, data.link_id)}
                          >
                            <div className={styles.noti_profile}>{data.event_type.charAt(0)}</div>
                            <div className={styles.noti_profile_text}>
                              <span>
                                {data.message.length > 100 ? `${data.message.slice(0, 100)}...` : data.message}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className={styles.noti_bottom_wrapper}>
                        <div className={styles.noti_see_all_num}>
                          {notificationList?.length} Notifications
                        </div>
                        <div className={styles.noti_see_all_btn} onClick={handleNotificationNavigate}>See all</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div ref={profileRef}>
                <AccountCircleOutlinedIcon
                  className={styles.nav_icon_color}
                  onClick={ProfileDropdown}
                />
                {isProfileOpen && (
                  <div className={styles.profile_dropdown}>
                    {/* Profile content goes here */}
                    <div className={styles.profile_wrapper}>
                      <div className={styles.profile_text}>
                        <Link
                          to="#"
                          onClick={() => setIsProfileOpen(false)} // Close dropdown on click
                        >
                          {sessionStorage?.email || 'admin@gmail.com'}
                        </Link>
                      </div>
                      <div className={styles.profile_wrapper_mid}>
                        <div>
                          <Link
                            to="/admin/profile"
                            onClick={() => setIsProfileOpen(false)} // Close dropdown on click
                          >
                            <div className={styles.profile_text}>Profile</div>
                          </Link>
                        </div>
                      </div>

                      <div
                        className={styles.profile_sign_out}
                        onClick={() => {
                          handleSignout();
                          setIsProfileOpen(false); // Close dropdown on signout
                        }}
                      >
                        Sign out
                      </div>
                    </div>
                  </div>
                )}
                <MenuOutlinedIcon
                  className={styles.nav_icon_color_two_3}
                  onClick={toggleDrawer(true)}
                />
              </div>

            </div>
          </div>
        </div>
        {isSearchVisible && (
          <div className={`${styles.nav_search} ${styles.nav_search_two}`}>
            <SearchOutlinedIcon className={styles.nav_icon_color_two} />
            <input
              type="text"
              placeholder="Search products..."
              className={styles.product_search_input}
            />
          </div>
        )}
      </div>

      {/*Desktop Sidebar code start from here */}
      <div className={styles.sidebar_container}>
        {isIcon ? (
          <div style={{ width: isOpen ? "200px" : "50px" }} className={styles.sidebar}>
            <Link to="/admin" className={styles.sidebar_text} activeclassname={styles.active}>
              <div className={styles.icon}><HomeOutlinedIcon style={{ color: '#448BFF', fontSize: '20px' }} /></div>
              <div style={{ display: isOpen ? "block" : "none" }} className={styles.sidebar_text}>Dashboard</div>
            </Link>

            <div className={styles.mobile_order_btn}>
              {isDropdown && isOpen && (
                <div className={styles.accordion_content}>
                  <Link to="/admin/alotted-order" className={styles.sidebar_text} activeclassname={styles.active} style={{ width: '160px' }}>
                    <img src={order_list} alt="order icon" style={{ paddingRight: '15px', }} />
                    Active Orders
                  </Link>

                  <Link to="/admin/active-order" className={styles.sidebar_text} activeclassname={styles.active} style={{ width: '160px' }}>
                    <img src={order_list} alt="order icon" style={{ paddingRight: '15px', }} />
                    Completed Orders
                  </Link>

                  <Link to="/admin/complete-order" className={styles.sidebar_text} activeclassname={styles.active} style={{ width: '160px' }}>
                    <img src={order_list} alt="order icon" style={{ paddingRight: '15px', }} />
                    Pending Orders
                  </Link>
                </div>
              )}
            </div>
            {/* =========================== */}
            <div className={styles.dropdown} style={{ marginTop: '8px' }}>
              <div className={styles.dropdownToggle} onClick={toggleSellerDropdown}>
                <LocalMallOutlinedIcon style={{ color: '#14bae4', fontSize: '20px' }} />
                <div className={styles.dropdownText} style={{ display: isOpen ? "block" : "none" }}>Manage Seller
                  {isIconOpen ? <KeyboardArrowUpOutlinedIcon style={{ color: '#5e676f' }} /> : <KeyboardArrowDownOutlinedIcon style={{ color: '#5e676f' }} />}
                </div>
              </div>
              {isOpen && isSellerOpen && (
                <div className={styles.dropdownContent}>
                  <Link to="/admin/seller-request" className={styles.sidebar_text} activeclassname={styles.active}>
                    <FiberManualRecordIcon style={{ color: '#d3d3d3', fontSize: '12px', marginLeft: "10px" }} />
                    <div className={styles.sidebar_text}>Seller Requests</div>
                  </Link>
                  <Link to="/admin/approved-seller" className={styles.sidebar_text} activeclassname={styles.active}>
                    <FiberManualRecordIcon style={{ color: '#d3d3d3', fontSize: '12px', marginLeft: "10px" }} />
                    <div className={styles.sidebar_text}>Approved Seller</div>
                  </Link>
                  <Link to="/admin/rejected-seller" className={styles.sidebar_text} activeclassname={styles.active}>
                    <FiberManualRecordIcon style={{ color: '#d3d3d3', fontSize: '12px', marginLeft: "10px" }} />
                    <div className={styles.sidebar_text}>Rejected Seller </div>
                  </Link>
                  <Link to="/admin/seller-transaction" className={styles.sidebar_text} activeclassname={styles.active}>
                    <FiberManualRecordIcon style={{ color: '#d3d3d3', fontSize: '12px', marginLeft: "10px" }} />
                    <div className={styles.sidebar_text}>Seller Transaction</div>
                  </Link>
                  <Link to="/admin/seller-inquiry" className={styles.sidebar_text} activeclassname={styles.active}>
                    <FiberManualRecordIcon style={{ color: '#d3d3d3', fontSize: '12px', marginLeft: "10px" }} />
                    <div className={styles.sidebar_text}>Inquiry</div>
                  </Link>
                  <Link to="/admin/seller-order" className={styles.sidebar_text} activeclassname={styles.active}>
                    <FiberManualRecordIcon style={{ color: '#d3d3d3', fontSize: '12px', marginLeft: "10px" }} />
                    <div className={styles.sidebar_text}>Order</div>
                  </Link>
                  <Link to="/admin/seller-invoice" className={styles.sidebar_text} activeclassname={styles.active}>
                    <FiberManualRecordIcon style={{ color: '#d3d3d3', fontSize: '12px', marginLeft: "10px" }} />
                    <div className={styles.sidebar_text}>Invoices </div>
                  </Link>
                  <Link to="/admin/seller-support" className={styles.sidebar_text} activeclassname={styles.active}>
                    <FiberManualRecordIcon style={{ color: '#d3d3d3', fontSize: '12px', marginLeft: "10px" }} />
                    <div className={styles.sidebar_text}>Support</div>
                  </Link>

                </div>
              )}
            </div>
            {/* =========================== */}
            <div className={styles.dropdown} style={{ marginTop: '8px' }}>
              <div className={styles.dropdownToggle} onClick={toggleDropdown}>
                <LocalShippingOutlinedIcon
                  style={{ color: "#31c971", fontSize: "20px" }}
                />
                <div className={styles.dropdownText} style={{ display: isOpen ? "block" : "none" }}>Manage Buyer
                  {isBuyerIconOpen ? <KeyboardArrowUpOutlinedIcon style={{ color: '#5e676f' }} /> : <KeyboardArrowDownOutlinedIcon style={{ color: '#5e676f' }} />}
                </div>

              </div>
              {isOpen && isDropOpen && (
                <div className={styles.dropdownContent}>
                  <Link to="/admin/buyer-request" className={styles.sidebar_text} activeclassname={styles.active}>
                    <FiberManualRecordIcon style={{ color: '#d3d3d3', fontSize: '12px', marginLeft: "10px" }} />
                    <div className={styles.sidebar_text}>Buyer Requests</div>
                  </Link>
                  <Link to="/admin/approved-buyer" className={styles.sidebar_text} activeclassname={styles.active}>
                    <FiberManualRecordIcon style={{ color: '#d3d3d3', fontSize: '12px', marginLeft: "10px" }} />
                    <div className={styles.sidebar_text}>Approved Buyer</div>
                  </Link>
                  <Link to="/admin/rejected-buyer" className={styles.sidebar_text} activeclassname={styles.active}>
                    <FiberManualRecordIcon style={{ color: '#d3d3d3', fontSize: '12px', marginLeft: "10px" }} />
                    <div className={styles.sidebar_text}>Rejected Buyer </div>
                  </Link>
                  <Link to="/admin/buyer-transaction" className={styles.sidebar_text} activeclassname={styles.active}>
                    <FiberManualRecordIcon style={{ color: '#d3d3d3', fontSize: '12px', marginLeft: "10px" }} />
                    <div className={styles.sidebar_text}>Buyer Transaction</div>
                  </Link>
                  <Link to="/admin/buyer-inquiry" className={styles.sidebar_text} activeclassname={styles.active}>
                    <FiberManualRecordIcon style={{ color: '#d3d3d3', fontSize: '12px', marginLeft: "10px" }} />
                    <div className={styles.sidebar_text}>Inquiry</div>
                  </Link>
                  <Link to="/admin/buyer-order" className={styles.sidebar_text} activeclassname={styles.active}>
                    <FiberManualRecordIcon style={{ color: '#d3d3d3', fontSize: '12px', marginLeft: "10px" }} />
                    <div className={styles.sidebar_text}>Order</div>
                  </Link>
                  <Link to="/admin/buyer-invoice" className={styles.sidebar_text} activeclassname={styles.active}>
                    <FiberManualRecordIcon style={{ color: '#d3d3d3', fontSize: '12px', marginLeft: "10px" }} />
                    <div className={styles.sidebar_text}>Invoices </div>
                  </Link>
                  <Link to="/admin/buyer-support" className={styles.sidebar_text} activeclassname={styles.active}>
                    <FiberManualRecordIcon style={{ color: '#d3d3d3', fontSize: '12px', marginLeft: "10px" }} />
                    <div className={styles.sidebar_text}>Support</div>
                  </Link>

                </div>
              )}
            </div>

            {/* ===================== */}
            <div className={styles.dropdown} style={{ marginTop: '8px' }}>
              <div className={styles.dropdownToggle} onClick={toggleManageDropdown}>
                <DescriptionOutlinedIcon style={{ color: '#f4c414', fontSize: '20px' }} />
                <div className={styles.dropdownText} style={{ display: isOpen ? "block" : "none" }}>Manage Products
                  {isProductIconOpen ? <KeyboardArrowUpOutlinedIcon style={{ color: '#5e676f' }} /> : <KeyboardArrowDownOutlinedIcon style={{ color: '#5e676f' }} />}
                </div>

              </div>
              {isOpen && isManageOpen && (
                <div className={styles.dropdownContent}>
                  <Link to="/admin/product-requests" className={styles.sidebar_text} activeclassname={styles.active}>
                    <FiberManualRecordIcon style={{ color: '#d3d3d3', fontSize: '12px', marginLeft: "10px" }} />
                    <div className={styles.sidebar_text}>Product Requests
                    </div>
                  </Link>
                  <Link to="/admin/product-update-requests" className={styles.sidebar_text} activeclassname={styles.active}>
                    <FiberManualRecordIcon style={{ color: '#d3d3d3', fontSize: '12px', marginLeft: "10px" }} />
                    <div className={styles.sidebar_text}>Product Update Requests
                    </div>
                  </Link>
                  <Link to="/admin/approved-product" className={styles.sidebar_text} activeclassname={styles.active}>
                    <FiberManualRecordIcon style={{ color: '#d3d3d3', fontSize: '12px', marginLeft: "10px" }} />
                    <div className={styles.sidebar_text}>Approved Products
                    </div>
                  </Link>
                  <Link to="/admin/rejected-product" className={styles.sidebar_text} activeclassname={styles.active}>
                    <FiberManualRecordIcon style={{ color: '#d3d3d3', fontSize: '12px', marginLeft: "10px" }} />
                    <div className={styles.sidebar_text}>Rejected Products
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* =============== */}
            <Link to="#" id="last_sidebar" className={styles.sidebar_text} activeclassname={styles.active}>
              <div className={styles.icon}><ManageAccountsOutlinedIcon style={{ color: '#f54394', fontSize: '20px' }} /></div>
              <div style={{ display: isOpen ? "block" : "none" }} className={styles.sidebar_text}>Manage Commission</div>
            </Link>



          </div>
        ) : ''}
        <main style={{ marginTop: isSearchVisible ? '30px' : '0' }}>
          <Outlet />
        </main>
      </div>
      <div>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
      </div>
    </>
  );
};

export default AdmSidebar;
