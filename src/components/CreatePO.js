import React, { useEffect, useState } from 'react';
import styles from '../style/createInvoice.module.css';
import CloseIcon from '@mui/icons-material/Close';
import Select from 'react-select';
import CreatePOImageUpload from './CreatePOImageUpload';
import { useNavigate, useParams } from 'react-router-dom';
import { postRequestWithToken } from '../api/Requests';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';

// const CreatePO = () => {
//     const { inquiryId } = useParams()
//     const navigate      = useNavigate();

//     const [formItems, setFormItems] = useState([{ id: Date.now(), productName: '' }]);

//     const productOptions = [
//         { value: 'Product1', label: 'Product 1' },
//         { value: 'Product2', label: 'Product 2' },
//         { value: 'Product3', label: 'Product 3' }
//     ];

//     const addFormItem = () => {
//         setFormItems([...formItems, { id: Date.now(), productName: '' }]);
//     };

//     const removeFormItem = (id) => {
//         setFormItems(formItems.filter(item => item.id !== id));
//     };

//     const handleProductChange = (selectedOption, index) => {
//         const newFormItems = [...formItems];
//         newFormItems[index].productName = selectedOption.value;
//         setFormItems(newFormItems);
//     };

//     const [currentDate, setCurrentDate] = useState('');
//     const [poNumber, setPONumber] = useState()
//     const [orderItems, setOrderItems] = useState([])

//   useEffect(() => {
//     const today = new Date();
//     const day = String(today.getDate()).padStart(2, '0');
//     const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
//     const year = today.getFullYear();
//     setCurrentDate(`${day}-${month}-${year}`);

//     const generateRandomNumber = () => Math.floor(10000000 + Math.random() * 90000000);
//     setPONumber(generateRandomNumber());

//     const storedItems = sessionStorage.getItem('acceptedQuotationItems');
//     if (storedItems) {
//       try {
//         const parsedItems = JSON.parse(storedItems);
//         setOrderItems(parsedItems);
//       } catch (error) {
//         console.error('Error parsing stored items:', error);
//       }
//     }
//   }, []);

//     const buyerIdSessionStorage = sessionStorage.getItem("buyer_id");
//     const buyerIdLocalStorage   = localStorage.getItem("buyer_id");
 
//     const [inquiryDetails, setInquiryDetails] = useState()

//     useEffect(() => {
//         if (!buyerIdSessionStorage && !buyerIdLocalStorage) {
//             navigate("/buyer/login");
//             return;
//         }
//         const obj = {
//             buyer_id    : buyerIdSessionStorage || buyerIdLocalStorage,
//             enquiry_id  : inquiryId
//         }
//         postRequestWithToken('buyer/enquiry/enquiry-details', obj, async (response) => {
//             if (response.code === 200) {
//                 setInquiryDetails(response?.result)
//             } else {
//                 console.log('error in order list api', response);
//             }
//         })
//     }, [])

//     const handleSubmit = () => {

//     }

//     return (
//         <div className={styles['create-invoice-container']}>
//             <div className={styles['create-invoice-heading']}>Create Purchased Order</div>
//             <form className={styles['create-po-main-form-container']}>
//                 <div className={styles['create-invoice-section']}>
//                     <div className={styles['create-invoice-form-heading']}>Supplier</div>
//                     <div className={styles['craete-invoice-form']}>
//                         <div className={styles['create-invoice-div-container']}>
//                             <label className={styles['create-invoice-div-label']}>PO Date</label>
//                             <input className={styles['create-invoice-div-input']} type='text' 
//                                 name='InvoiceDate' placeholder='Enter PO Date' 
//                                 value={currentDate}
//                                 readOnly
//                             />
//                         </div>
//                         <div className={styles['create-invoice-div-container']}>
//                             <label className={styles['create-invoice-div-label']}>PO Number</label>
//                             <input className={styles['create-invoice-div-input']} type='text'
//                                 name='InvoiceNumber' placeholder='Enter PO Number'
//                                 value={poNumber}
//                                 readOnly
//                               />
//                         </div>
//                         <div className={styles['create-invoice-div-container']}>
//                             <label className={styles['create-invoice-div-label']}>Name</label>
//                             <input className={styles['create-invoice-div-input']} type='text' 
//                             name='Name' placeholder='Enter Name' 
//                             defaultValue={inquiryDetails?.supplier?.supplier_name} />
//                         </div>
//                         <div className={styles['create-invoice-div-container']}>
//                             <label className={styles['create-invoice-div-label']}>Address</label>
//                             <input className={styles['create-invoice-div-input']} type='text' 
//                             name='Address' placeholder='Enter Address' 
//                             defaultValue={inquiryDetails?.supplier?.supplier_address} />
//                         </div>
//                         <div className={styles['create-invoice-div-container']}>
//                             <label className={styles['create-invoice-div-label']}>Email ID</label>
//                             <input className={styles['create-invoice-div-input']} type='text' 
//                             name='Address' placeholder='Enter Email ID' 
//                             defaultValue={inquiryDetails?.supplier?.contact_person_email}/>
//                         </div>
//                         <div className={styles['create-invoice-div-container']}>
//                             <label className={styles['create-invoice-div-label']}>Mobile Number</label>
//                             <input className={styles['create-invoice-div-input']} type='text' 
//                             name='Address' placeholder='Enter Mobile No.' 
//                             defaultValue={inquiryDetails?.supplier?.contact_person_mobile_no}/>
//                         </div>
//                         <div className={styles['create-invoice-div-container']}>
//                             <label className={styles['create-invoice-div-label']}>Company Registration Number</label>
//                             <input className={styles['create-invoice-div-input']} type='text' 
//                             name='Address' placeholder='Enter Company Registration Number' />
//                         </div>

