import React, { useEffect, useState } from 'react';
import styles from '../style/createInvoice.module.css';
import { PhoneInput } from 'react-international-phone';
import CreatePOImageUpload from './CreatePOImageUpload';
import { useNavigate, useParams } from 'react-router-dom';
import { postRequestWithToken } from '../api/Requests';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

const countryCodes = [
    '+1',    // USA, Canada
    '+7',    // Russia, Kazakhstan
    '+20',   // Egypt
    '+27',   // South Africa
    '+30',   // Greece
    '+31',   // Netherlands
    '+32',   // Belgium
    '+33',   // France
    '+34',   // Spain
    '+36',   // Hungary
    '+39',   // Italy
    '+40',   // Romania
    '+41',   // Switzerland
    '+43',   // Austria
    '+44',   // UK
    '+45',   // Denmark
    '+46',   // Sweden
    '+47',   // Norway
    '+48',   // Poland
    '+49',   // Germany
    '+51',   // Peru
    '+52',   // Mexico
    '+53',   // Cuba
    '+54',   // Argentina
    '+55',   // Brazil
    '+56',   // Chile
    '+57',   // Colombia
    '+58',   // Venezuela
    '+60',   // Malaysia
    '+61',   // Australia
    '+62',   // Indonesia
    '+63',   // Philippines
    '+64',   // New Zealand
    '+65',   // Singapore
    '+66',   // Thailand
    '+81',   // Japan
    '+82',   // South Korea
    '+84',   // Vietnam
    '+86',   // China
    '+90',   // Turkey
    '+91',   // India
    '+92',   // Pakistan
    '+93',   // Afghanistan
    '+94',   // Sri Lanka
    '+95',   // Myanmar
    '+98',   // Iran
    '+212',  // Morocco
    '+213',  // Algeria
    '+216',  // Tunisia
    '+218',  // Libya
    '+220',  // Gambia
    '+221',  // Senegal
    '+222',  // Mauritania
    '+223',  // Mali
    '+224',  // Guinea
    '+225',  // Côte d'Ivoire
    '+226',  // Burkina Faso
    '+227',  // Niger
    '+228',  // Togo
    '+229',  // Benin
    '+230',  // Mauritius
    '+231',  // Liberia
    '+232',  // Sierra Leone
    '+233',  // Ghana
    '+234',  // Nigeria
    '+235',  // Chad
    '+236',  // Central African Republic
    '+237',  // Cameroon
    '+238',  // Cape Verde
    '+239',  // São Tomé and Príncipe
    '+240',  // Equatorial Guinea
    '+241',  // Gabon
    '+242',  // Republic of the Congo
    '+243',  // Democratic Republic of the Congo
    '+244',  // Angola
    '+245',  // Guinea-Bissau
    '+246',  // British Indian Ocean Territory
    '+247',  // Ascension Island
    '+248',  // Seychelles
    '+249',  // Sudan
    '+250',  // Rwanda
    '+251',  // Ethiopia
    '+252',  // Somalia
    '+253',  // Djibouti
    '+254',  // Kenya
    '+255',  // Tanzania
    '+256',  // Uganda
    '+257',  // Burundi
    '+258',  // Mozambique
    '+260',  // Zambia
    '+261',  // Madagascar
    '+262',  // Réunion, Mayotte
    '+263',  // Zimbabwe
    '+264',  // Namibia
    '+265',  // Malawi
    '+266',  // Lesotho
    '+267',  // Botswana
    '+268',  // Eswatini
    '+269',  // Comoros
    '+290',  // Saint Helena
    '+291',  // Eritrea
    '+292',  // South Sudan
    '+293',  // Nauru
    '+294',  // Seychelles
    '+295',  // French Guiana
    '+296',  // Saint Pierre and Miquelon
    '+297',  // Aruba
    '+298',  // Faroe Islands
    '+299',  // Greenland
    '+350',  // Gibraltar
    '+351',  // Portugal
    '+352',  // Luxembourg
    '+353',  // Ireland
    '+354',  // Iceland
    '+355',  // Albania
    '+356',  // Malta
    '+357',  // Cyprus
    '+358',  // Finland
    '+359',  // Bulgaria
    '+370',  // Lithuania
    '+371',  // Latvia
    '+372',  // Estonia
    '+373',  // Moldova
    '+374',  // Armenia
    '+375',  // Belarus
    '+376',  // Andorra
    '+377',  // Monaco
    '+378',  // San Marino
    '+379',  // Vatican City
    '+380',  // Ukraine
    '+381',  // Serbia
    '+382',  // Montenegro
    '+383',  // Kosovo
    '+385',  // Croatia
    '+386',  // Slovenia
    '+387',  // Bosnia and Herzegovina
    '+388',  // Yugoslavia
    '+389',  // North Macedonia
    '+390',  // Vatican City
    '+391',  // San Marino
    '+392',  // Andorra
    '+393',  // Monaco
    '+394',  // Kosovo
    '+395',  // Vatican City
    '+396',  // San Marino
    '+397',  // Andorra
    '+398',  // Monaco
    '+399',  // Kosovo
    '+1869', // Saint Kitts and Nevis
    '+1876', // Jamaica
    '+1954', // Venezuela
];

