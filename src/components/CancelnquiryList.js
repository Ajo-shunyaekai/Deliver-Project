import React, { useEffect, useState } from 'react';
import styles from '../style/cancelinquiry.module.css';
import CancelProductList from './CancelProductList';
import { useNavigate, useParams } from 'react-router-dom';
import { postRequestWithToken } from '../api/Requests';
import { toast } from 'react-toastify';

const CancelInquiryList = () => {
    const buyerIdSessionStorage = sessionStorage.getItem("buyer_id");
    const buyerIdLocalStorage = localStorage.getItem("buyer_id");

    const { inquiryId } = useParams();
    const navigate = useNavigate();

    const [inquiryDetails, setInquiryDetails] = useState();
    const [selectedReasons, setSelectedReasons] = useState({
        UnavailableProduct: false,
        IncorrectPricing: false,
        DelayedResponse: false,
        BetterOption: false,
        ChangeInRequirement: false,
        Other: false,
    });
    const [text, setText] = useState('');

    const handleChanged = (event) => {
        setText(event.target.value);
    };

    const handleChange = (e) => {
        const { name } = e.target;

        // Reset all checkboxes to false
        const updatedReasons = Object.keys(selectedReasons).reduce((acc, reason) => {
            acc[reason] = false;
            return acc;
        }, {});

        // Set the selected checkbox to true
        setSelectedReasons({
            ...updatedReasons,
            [name]: e.target.checked,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const reasonMap = {
            UnavailableProduct: 'Unavailable product',
            IncorrectPricing: 'Incorrect pricing',
            DelayedResponse: 'Delayed response',
            BetterOption: 'Found a better option',
            ChangeInRequirement: 'Change in requirement',
            Other: 'Inquiry by mistake',
        };
    
        // Find the selected reason
        const selectedReasonKey = Object.keys(selectedReasons).find(key => selectedReasons[key]);
        const reason = reasonMap[selectedReasonKey];

        const obj = {
            buyer_id: buyerIdSessionStorage || buyerIdLocalStorage,
            enquiry_id: inquiryId,
            supplier_id: inquiryDetails?.supplier?.supplier_id,
            reason: reason,
            comment: text
        };

        console.log('obj', obj);
        // console.log('comment:', text);

        postRequestWithToken("buyer/enquiry/cancel-enquiry", obj, async (response) => {
        if (response.code === 200) {
            navigate(`/buyer/ongoing-inquiries-details/${inquiryId}`);
            setTimeout(() => {
                toast(response.message, { type: "success" });
            },1000)
          
          
        //   setInquiryDetails((prevDetails) => ({
        //     ...prevDetails,
        //     status: 'cancelled', 
        //     items: prevDetails.items.map(item => ({
        //       ...item,
        //       status: 'cancelled' 
        //     }))
        //   }));
          
        } else {
          toast(response.message, { type: "error" });
          console.log("error in cancel-enquiry api", response);
        }
      }
    );
    };

    useEffect(() => {
        if (!buyerIdSessionStorage && !buyerIdLocalStorage) {
            navigate("/buyer/login");
            return;
        }
        const obj = {
            buyer_id: buyerIdSessionStorage || buyerIdLocalStorage,
            enquiry_id: inquiryId,
        };
        postRequestWithToken("buyer/enquiry/enquiry-details", obj, async (response) => {
            if (response.code === 200) {
                setInquiryDetails(response?.result);
            } else {
                console.log("error in order list api", response);
            }
        });
    }, []);

    return (
        <div className={styles['cancel-inquiry-main-section']}>
            <div className={styles['cancel-inquiry-heading']}>Cancel Inquiries</div>
            <div className="ongoing-details-assign-driver-section">
                <CancelProductList items={inquiryDetails?.items} inquiryDetails={inquiryDetails} />
            </div>
            <div className={styles['form-main-section-container']}>
                <div className={styles['form-main-content-section']}>
                    <div className={styles['form-cancel-heading']}>Reason for Cancel Inquiries</div>
                    <div className={styles['form-cancel-text']}>Please tell us the correct reason for Inquiries. This information is only used to improve our service</div>
                </div>
                <form onSubmit={handleSubmit} className={styles.formcontainer}>
                    <div className={styles['form-select-reason-head']}>Select Reason<span className={styles['red-bullet']}>*</span></div>
                    <div className={styles['form-main-container']}>
                        {Object.keys(selectedReasons).map((reason, index) => (
                            <div className={styles.checkboxContainer} key={index}>
                                <label className={styles.label}>
                                    <input
                                        type="checkbox"
                                        name={reason}
                                        checked={selectedReasons[reason]}
                                        onChange={handleChange}
                                        className={styles['cancel-inquiry-input']}
                                    />
                                    <span className={styles['cancel-inquiry-text']}>{reason.split(/(?=[A-Z])/).join(' ')}</span>
                                </label>
                            </div>
                        ))}
                        <div className={styles.textboxcontainer}>
                            <textarea
                                className={styles['form-textarea']}
                                id="inquiryReason"
                                value={text}
                                onChange={handleChanged}
                                placeholder="Additional Comments"
                                rows="5"
                                cols="100"
                            />
                        </div>
                    </div>
                    <div className={styles.buttonContainer}>
                        <button type="submit" className={styles.submitButton}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CancelInquiryList;