//                     </div>
//                 </div>
//                 <div className={styles['create-invoice-section']}>
//                     <div className={styles['create-invoice-form-heading']}>Buyer</div>
//                     <div className={styles['craete-invoice-form']}>
//                         <div className={styles['create-invoice-div-container']}>
//                             <label className={styles['create-invoice-div-label']}>Name</label>
//                             <input className={styles['create-invoice-div-input']} type='text' 
//                             name='Name' placeholder='Enter Name' 
//                             value={inquiryDetails?.buyer?.buyer_name}  />
//                         </div>
//                         <div className={styles['create-invoice-div-container']}>
//                             <label className={styles['create-invoice-div-label']}>Address</label>
//                             <input className={styles['create-invoice-div-input']} type='text' 
//                             name='Address' placeholder='Enter Address' 
//                             defaultValue={inquiryDetails?.buyer?.buyer_address}   />
//                         </div>
//                         <div className={styles['create-invoice-div-container']}>
//                             <label className={styles['create-invoice-div-label']}>Email ID</label>
//                             <input className={styles['create-invoice-div-input']} type='text' 
//                             name='Address' placeholder='Enter Email ID' 
//                             defaultValue={inquiryDetails?.buyer?.contact_person_email}/>
//                         </div>
//                         <div className={styles['create-invoice-div-container']}>
//                             <label className={styles['create-invoice-div-label']}>Mobile Number</label>
//                             <input className={styles['create-invoice-div-input']} type='text' 
//                             name='Address' placeholder='Enter Mobile No.'
//                             defaultValue={inquiryDetails?.buyer?.contact_person_mobile} />
//                         </div>
//                         <div className={styles['create-invoice-div-container']}>
//                             <label className={styles['create-invoice-div-label']}>Company Registration Number</label>
//                             <input className={styles['create-invoice-div-input']} type='text' 
//                             name='Address' placeholder='Enter Company Registration Number'
//                              />
//                         </div>
//                     </div>
//                 </div>
//                 <div className={styles['create-invoice-section']}>
//                     <div className={styles['create-invoice-add-item-cont']}>
//                         <div className={styles['create-invoice-form-heading']}>Order Details</div>
//                         {/* <span className={styles['create-invoice-add-tem-button']} onClick={addFormItem}>Add More</span> */}
//                     </div>
//                     {/* {formItems.map((item, index) => ( */}
//                     {
//                         orderItems?.map((item, i) => {
//                             return (
//                                 <div className={styles['form-item-container']} key={item.id}>
//                             <div className={styles['craete-invoice-form']}>
//                                 <div className={styles['create-invoice-div-container']}>
//                                     <label className={styles['create-invoice-div-label']}>Product Name</label>
//                                     {/* <Select
//                                         className={styles['create-invoice-div-selects']}
//                                         options={productOptions}
//                                         value={productOptions.find(option => option.value === item.productName)}
//                                         onChange={(selectedOption) => handleProductChange(selectedOption, index)}
//                                     /> */}
//                                     <input className={styles['create-invoice-div-input']} type='text' 
//                                     name={`pdtName-${item.id}`} placeholder='Product Name' 
//                                     value={item?.medicine_details?.medicine_name}/>
//                                 </div>
//                                 <div className={styles['create-invoice-div-container']}>
//                                     <label className={styles['create-invoice-div-label']}>Quantity</label>
//                                     <input className={styles['create-invoice-div-input']} 
//                                     type='text' name={`Qty-${item.id}`} 
//                                     placeholder='Enter Quantity' 
//                                     value={item?.quantity_required}/>
//                                 </div>
//                                 <div className={styles['create-invoice-div-container']}>
//                                     <label className={styles['create-invoice-div-label']}>Unit Price</label>
//                                     <input className={styles['create-invoice-div-input']} 
//                                     type='text' name={`UnitPrice-${item.id}`} 
//                                     placeholder='Enter Unit Price' 
//                                     value={item?.unit_price} />
//                                 </div>
//                                 <div className={styles['create-invoice-div-container']}>
//                                     <label className={styles['create-invoice-div-label']}>Total Amount</label>
//                                     <input className={styles['create-invoice-div-input']} type='text'
//                                     name={`TotalAmount-${item.id}`} placeholder='Enter Total Amount' 
//                                     value={item?.counter_price || item?.target_price}/>
//                                 </div>
//                             </div>
//                             {/* {formItems.length > 1 && (
//                                 <div className={styles['create-invoice-close-btn']} onClick={() => removeFormItem(item.id)}>
//                                     <CloseIcon />
//                                 </div>
//                             )} */}
//                         </div>
//                             )
//                         })
//                     }
                        