const phoneValidationRules = {
    '1': /^\d{10}$/,                // USA/Canada: 10 digits
    '44': /^(\d{10}|\d{11})$/,      // UK: 10 or 11 digits
    '33': /^\d{10}$/,                // France: 10 digits
    '49': /^\d{11,14}$/,             // Germany: 11 to 14 digits (including country code)
    '91': /^[6-9]\d{9}$/,            // India: 10 digits, starts with 6-9
    '81': /^\d{10}$/,                // Japan: 10 digits
    '82': /^\d{10}$/,                // South Korea: 10 digits
    '61': /^(\d{9}|\d{10})$/,        // Australia: 9 or 10 digits
    '971': /^\d{7,9}$/,              // UAE: 7 to 9 digits
    '55': /^\d{10,11}$/,             // Brazil: 10 or 11 digits
    '27': /^\d{10}$/,                // South Africa: 10 digits
    '52': /^\d{10}$/,                // Mexico: 10 digits
    '46': /^\d{6,11}$/,              // Sweden: 6 to 11 digits
    '34': /^\d{9}$/,                 // Spain: 9 digits
    '64': /^\d{9}$/,                 // New Zealand: 9 digits
    '39': /^\d{10}$/,                // Italy: 10 digits
    '55': /^\d{11}$/,                // Brazil: 11 digits (often with 2-digit area code, note that '55' is duplicated)
    '27': /^\d{10}$/,                // South Africa: 10 digits
    '53': /^\d{8}$/,                 // Cuba: 8 digits
    '20': /^\d{10}$/,                // Egypt: 10 digits
    '90': /^\d{10}$/,                // Turkey: 10 digits
    '7': /^(\d{10}|\d{11})$/,        // Russia: 10 or 11 digits
    '44': /^(\d{10}|\d{11})$/,       // UK: 10 or 11 digits
    '91': /^[6-9]\d{9}$/,            // India: 10 digits, starts with 6-9
    '52': /^\d{10}$/,                // Mexico: 10 digits
    '55': /^\d{11}$/,                // Brazil: 11 digits
    '91': /^[6-9]\d{9}$/,            // India: 10 digits
    '971': /^\d{7,9}$/,              // UAE: 7 to 9 digits
    '60': /^\d{9,10}$/,              // Malaysia: 9 or 10 digits
    '62': /^\d{10,13}$/,             // Indonesia: 10 to 13 digits
    '63': /^\d{10}$/,                // Philippines: 10 digits
    '86': /^\d{11}$/,                // China: 11 digits
    '90': /^\d{10}$/,                // Turkey: 10 digits
    '98': /^\d{10}$/,                // Iran: 10 digits
    '92': /^\d{10}$/,                // Pakistan: 10 digits
    '94': /^\d{10}$/,                // Sri Lanka: 10 digits
    '91': /^[6-9]\d{9}$/,            // India: 10 digits
    '20': /^\d{10}$/,                // Egypt: 10 digits
    '27': /^\d{10}$/,                // South Africa: 10 digits
    '41': /^\d{10}$/,                // Switzerland: 10 digits
    '47': /^\d{8}$/,                 // Norway: 8 digits
    '48': /^\d{9}$/,                 // Poland: 9 digits
    '30': /^\d{10}$/,                // Greece: 10 digits
    '31': /^\d{10}$/,                // Netherlands: 10 digits
    '32': /^\d{9}$/,                 // Belgium: 9 digits
    '33': /^\d{10}$/,                // France: 10 digits
    '34': /^\d{9}$/,                 // Spain: 9 digits
    '35': /^\d{8,9}$/,              // Portugal: 8 or 9 digits
    '36': /^\d{9}$/,                // Hungary: 9 digits
    '37': /^\d{8}$/,                // Moldova: 8 digits
    '38': /^\d{9}$/,                // Slovenia:

    '38': /^\d{9}$/,                // Slovenia: 9 digits
    '39': /^\d{10}$/,               // Italy: 10 digits
    '40': /^\d{10}$/,               // Romania: 10 digits
    '41': /^\d{10}$/,               // Switzerland: 10 digits
    '42': /^\d{9}$/,                // Slovakia: 9 digits
    '43': /^\d{10}$/,               // Austria: 10 digits
    '44': /^(\d{10}|\d{11})$/,     // UK: 10 or 11 digits (note this is duplicated in the list)
    '45': /^\d{8}$/,                // Denmark: 8 digits
    '46': /^\d{6,11}$/,             // Sweden: 6 to 11 digits
    '47': /^\d{8}$/,                // Norway: 8 digits
    '48': /^\d{9}$/,                // Poland: 9 digits
    '49': /^\d{11,14}$/,            // Germany: 11 to 14 digits (including country code)
    '50': /^\d{10}$/,               // Mongolia: 10 digits
    '51': /^\d{9}$/,                // Peru: 9 digits
    '52': /^\d{10}$/,               // Mexico: 10 digits
    '53': /^\d{8}$/,                // Cuba: 8 digits
    '54': /^\d{10}$/,               // Argentina: 10 digits
    '55': /^\d{11}$/,               // Brazil: 11 digits
    '56': /^\d{9}$/,                // Chile: 9 digits
    '57': /^\d{10}$/,               // Colombia: 10 digits
    '58': /^\d{11}$/,               // Venezuela: 11 digits
    '60': /^\d{9,10}$/,             // Malaysia: 9 or 10 digits
    '61': /^(\d{9}|\d{10})$/,       // Australia: 9 or 10 digits
    '62': /^\d{10,13}$/,            // Indonesia: 10 to 13 digits
    '63': /^\d{10}$/,               // Philippines: 10 digits
    '64': /^\d{9}$/,                // New Zealand: 9 digits
    '65': /^\d{8}$/,                // Singapore: 8 digits
    '66': /^\d{9,10}$/,             // Thailand: 9 or 10 digits
    '81': /^\d{10}$/,               // Japan: 10 digits
    '82': /^\d{10}$/,               // South Korea: 10 digits
    '84': /^\d{10}$/,               // Vietnam: 10 digits
    '86': /^\d{11}$/,               // China: 11 digits
    '90': /^\d{10}$/,               // Turkey: 10 digits
    '92': /^\d{10}$/,               // Pakistan: 10 digits
    '93': /^\d{9}$/,                // Afghanistan: 9 digits
    '94': /^\d{10}$/,               // Sri Lanka: 10 digits
    '98': /^\d{10}$/,               // Iran: 10 digits
    '992': /^\d{9}$/,              // Tajikistan: 9 digits
    '993': /^\d{9}$/,              // Turkmenistan: 9 digits
    '994': /^\d{9}$/,              // Azerbaijan: 9 digits
    '995': /^\d{9}$/,              // Georgia: 9 digits
    '996': /^\d{9}$/,              // Kyrgyzstan: 9 digits
    '998': /^\d{9}$/,              // Uzbekistan: 9 digits
    '213': /^\d{9}$/,              // Algeria: 9 digits
    '216': /^\d{8}$/,              // Tunisia: 8 digits
    '218': /^\d{9}$/,              // Libya: 9 digits
    '220': /^\d{7}$/,              // Gambia: 7 digits
    '221': /^\d{9}$/,              // Senegal: 9 digits
    '222': /^\d{8}$/,              // Mauritania: 8 digits
    '223': /^\d{8}$/,              // Mali: 8 digits
    '224': /^\d{9}$/,              // Guinea: 9 digits
    '225': /^\d{8}$/,              // Côte d'Ivoire: 8 digits
    '226': /^\d{8}$/,              // Burkina Faso: 8 digits
    '227': /^\d{8}$/,              // Niger: 8 digits
    '228': /^\d{8}$/,              // Togo: 8 digits
    '229': /^\d{8}$/,              // Benin: 8 digits
    '230': /^\d{7}$/,              // Mauritius: 7 digits
    '231': /^\d{7}$/,              // Liberia: 7 digits
    '232': /^\d{8}$/,              // Sierra Leone: 8 digits
    '233': /^\d{10}$/,             // Ghana: 10 digits
    '234': /^\d{10}$/,             // Nigeria: 10 digits
    '235': /^\d{8}$/,              // Chad: 8 digits
    '236': /^\d{8}$/,              // Central African Republic: 8 digits
    '237': /^\d{9}$/,              // Cameroon: 9 digits
    '238': /^\d{7}$/,              // Cape Verde: 7 digits
    '239': /^\d{7}$/,              // São Tomé and Príncipe: 7 digits
}