//                     {/* ))} */}
//                 </div>
//                 {/* <div className={styles['create-invoice-section']}>
//                     <div className={styles['create-invoice-form-heading']}>Payment Information</div>
//                     <div className={styles['craete-invoice-form']}>
//                         <div className={styles['create-invoice-div-container']}>
//                             <label className={styles['create-invoice-div-label']}>Account Number</label>
//                             <input className={styles['create-invoice-div-input']} type='text' name='AccountNumber' placeholder='Enter Account Number' />
//                         </div>
//                         <div className={styles['create-invoice-div-container']}>
//                             <label className={styles['create-invoice-div-label']}>Sort Code</label>
//                             <input className={styles['create-invoice-div-input']} type='text' name='SortCode' placeholder='Enter Sort Code' />
//                         </div>
//                     </div>
//                 </div> */}
//                 <div className={styles['create-invoice-section']}>
//                     <div className={styles['create-invoice-form-heading']}>Additional Instructions</div>
//                     <div className={styles['craete-invoice-form']}>
//                         <div className={styles['create-invoice-div-textarea']}>
//                             <label className={styles['create-invoice-div-label']}>Description</label>
//                             <textarea
//                                 className={styles['create-invoice-div-input']}
//                                 name="description"
//                                 rows="4"
//                                 cols="10"
//                                 placeholder='Enter Description'
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 {/* <div className={styles['create-invoice-section']}>
//                     <div className={styles['create-invoice-upload-purchase']}>
//                         <div className={styles['create-invoice-form-heading']}>Upload Company Logo</div>
//                         <CreatePOImageUpload />
//                     </div>
//                 </div> */}
//                 <div className={styles['craete-invoices-button']}>
//                     <div className={styles['create-invoices-cancel']}>Cancel</div>
//                     <div className={styles['create-invoices-submit']} >Submit</div>
//                 </div>
//             </form>
//         </div>
//     );
// }


const CreatePO = () => {
    const { inquiryId } = useParams();
    const navigate = useNavigate();

    const [currentDate, setCurrentDate] = useState('');
    const [poNumber, setPONumber] = useState();
    const [orderItems, setOrderItems] = useState([]);
    const [inquiryDetails, setInquiryDetails] = useState();
    const [itemId, setItemId] = useState([])

    const buyerIdSessionStorage = sessionStorage.getItem("buyer_id");
    const buyerIdLocalStorage = localStorage.getItem("buyer_id");

    const { register, handleSubmit, control, setValue, watch, formState: { errors } } = useForm({
        defaultValues: {
            poDate: '',
            poNumber: '',
            supplierName: '',
            supplierAddress: '',
            supplierEmail: '',
            supplierMobile: '',
            supplierRegNo: '',
            buyerName: '',
            buyerAddress: '',
            buyerEmail: '',
            buyerMobile: '',
            buyerRegNo: '',
            orderItems: [],
            description: ''
        }
    });

    useEffect(() => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = today.getFullYear();
        setCurrentDate(`${day}-${month}-${year}`);
        setValue('poDate', `${day}-${month}-${year}`);

        const generateRandomNumber = () => Math.floor(10000000 + Math.random() * 90000000);
        setPONumber(generateRandomNumber());
        setValue('poNumber', generateRandomNumber());

        const storedItems = sessionStorage.getItem('acceptedQuotationItems');
        if (storedItems) {
            try {
                const parsedItems = JSON.parse(storedItems);
                setOrderItems(parsedItems);
                setValue('orderItems', parsedItems);
                const itemIds = parsedItems.map(item => item._id);
                setItemId(itemIds);
            } catch (error) {
                console.error('Error parsing stored items:', error);
            }
        }
    }, [setValue]);

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
                setValue('supplierName', response?.result?.supplier?.supplier_name);
                setValue('supplierAddress', response?.result?.supplier?.supplier_address);
                setValue('supplierEmail', response?.result?.supplier?.contact_person_email);
                setValue('supplierMobile', response?.result?.supplier?.contact_person_mobile_no);
                setValue('buyerName', response?.result?.buyer?.buyer_name);
                setValue('buyerAddress', response?.result?.buyer?.buyer_address);
                setValue('buyerEmail', response?.result?.buyer?.contact_person_email);
                setValue('buyerMobile', response?.result?.buyer?.contact_person_mobile);
            } else {
                console.log('error in order list api', response);
            }
        });
    }, [navigate, buyerIdSessionStorage, buyerIdLocalStorage, inquiryId, setValue]);

    const onSubmit = (data) => {
        console.log(data);
        if (!buyerIdSessionStorage && !buyerIdLocalStorage) {
            navigate("/buyer/login");
            return;
        }
        const obj = {
            buyer_id    : buyerIdSessionStorage || buyerIdLocalStorage,
            enquiry_id  : inquiryId,
            supplier_id : inquiryDetails?.supplier?.supplier_id,
            itemIds     : itemId,
            data
        };
        postRequestWithToken('buyer/purchaseorder/create-po', obj, async (response) => {
            if (response.code === 200) {
                toast(response.message, {type: 'success'})
                setTimeout(() => {
                    navigate('/buyer/inquiry-purchase-orders/purchased')
                },1000)
                
            } else {
                console.log('error in order list api', response);
                toast(response.message, {type: 'error'})
            }
        });
        // Handle form submission with data
    };

    return (
        <div className={styles['create-invoice-container']}>
            <div className={styles['create-invoice-heading']}>Create Purchase Order</div>
            <form className={styles['create-po-main-form-container']} onSubmit={handleSubmit(onSubmit)}>
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
                                {...register('poDate')}
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
                                {...register('poNumber')}
                            />
                        </div>
                        <div className={styles['create-invoice-div-container']}>
                            <label className={styles['create-invoice-div-label']}>Name</label>
                            <input
                                className={styles['create-invoice-div-input']}
                                type='text'
                                name='supplierName'
                                placeholder='Enter Name'
                                {...register('supplierName', { validate: value => value.trim() !== '' || 'Supplier name is required' })}
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
                                {...register('supplierAddress', { validate: value => value.trim() !== '' || 'Supplier address is required' })}
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
                                {...register('supplierEmail', { validate: value => value.trim() !== '' || 'Supplier email is required' })}
                            />
                            {errors.supplierEmail && <p>{errors.supplierEmail.message}</p>}
                        </div>
                        <div className={styles['create-invoice-div-container']}>
                            <label className={styles['create-invoice-div-label']}>Mobile Number</label>
                            <input
                                className={styles['create-invoice-div-input']}
                                type='text'
                                name='supplierMobile'
                                placeholder='Enter Mobile No.'
                                {...register('supplierMobile', { validate: value => value.trim() !== '' || 'Supplier mobile number is required' })}
                            />
                            {errors.supplierMobile && <p>{errors.supplierMobile.message}</p>}
                        </div>
                        <div className={styles['create-invoice-div-container']}>
                            <label className={styles['create-invoice-div-label']}>Company Registration Number</label>
                            <input
                                className={styles['create-invoice-div-input']}
                                type='text'
                                name='supplierRegNo'
                                placeholder='Enter Company Registration Number'
                                {...register('supplierRegNo', { validate: value => value.trim() !== '' || 'Supplier registration number is required' })}
                            />
                            {errors.supplierRegNo && <p>{errors.supplierRegNo.message}</p>}
                        </div>
                    </div>
                </div>
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
                                {...register('buyerName', { validate: value => value.trim() !== '' || 'Buyer name is required' })}
                            />
                            {errors.buyerName && <p>{errors.buyerName.message}</p>}
                        </div>
                        <div className={styles['create-invoice-div-container']}>
                            <label className={styles['create-invoice-div-label']}>Address</label>
                            <input
                                className={styles['create-invoice-div-input']}
                                type='text'
                                name='buyerAddress'
                                placeholder='Enter Address'
                                {...register('buyerAddress', { validate: value => value.trim() !== '' || 'Buyer address is required' })}
                            />
                            {errors.buyerAddress && <p>{errors.buyerAddress.message}</p>}
                        </div>
                        <div className={styles['create-invoice-div-container']}>
                            <label className={styles['create-invoice-div-label']}>Email ID</label>
                            <input
                                className={styles['create-invoice-div-input']}
                                type='email'
                                name='buyerEmail'
                                placeholder='Enter Email ID'
                                {...register('buyerEmail', { validate: value => value.trim() !== '' || 'Buyer email is required' })}
                            />
                            {errors.buyerEmail && <p>{errors.buyerEmail.message}</p>}
                        </div>
                        <div className={styles['create-invoice-div-container']}>
                            <label className={styles['create-invoice-div-label']}>Mobile Number</label>
                            <input
                                className={styles['create-invoice-div-input']}
                                type='text'
                                name='buyerMobile'
                                placeholder='Enter Mobile No.'
                                {...register('buyerMobile', { validate: value => value.trim() !== '' || 'Buyer mobile number is required' })}
                            />
                            {errors.buyerMobile && <p>{errors.buyerMobile.message}</p>}
                        </div>
                        <div className={styles['create-invoice-div-container']}>
                            <label className={styles['create-invoice-div-label']}>Company Registration Number</label>
                            <input
                                className={styles['create-invoice-div-input']}
                                type='text'
                                name='buyerRegNo'
                                placeholder='Enter Company Registration Number'
                                {...register('buyerRegNo', { validate: value => value.trim() !== '' || 'Buyer registration number is required' })}
                            />
                            {errors.buyerRegNo && <p>{errors.buyerRegNo.message}</p>}
                        </div>
                    </div>
                </div>
                <div className={styles['create-invoice-section']}>
                    <div className={styles['create-invoice-add-item-cont']}>
                        <div className={styles['create-invoice-form-heading']}>Order Details</div>
                    </div>
                    {orderItems?.map((item, index) => (
                        <div className={styles['form-item-container']} key={item._id}>
                            <div className={styles['craete-invoice-form']}>
                                <div className={styles['create-invoice-div-container']}>
                                    <label className={styles['create-invoice-div-label']}>Product Name</label>
                                    <input
                                        className={styles['create-invoice-div-input']}
                                        type='text'
                                        name={`orderItems[${index}].productName`}
                                        placeholder='Product Name'
                                        // defaultValue={item?.medicine_details?.medicine_name}
                                        // {...register(`orderItems[${index}].productName`, { validate: value => value.trim() !== '' || 'Product name is required' })}
                                        value = {item?.medicine_details?.medicine_name}
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
                                        value = {item?.quantity_required}
                                        readOnly
                                    />
                                    {errors.orderItems?.[index]?.quantity && <p>{errors.orderItems[index].quantity.message}</p>}
                                </div>
                                <div className={styles['create-invoice-div-container']}>
                                    <label className={styles['create-invoice-div-label']}>Unit Price</label>
                                    <input
                                        className={styles['create-invoice-div-input']}
                                        type='text'
                                        name={`orderItems[${index}].unitPrice`}
                                        placeholder='Enter Unit Price'
                                        // defaultValue={item?.unit_price}
                                        // {...register(`orderItems[${index}].unitPrice`, { validate: value => value.trim() !== '' || 'Unit price is required' })}
                                        value = {item?.unit_price}
                                        readOnly
                                    />
                                    {errors.orderItems?.[index]?.unitPrice && <p>{errors.orderItems[index].unitPrice.message}</p>}
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
                                        value = {item?.counter_price || item?.target_price}
                                        readOnly
                                    />
                                    {errors.orderItems?.[index]?.totalAmount && <p>{errors.orderItems[index].totalAmount.message}</p>}
                                </div>
                            </div>
                        </div>
                    ))}
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
                                {...register('description')}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles['craete-invoices-button']}>
                    <div className={styles['create-invoices-cancel']}>Cancel</div>
                    <button type='submit' className={styles['create-invoices-submit']}>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default CreatePO;