const CreatePO = ({socket}) => {
    const { inquiryId } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [currentDate, setCurrentDate] = useState('');
    const [poNumber, setPONumber] = useState();
    const [orderItems, setOrderItems] = useState([]);
    const [rejectedItems, setRejectedItems] = useState([])
    const [inquiryDetails, setInquiryDetails] = useState();
    const [itemId, setItemId] = useState([])
    const [rejectedItemId, setRejectedItemId] = useState([])
    const [errors, setErrors]    = useState({})
    const [formData, setFormData] = useState({
        purchaseOrderId: '',
        poDate: '',
        poNumber: '',
        description : '',
        poStatus : '',
        buyerId: '',
        buyerName: '',
        buyerAddress: '',
        buyerEmail: '',
        buyerMobile: '',
        buyerCountryCode: '',
        buyerContactPersonMobile: '',
        buyerContactPersonCountryCode: '',
        buyerRegNo: '',
        supplierId: '',
        supplierName: '',
        supplierEmail: '',
        supplierAddress: '',
        supplierMobile: '',
        supplierCountryCode: '',
        supplierContactPersonMobile: '',
        supplierContactPersonCountryCode: '',
        supplierRegNo: '',
        orderItems: [],
    })

    const buyerIdSessionStorage = sessionStorage.getItem("buyer_id");
    const buyerIdLocalStorage = localStorage.getItem("buyer_id");
    let grandTotalAmount = 0;

    useEffect(() => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = today.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;
    
        const generateRandomNumber = () => Math.floor(10000000 + Math.random() * 90000000);
        const generatedInvoiceNumber = generateRandomNumber();
    
        setFormData(prevState => ({
            ...prevState,
            poNumber: generatedInvoiceNumber,
            poDate: formattedDate
        }));
    
        setCurrentDate(formattedDate);
        setPONumber(generatedInvoiceNumber);
    
        const storedItems = sessionStorage.getItem('acceptedQuotationItems');
        const rejectedItems = sessionStorage.getItem('rejectedQuotationItems');
        if (storedItems) {
            try {
                const parsedItems = JSON.parse(storedItems);
                setOrderItems(parsedItems);
                setFormData(prevState => ({
                    ...prevState,
                    orderItems: parsedItems,
                }));
                const itemIds = parsedItems.map(item => item._id);
                setItemId(itemIds);
            } catch (error) {
                console.error('Error parsing stored items:', error);
            }
        }

        if (rejectedItems) {
            try {
                const parsedItems = JSON.parse(rejectedItems);
                setRejectedItems(parsedItems);
                setFormData(prevState => ({
                    ...prevState,
                    rejectedItems: parsedItems,
                }));
                const itemIds = parsedItems.map(item => item._id);
                setRejectedItemId(itemIds);
            } catch (error) {
                console.error('Error parsing stored items:', error);
            }
        }
    }, [inquiryId]);
    
    useEffect(() => {
        if (!buyerIdSessionStorage && !buyerIdLocalStorage) {
            navigate("/buyer/login");
            return;
        }
        const obj = {
            buyer_id: buyerIdSessionStorage || buyerIdLocalStorage,
            enquiry_id: inquiryId,
        };
        postRequestWithToken('buyer/enquiry/enquiry-details', obj, async (response) => {
            if (response.code === 200) {
                setInquiryDetails(response?.result);
                const data = response.result
                const formattedSupplierMobile = `${data?.supplier?.supplier_country_code || ''}-${data?.supplier?.supplier_mobile || ''}`;
                const formattedBuyerMobile = `${data?.buyer?.buyer_country_code || ''}-${data?.buyer?.buyer_mobile || ''}`;

                setFormData(prevFormData => ({
                    ...prevFormData,
                    poId: data.purchaseOrder_id,
              
                    description : data.additional_instructions,
                    supplierId: data?.supplier?.supplier_id,
                    supplierName: data?.supplier?.supplier_name,
                    supplierEmail: data?.supplier?.supplier_email,
                    supplierAddress: data?.supplier?.supplier_address,
                    supplierMobile: formattedSupplierMobile,
                    supplierContactPersonMobile: data?.supplier?.contact_person_mobile_no,
                    supplierContactPersonCountryCode: data?.supplier?.contact_person_country_code,
                    supplierRegNo: data?.supplier?.registration_no,
                    buyerId: data?.buyer?.buyer_id,
                    buyerName: data?.buyer?.buyer_name,
                    buyerEmail: data?.buyer?.buyer_email,
                    buyerAddress : data?.buyer?.buyer_address,
                    buyerMobile: formattedBuyerMobile,
                    buyerRegNo: data?.buyer?.registration_no,
                    orderItems: data?.items,
                }));
            } else {
                console.log('error in order list api', response);
            }
        });
    }, [navigate, buyerIdSessionStorage, buyerIdLocalStorage, inquiryId]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        let newErrors = {};
        let isValid = true;

        if (name === 'description') {
            if (value.length > 1000) {
                newErrors.description = 'Description cannot exceed 1000 characters';
                isValid = false;
            } else {
                newErrors.description = '';
            }
        }
        if (name === 'productName' || name === 'dossierStatus') {
            if (!/^[a-zA-Z\s]*$/.test(value)) {
                isValid = false;
            } else {
                newErrors[name] = '';
            }
        }
        if (name === 'totalQuantity' || name === 'minPurchaseUnit' ) {
            if (!/^\d*$/.test(value)) {
                isValid = false;
            } else {
                newErrors[name] = '';
            }
        }
        if (name === 'unitTax') {
            if (!/^\d*\.?\d*$/.test(value)) {
                isValid = false;
            } else {
                newErrors.unitTax = '';
            }
        }
        if (name === 'buyerRegNo') {
            if (!/^[a-zA-Z0-9]{0,16}$/.test(value)) {
                newErrors.buyerRegNo = '';
                isValid = false;
            } else {
                newErrors.buyerRegNo = '';
            }
        }
        if (isValid) {
            setFormData(prevState => ({ ...prevState, [name]: value }));
        }
        setErrors(prevState => ({ ...prevState, ...newErrors }));
    };

    const validateForm = () => {
        let formErrors = {};
        if(!formData.buyerName) formErrors.buyerName = 'Buyer Name is Required'
        if(!formData.buyerEmail) formErrors.buyerEmail = 'Buyer Email is Required'
        if(!formData.buyerAddress) formErrors.buyerAddress = 'Buyer Address is Required'
        if(!formData.buyerMobile) formErrors.buyerMobile = 'Buyer Mobile is Required'
        if(!formData.buyerRegNo) formErrors.buyerRegNo = 'Buyer VAT Reg No. is Required'
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!buyerIdSessionStorage && !buyerIdLocalStorage) {
            navigate("/buyer/login");
            return;
        }

        if(validateForm()) {
            setLoading(true)
            const updatedOrderItems = orderItems.map((item) => {
                const est_delivery_days = item.est_delivery_days
                const unitTax = item.medicine_details.unit_tax || 0;
                const totalPrice = (item?.counter_price || item?.target_price) * item.quantity_required;
                const totalTax = totalPrice * (unitTax / 100);
                const totalAmount = totalPrice + totalTax;
                // const totalAmount = totalPrice + (unitTax / 100);
    
                return {
                    ...item,
                    totalAmount: totalAmount,
                };
            });
            const newData = {
                ...formData,
                orderItems: updatedOrderItems,
            };
            const obj = {
                buyer_id : buyerIdSessionStorage || buyerIdLocalStorage,
                enquiry_id: inquiryId,
                supplier_id: inquiryDetails?.supplier?.supplier_id,
                itemIds: itemId,
                rejectedIds  :rejectedItemId,
                data: newData,
                grandTotalAmount
            };
            postRequestWithToken('buyer/purchaseorder/create-po', obj, async (response) => {
                if (response.code === 200) {
                    toast(response.message, { type: 'success' })
                    socket.emit('createPO', {
                        supplierId : inquiryDetails?.supplier?.supplier_id, 
                        inquiryId  : inquiryId,
                        message    : `PO created for ${inquiryId}`,
                        link       : process.env.REACT_APP_PUBLIC_URL
                        // send other details if needed
                    });
                    setTimeout(() => {
                        navigate('/buyer/inquiry-purchase-orders/purchased')
                        setLoading(true)
                    }, 1000)
                } else {
                    setLoading(false)
                    console.log('error in order list api', response);
                    toast(response.message, { type: 'error' })
                }
            });
        } else {
            setLoading(false)
            toast('Some Fields are Missing', { type: "error" });
            console.log('errorrrrr', formData);
        }
       
    };

    const formatPhoneNumber = (phoneNumber, countryCode) => {
        const cleanedNumber = phoneNumber.replace(/\D/g, '');
        return `+${countryCode}-${cleanedNumber}`;
    };
    
    const validatePhoneNumber = (phoneNumber, countryCode) => {
    
        const validationRule = phoneValidationRules[countryCode];
        if (validationRule) {
            return validationRule.test(phoneNumber);
        } else {
            return false; 
        }
    };

    const handlePhoneChange = (value, type) => {
        let countryCode = '';
        let mobileNumber = value;
        let isValidNumber = false;
    
        // Extract the country code and the mobile number
        for (let code of countryCodes) {
            if (value.startsWith(code)) {
                countryCode = code.replace('+', ''); 
                mobileNumber = value.substring(code.length); 
                break;
            }
        }
    
        // Validate the phone number based on the country code
        if (countryCode && mobileNumber) {
            isValidNumber = validatePhoneNumber(mobileNumber, countryCode);
    
            if (isValidNumber) {
                const formattedPhoneNumber = formatPhoneNumber(mobileNumber, countryCode);
                console.log("formattedPhoneNumber", formattedPhoneNumber);
    
                // Update formData with the formatted phone number
                setFormData(prevState => ({
                    ...prevState,
                    [type]: formattedPhoneNumber,  // Here, type should be 'buyerMobile' to update the correct field
                }));
            } else {
                setFormData(prevState => ({
                    ...prevState,
                    [type]: '',  // Clear the field if invalid
                }));
                console.error('Invalid phone number format for the specified country code');
            }
        } else {
            setFormData(prevState => ({
                ...prevState,
                [type]: '',  // Clear the field if invalid
            }));
            console.error('Invalid phone number format or unknown country code');
        }
    };

    return (
        <div className={styles['create-invoice-container']}>
            <div className={styles['create-invoice-heading']}>Create Purchase Order</div>
            <form className={styles['create-po-main-form-container']} 
            onSubmit={handleSubmit}>
                
                <div className={styles['create-invoice-section']}>
                    <div className={styles['create-invoice-form-heading']}>Buyer</div>
                    <div className={styles['craete-invoice-form']}>
                        <div className={styles['create-invoice-div-container']}>
                            <label className={styles['create-invoice-div-label']}>Name</label>
                            <input
                                className={styles['create-invoice-div-input']}
                                type='text'
                                name='buyerName'
                                placeholder='Enter Name'
                                value={formData.buyerName}
                                onChange={handleChange}
                                // {...register('buyerName', { validate: value => value.trim() !== '' || 'Buyer name is required' })}
                            />
                            {errors.buyerName && <p style={{color: 'red'}}>{errors.buyerName}</p>}
                        </div>
                        <div className={styles['create-invoice-div-container']}>
                            <label className={styles['create-invoice-div-label']}>Address</label>
                            <input
                                className={styles['create-invoice-div-input']}
                                type='text'
                                name='buyerAddress'
                                placeholder='Enter Address'
                                value={formData.buyerAddress}
                                onChange={handleChange}
                                // {...register('buyerAddress', { validate: value => value.trim() !== '' || 'Buyer address is required' })}
                            />
                            {errors.buyerAddress && <p style={{color: 'red'}}>{errors.buyerAddress}</p>}
                        </div>
                        <div className={styles['create-invoice-div-container']}>
                            <label className={styles['create-invoice-div-label']}>Email ID</label>
                            <input
                                className={styles['create-invoice-div-input']}
                                type='email'
                                name='buyerEmail'
                                placeholder='Enter Email ID'
                                value={formData.buyerEmail}
                                onChange={handleChange}
                                // {...register('buyerEmail', { validate: value => value.trim() !== '' || 'Buyer email is required' })}
                            />
                            {errors.buyerEmail && <p style={{color: 'red'}}>{errors.buyerEmail}</p>}
                        </div>
                        <div className={styles['create-invoice-div-container']}>
                            <label className={styles['create-invoice-div-label']}>Mobile Number</label>
                            <PhoneInput
                                className='signup-form-section-phone-input'
                                defaultCountry="ae"
                                name='buyerMobile'
                                // value={watch('buyerMobile')}
                                value={formData.buyerMobile}
                                //  onChange={handleBuyerPhoneChange}
                                onChange={(value) => handlePhoneChange(value, 'buyerMobile')}
                           
                            />
                            {errors.buyerMobile && <p style={{color: 'red'}}>{errors.buyerMobile}</p>}
                        </div>
                        <div className={styles['create-invoice-div-container']}>
                            <label className={styles['create-invoice-div-label']}>Company Registration Number</label>
                            <input
                                className={styles['create-invoice-div-input']}
                                type='text'
                                name='buyerRegNo'
                                placeholder='Enter Company Registration Number'
                                value={formData.buyerRegNo}
                                onChange={handleChange}
                                // {...register('buyerRegNo', { validate: value => value?.trim() !== '' || 'Buyer registration number is required' })}
                            />
                            {errors.buyerRegNo && <p style={{color: 'red'}}>{errors.buyerRegNo}</p>}
                        </div>
                    </div>
                </div>
                <div className={styles['create-invoice-section']}>
                    <div className={styles['create-invoice-form-heading']}>Supplier</div>
                    <div className={styles['craete-invoice-form']}>
                        <div className={styles['create-invoice-div-container']}>
                            <label className={styles['create-invoice-div-label']}>PO Date</label>
                            <input
                                className={styles['create-invoice-div-input']}
                                type='text'
                                name='poDate'
                                value={currentDate}
                                readOnly
                                // {...register('poDate')}
                                // value={formData.buyerName}
                            />
                        </div>
                        <div className={styles['create-invoice-div-container']}>
                            <label className={styles['create-invoice-div-label']}>PO Number</label>
                            <input
                                className={styles['create-invoice-div-input']}
                                type='text'
                                name='poNumber'
                                value={poNumber}
                                readOnly
                                // {...register('poNumber')}
                            />
                        </div>
                        <div className={styles['create-invoice-div-container']}>
                            <label className={styles['create-invoice-div-label']}>Name</label>
                            <input
                                className={styles['create-invoice-div-input']}
                                type='text'
                                name='supplierName'
                                placeholder='Enter Name'
                                readOnly
                                value={formData.supplierName}
                                // {...register('supplierName', { validate: value => value?.trim() !== '' || 'Supplier name is required' })}
                            />
                            {errors.supplierName && <p>{errors.supplierName.message}</p>}
                        </div>
                        <div className={styles['create-invoice-div-container']}>
                            <label className={styles['create-invoice-div-label']}>Address</label>
                            <input
                                className={styles['create-invoice-div-input']}
                                type='text'
                                name='supplierAddress'
                                placeholder='Enter Address'
                                value={formData.supplierAddress}
                                readOnly
                                // {...register('supplierAddress', { validate: value => value?.trim() !== '' || 'Supplier address is required' })}
                            />
                            {errors.supplierAddress && <p>{errors.supplierAddress.message}</p>}
                        </div>
                        <div className={styles['create-invoice-div-container']}>
                            <label className={styles['create-invoice-div-label']}>Email ID</label>
                            <input
                                className={styles['create-invoice-div-input']}
                                type='email'
                                name='supplierEmail'
                                placeholder='Enter Email ID'
                                value={formData.supplierEmail}
                                readOnly
                                // {...register('supplierEmail', { validate: value => value?.trim() !== '' || 'Supplier email is required' })}
                            />
                            {errors.supplierEmail && <p>{errors.supplierEmail.message}</p>}
                        </div>
                        <div className={styles['create-invoice-div-container']}>
                            <label className={styles['create-invoice-div-label']}>Mobile Number</label>
                            <PhoneInput
                                className='signup-form-section-phone-input'
                                defaultCountry="ae"
                                name='supplierMobile'
                                // value={watch('supplierMobile')}
                                value={formData.supplierMobile}
                                disabled
                                // onChange={handleSupplierPhoneChange}
                                // onChange={(value) => handlePhoneChange(value, 'supplierMobile')}
                                
                            />
                            {errors.supplierMobile && <p>{errors.supplierMobile.message}</p>}
                        </div>
                        <div className={styles['create-invoice-div-container']}>
                            <label className={styles['create-invoice-div-label']}>Company Registration Number</label>
                            <input
                                className={styles['create-invoice-div-input']}
                                type='text'
                                name='supplierRegNo'
                                readOnly
                                placeholder='Enter Company Registration Number'
                                value={formData.supplierRegNo}
                                // {...register('supplierRegNo', { validate: value => value?.trim() !== '' || 'Supplier registration number is required' })}
                            />
                            {errors.supplierRegNo && <p>{errors.supplierRegNo.message}</p>}
                        </div>
                    </div>
                </div>
                <div className={styles['create-invoice-section']}>
                    <div className={styles['create-invoice-add-item-cont']}>
                        <div className={styles['create-invoice-form-heading']}>Order Details</div>
                    </div>
                    {orderItems?.map((item, index) => {
                        const unitTax = item.medicine_details.unit_tax || 0
                        const totalPrice = (item?.counter_price || item?.target_price) * item.quantity_required
                        const totalTax = totalPrice * (unitTax / 100)
                        const totalAmount = totalPrice + totalTax
                        grandTotalAmount += totalAmount;
                        grandTotalAmount = parseFloat(grandTotalAmount.toFixed(2));
                        return (
                            <div className={styles['form-item-container']} key={item._id}>
                                <div className={styles['craete-invoice-form']}>
                                    <div className={styles['create-invoice-div-container']}>
                                        <label className={styles['create-invoice-div-label']}>Item Name</label>
                                        <input
                                            className={styles['create-invoice-div-input']}
                                            type='text'
                                            name={`orderItems[${index}].productName`}
                                            placeholder='Item Name'
                                            // defaultValue={item?.medicine_details?.medicine_name}
                                            // {...register(`orderItems[${index}].productName`, { validate: value => value.trim() !== '' || 'Product name is required' })}
                                            value={item?.medicine_details?.medicine_name}
                                            readOnly
                                        />
                                        {errors.orderItems?.[index]?.productName && <p>{errors.orderItems[index].productName.message}</p>}
                                    </div>
                                    <div className={styles['create-invoice-div-container']}>
                                        <label className={styles['create-invoice-div-label']}>Quantity</label>
                                        <input
                                            className={styles['create-invoice-div-input']}
                                            type='text'
                                            name={`orderItems[${index}].quantity`}
                                            placeholder='Enter Quantity'
                                            // defaultValue={item?.quantity_required}
                                            // {...register(`orderItems[${index}].quantity`, { validate: value => value.trim() !== '' || 'Quantity is required' })}
                                            value={item?.quantity_required}
                                            readOnly
                                        />
                                        {errors.orderItems?.[index]?.quantity && <p>{errors.orderItems[index].quantity.message}</p>}
                                    </div>
                                    <div className={styles['create-invoice-div-container']}>
                                        <label className={styles['create-invoice-div-label']}>Price</label>
                                        <input
                                            className={styles['create-invoice-div-input']}
                                            type='text'
                                            name={`orderItems[${index}].unitPrice`}
                                            placeholder='Enter Price'
                                            // defaultValue={item?.unit_price}
                                            // {...register(`orderItems[${index}].unitPrice`, { validate: value => value.trim() !== '' || 'Unit price is required' })}
                                            value={item?.counter_price || item?.target_price}
                                            readOnly
                                        />
                                        {errors.orderItems?.[index]?.unitPrice && <p>{errors.orderItems[index].unitPrice.message}</p>}
                                    </div>
                                    <div className={styles['create-invoice-div-container']}>
                                        <label className={styles['create-invoice-div-label']}>Tax%</label>
                                        <input
                                            className={styles['create-invoice-div-input']}
                                            type='text'
                                            name={`orderItems[${index}].unitTax`}
                                            placeholder='Enter Unit Tax'
                                            value={item?.medicine_details?.unit_tax}
                                            readOnly
                                        />
                                        {errors.orderItems?.[index]?.unitTax && <p>{errors.orderItems[index].unitTax.message}</p>}
                                    </div>
                                    <div className={styles['create-invoice-div-container']}>
                                        <label className={styles['create-invoice-div-label']}>Total Amount</label>
                                        <input
                                            className={styles['create-invoice-div-input']}
                                            type='text'
                                            name={`orderItems[${index}].totalAmount`}
                                            placeholder='Enter Total Amount'
                                            // defaultValue={item?.counter_price || item?.target_price}
                                            // {...register(`orderItems[${index}].totalAmount`, { validate: value => value.trim() !== '' || 'Total amount is required' })}
                                            value={totalAmount.toFixed(2)}
                                            readOnly
                                        />
                                        {errors.orderItems?.[index]?.totalAmount && <p>{errors.orderItems[index].totalAmount.message}</p>}
                                    </div>
                                </div>
                            </div>
                        )
                    }


                    )}
                </div>
                <div className={styles['create-invoice-section']}>
                    <div className={styles['create-invoice-form-heading']}>Additional Instructions</div>
                    <div className={styles['craete-invoice-form']}>
                        <div className={styles['create-invoice-div-textarea']}>
                            <label className={styles['create-invoice-div-label']}>Description</label>
                            <textarea
                                className={styles['create-invoice-div-input']}
                                name="description"
                                rows="4"
                                cols="10"
                                placeholder='Enter Description'
                                onChange={handleChange}
                                // {...register('description')}
                            />
                        </div>
                        {/* <div className={styles['create-invoice-div-textarea']}>
                            <label className={styles['create-invoice-div-label']}>Payment Terms</label>
                            <textarea
                                className={styles['create-invoice-div-input']}
                                name="description"
                                rows="4"
                                cols="10"
                                placeholder='Enter Payment Terms'
                                {...register('description')}
                            />
                        </div> */}
                    </div>
                </div>
                <div className={styles['craete-invoices-button']}>
                    <button
                     type='submit'
                      className={styles['create-invoices-submit']}
                      disabled={loading}
                      >
                        {/* Submit */}
                        {loading ? (
                                <div className='loading-spinner'></div> 
                            ) : (
                                'Submit'
                            )}
                      </button>
                    
                    {/* <div className={styles['create-invoices-cancel']}>Cancel</div> */}
                </div>
            </form>
        </div>
    );
};

export default CreatePO;