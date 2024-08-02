import React, { useState, useEffect } from 'react';
import styles from '../style/addproduct.module.css';
import Select, { components } from 'react-select';
import countryList from 'react-select-country-list';
import ImageAddUploader from './ImageAppUploader';
import CloseIcon from '@mui/icons-material/Close';
import AddPdfUpload from './AddPdfUpload';
import { useNavigate, useParams } from 'react-router-dom';
import { postRequest } from '../api/Requests';

const MultiSelectOption = ({ children, ...props }) => (
    <components.Option {...props}>
        <input
            type="checkbox"
            checked={props.isSelected}
            onChange={() => null}
        />{" "}
        <label>{children}</label>
    </components.Option>
);

const MultiSelectDropdown = ({ options, value, onChange }) => {
    return (
        <Select
            options={options}
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            components={{ Option: MultiSelectOption }}
            onChange={onChange}
            value={value}
        />
    );
};

const EditSecondaryProduct = () => {

    const { medicineId } = useParams()
    const navigate       = useNavigate()

    const [medicineDetails, setMedicineDetails] = useState()
    const [medId, setMedId] = useState(medicineId)

    const productTypeOptions = [
        { value: 'secondary_market', label: 'Secondary Market' }
    ];

    const formTypes = [
        { value: 'tablet', label: 'Tablet' },
        { value: 'syrup', label: 'Syrup' }
    ];
    const conditionOptions = [
        { value: 'new', label: 'New' },
        { value: 'used', label: 'Used' },
        { value: 'refurbished', label: 'Refurbished' }
    ];

    const quantityOptions = [
        { value: '0-500', label: '0-500' },
        { value: '500-1000', label: '500-1000' },
        { value: '1000-2000', label: '1000-2000' },
        { value: '2000-5000', label: '2000-5000' },
    ];
    const productCategoryOptions = [
        { value: 'generies', label: 'Generies' },
        { value: 'orignals', label: 'Orignals' },
        { value: 'biosimilars', label: 'Biosimilars' },
        { value: 'medicaldevices', label: 'Medical Devices' },
        { value: 'nutraceuticals', label: 'Nutraceuticals' }
    ];

    const [productType, setProductType] = useState({ value: 'secondary_market', label: 'Secondary Market' });
    const [formSections, setFormSections] = useState([
        {
            strength: '',
            quantity: null,
            typeOfForm: null,
            productCategory: null,
            unitPrice: '',
            estDeliveryTime: '',
            condition: ''
        }
    ]);
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const countryOptions = countryList().getData();
        setCountries(countryOptions);
    }, []);
    const handleConditionChange = (index, selected) => {
        const newFormSections = [...formSections];
        newFormSections[index].condition = selected;
        setFormSections(newFormSections);
    };
    const handleQuantityChange = (index, selected) => {
        const newFormSections = [...formSections];
        newFormSections[index].quantity = selected;
        setFormSections(newFormSections);
    };

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newFormSections = [...formSections];
        newFormSections[index][name] = value;
        setFormSections(newFormSections);
    };
    const addFormSection = () => {
        setFormSections([
            ...formSections,
            {
                strength: '',
                quantity: null,
                typeOfForm: null,
                totalPrice: '',
                unitPrice: '',
                shelfLife: '',
                estDeliveryTime: '',
                condition: ''
            }
        ]);
    };

    const removeFormSection = (index) => {
        if (formSections.length > 1) {
            const newFormSections = formSections.filter((_, i) => i !== index);
            setFormSections(newFormSections);
        }
    };

    const handleProductTypeChange = (selected) => {
        setProductType(selected);
    };

    useEffect(() => {
        const supplierIdSessionStorage = sessionStorage.getItem("supplier_id");
        const supplierIdLocalStorage   = localStorage.getItem("supplier_id");

        if (!supplierIdSessionStorage && !supplierIdLocalStorage) {
            navigate("/supplier/login");
            return;
        }
        
        const obj = {
            medicine_id : medId,
            supplier_id : supplierIdSessionStorage || supplierIdLocalStorage 
        }
        
        postRequest('buyer/medicine/medicine-details', obj, async (response) => {
            if (response.code === 200) {
                setMedicineDetails(response?.result?.data)
            } else {
               console.log('error in med details api');
            }
          })
    },[])

    const [defaultFormType, setDefaultFormType] = useState(null);
    const [defaultCategory, setDefaultCategory] = useState(null)
    const [defaultCountryOfOrigin, setDefaultCountryOfOrigin] = useState(null)
    const [defaultRegisteredIn, setDefaultRegisteredIn] = useState([])
    const [inventoryInfo, setInventoryInfo] = useState([]);
    const [defaultStockedIn, setDefaultStockedIn] = useState([])
    const [defaultCountryAvailableIn, setDefaultCountryAvailableIn] = useState([])

    useEffect(() => {
        if (medicineDetails?.type_of_form) {
            const selectedFormType = formTypes.find(option => option.label === medicineDetails?.type_of_form);
            setDefaultFormType(selectedFormType);
        }
        if(medicineDetails?.medicine_category) {
            const selectedCategory = productCategoryOptions.find(option => option.label === medicineDetails?.medicine_category )
            setDefaultCategory(selectedCategory)
        }
        if(medicineDetails?.country_of_origin) {
            const selectedCountryOrigin = countries.find(option => option.label === medicineDetails?.country_of_origin )
            setDefaultCountryOfOrigin(selectedCountryOrigin)
        }
        if (medicineDetails?.registered_in) {
            const selectedRegisteredIn = countries.filter(option => 
                medicineDetails?.registered_in.includes(option.label)
            );
            setDefaultRegisteredIn(selectedRegisteredIn);
        }
        if (medicineDetails?.inventory_info) {
            setInventoryInfo(medicineDetails.inventory_info);
        }
        if (medicineDetails?.registered_in) {
            const selectedStockedIn = countries.filter(option => 
                medicineDetails?.stocked_in.includes(option.label)
            );
            setDefaultStockedIn(selectedStockedIn)
        }
        if (medicineDetails?.country_available_in) {
            const selectedCountryAvailableIn = countries.filter(option => 
                medicineDetails?.country_available_in.includes(option.label)
            );
            setDefaultCountryAvailableIn(selectedCountryAvailableIn)
        }
    }, [medicineDetails]);
    return (
        <>
            <div className={styles['create-invoice-container']}>
                <div className={styles['create-invoice-heading']}>Edit Product</div>
                <div className={styles['create-invoice-section']}>
                    <form className={styles['craete-invoice-form']} >
                        <div className={styles['create-invoice-inner-form-section']}>
                            <div className={styles['create-invoice-add-item-cont']}>
                                <div className={styles['create-invoice-form-heading']}>Product Details</div>
                            </div>
                            <div className={styles['create-invoice-div-container']}>
                                <label className={styles['create-invoice-div-label']}>Product Name</label>
                                <input
                                    className={styles['create-invoice-div-input']}
                                    type='text'
                                    name='productName'
                                    placeholder='Enter Product Name'
                                    autoComplete='off'
                                    defaultValue={medicineDetails?.medicine_name}
                                />
                            </div>
                            <div className={styles['create-invoice-div-container']}>
                                <label className={styles['create-invoice-div-label']}>Product Type</label>
                                <Select
                                    className={styles['create-invoice-div-input-select']}
                                    value={productType}
                                    onChange={handleProductTypeChange}
                                    options={productTypeOptions}
                                    placeholder="Select Product Type"
                                />
                            </div>
                            <div className={styles['create-invoice-div-container']}>
                                <label className={styles['create-invoice-div-label']}>Product Category</label>
                                <Select
                                    className={styles['create-invoice-div-input-select']}
                                    options={productCategoryOptions}
                                    placeholder="Select Product Category"
                                    value={defaultCategory}
                                    onChange={(selectedOption) => {
                                        setDefaultCategory(selectedOption);
                                    }}
                                />
                            </div>
                            <div className={styles['create-invoice-div-container']}>
                                <label className={styles['create-invoice-div-label']}>Country of Origin</label>
                                <Select
                                    className={styles['create-invoice-div-input-select']}
                                    name='originCountry'
                                    options={countries}
                                    placeholder="Select Country of Origin"
                                    autoComplete='off'
                                    value={defaultCountryOfOrigin}
                                    onChange={(selectedOption) => {
                                        setDefaultCountryOfOrigin(selectedOption);
                                    }}
                                />
                            </div>
                            <div className={styles['create-invoice-div-container']}>
                                <label className={styles['create-invoice-div-label']}>Registered In</label>
                                <MultiSelectDropdown
                                    options={countries}
                                    placeholderButtonLabel="Select Countries"
                                    value={defaultRegisteredIn}
                                    onChange={setDefaultRegisteredIn}
                                />
                            </div>
                            <div className={styles['create-invoice-div-container']}>
                                <label className={styles['create-invoice-div-label']}>Stocked In</label>
                                <MultiSelectDropdown
                                    options={countries}
                                    placeholderButtonLabel="Select Countries"
                                    value={defaultStockedIn}
                                    onChange={setDefaultRegisteredIn}
                                />
                            </div>

                            {productType && productType.value === 'secondary_market' && (
                                <>
                                    
                                    <div className={styles['create-invoice-div-container']}>
                                        <label className={styles['create-invoice-div-label']}>Country Available In</label>
                                        <MultiSelectDropdown
                                            options={countries}
                                            placeholderButtonLabel="Select Countries"
                                            value={defaultCountryAvailableIn}
                                            onChange={setDefaultCountryAvailableIn}
                                        />
                                    </div>
                                    <div className={styles['create-invoice-div-container']}>
                                        <label className={styles['create-invoice-div-label']}>Purchased On</label>
                                        <input
                                            className={styles['create-invoice-div-input']}
                                            type='text'
                                            name='purchasedOn'
                                            placeholder='Enter Purchased On'
                                            autoComplete='off'
                                            defaultValue={medicineDetails?.purchased_on}
                                        />
                                    </div>
                                    <div className={styles['create-invoice-div-container']}>
                                        <label className={styles['create-invoice-div-label']}>Minimum Purchase Unit</label>
                                        <input
                                            className={styles['create-invoice-div-input']}
                                            type='text'
                                            name='minPurchaseUnit'
                                            placeholder='Enter Min Purchase Unit'
                                            autoComplete='off'
                                            defaultValue={medicineDetails?.min_purchase_unit}
                                        />
                                    </div>
                                    
                                </>
                            )}
                            <div className={styles['create-invoice-div-container']}>
                                <label className={styles['create-invoice-div-label']}>Composition</label>
                                <input
                                    className={styles['create-invoice-div-input']}
                                    type='text'
                                    name='composition'
                                    placeholder='Enter Composition'
                                    autoComplete='off'
                                    defaultValue={medicineDetails?.composition}
                                />
                            </div>
                            <div className={styles['create-invoice-div-container']}>
                                <label className={styles['create-invoice-div-label']}>Strength</label>
                                <input
                                    className={styles['create-invoice-div-input']}
                                    type='text'
                                    name='strength'
                                    placeholder='Enter Strength'
                                    autoComplete='off'
                                    defaultValue={medicineDetails?.strength}
                                />
                            </div>
                            <div className={styles['create-invoice-div-container']}>
                                <label className={styles['create-invoice-div-label']}>Type of form</label>
                                <Select
                                    className={styles['create-invoice-div-input-select']}
                                    options={formTypes}
                                    placeholder="Select Type of Form"
                                    value={defaultFormType}
                                    onChange={(selectedOption) => {
                                        setDefaultFormType(selectedOption);
                                    }}
                                />
                            </div>
                            <div className={styles['create-invoice-div-container']}>
                                <label className={styles['create-invoice-div-label']}>Shelf Life</label>
                                <input
                                    className={styles['create-invoice-div-input']}
                                    type='text'
                                    name='shelfLife'
                                    placeholder='Enter Shelf Life'
                                    autoComplete='off'
                                    defaultValue={medicineDetails?.shelf_life}
                                />
                            </div>
                            {productType && productType.value === 'new_product' && (
                                <>
                                    <div className={styles['create-invoice-div-container']}>
                                        <label className={styles['create-invoice-div-label']}>Total Quantity</label>
                                        <input
                                            className={styles['create-invoice-div-input']}
                                            type='text'
                                            name='gmpApprovals'
                                            placeholder='Enter Total Quantity'
                                            autoComplete='off'
                                        />
                                    </div>
                                </>
                            )}
                            <div className={styles['create-invoice-div-container']}>
                                <label className={styles['create-invoice-div-label']}>Shipping Time</label>
                                <input
                                    className={styles['create-invoice-div-input']}
                                    type='text'
                                    name='shippingTime'
                                    placeholder='Enter Shipping Time'
                                    defaultValue={medicineDetails?.shipping_time}
                                />
                            </div>
                            <div className={styles['create-invoice-div-container']}>
                                <label className={styles['create-invoice-div-label']}>Dossier Type</label>
                                <input
                                    className={styles['create-invoice-div-input']}
                                    type='text'
                                    name='dossierType'
                                    placeholder='Enter Dossier Type'
                                    autoComplete='off'
                                    defaultValue={medicineDetails?.dossier_type}
                                />
                            </div>
                            <div className={styles['create-invoice-div-container']}>
                                <label className={styles['create-invoice-div-label']}>Dossier Status</label>
                                <input
                                    className={styles['create-invoice-div-input']}
                                    type='text'
                                    name='dossierStatus'
                                    placeholder='Enter Dossier Status'
                                    autoComplete='off'
                                    defaultValue={medicineDetails?.dossier_status}
                                />
                            </div>


                            <div className={styles['create-invoice-div-container']}>
                                <label className={styles['create-invoice-div-label']}>GMP Approvals</label>
                                <input
                                    className={styles['create-invoice-div-input']}
                                    type='text'
                                    name='gmpApprovals'
                                    placeholder='Enter GMP Approvals'
                                    autoComplete='off'
                                    defaultValue={medicineDetails?.gmp_approvals}
                                />
                            </div>


                            <div className={styles['create-invoice-div-container']}>
                                <label className={styles['create-invoice-div-label']}>Available For</label>
                                <input
                                    className={styles['create-invoice-div-input']}
                                    type='text'
                                    name='availableFor'
                                    placeholder='Enter Available For'
                                    defaultValue={medicineDetails?.available_for}
                                />
                            </div>
                            <div className={styles['create-invoice-div-container']}>
                                <label className={styles['create-invoice-div-label']}>Tags</label>
                                <input
                                    className={styles['create-invoice-div-input']}
                                    type='text'
                                    name='availableFor'
                                    placeholder='Enter Tags'
                                    defaultValue={medicineDetails?.tags}
                                />
                            </div>
                            <div className={styles['create-invoice-div-container-description']}>
                                <label className={styles['create-invoice-div-label']}>Product Description</label>
                                <textarea
                                    className={styles['create-invoice-div-input']}
                                    name="description"
                                    rows="4"
                                    cols="50"
                                    placeholder='Enter Description'
                                    defaultValue={medicineDetails?.description}
                                />
                            </div>
                        </div>

                        <div className={styles['create-invoice-inner-form-section']}>
                            <div className={styles['create-invoice-section']}>
                                <div className={styles['create-invoice-add-item-cont']}>
                                    <div className={styles['create-invoice-form-heading']}>Product Inventory</div>
                                    <span className={styles['create-invoice-add-item-button']} onClick={addFormSection}>Add More</span>
                                </div>
                                {formSections.map((section, index) => (
                                    <div className={styles['form-item-container']} >

                                        {productType && productType.value === 'new_product' && (
                                            <div className={styles['create-invoice-new-product-section-containers']}>
                                                <div className={styles['create-invoice-div-container']}>
                                                    <label className={styles['create-invoice-div-label']}>Quantity</label>
                                                    <Select
                                                        className={styles['create-invoice-div-input-select']}
                                                        value={section.quantity}
                                                        onChange={(selected) => handleQuantityChange(index, selected)}
                                                        options={quantityOptions}
                                                        placeholder="Select Quantity"
                                                    />
                                                </div>

                                                <div className={styles['create-invoice-div-container']}>
                                                    <label className={styles['create-invoice-div-label']}>Unit Price</label>
                                                    <input
                                                        className={styles['create-invoice-div-input']}
                                                        type='text'
                                                        name='unitPrice'
                                                        placeholder='Enter Unit Price'
                                                        value={section.unitPrice}
                                                        onChange={(event) => handleInputChange(index, event)}
                                                    />
                                                </div>
                                                <div className={styles['create-invoice-div-container']}>
                                                    <label className={styles['create-invoice-div-label']}>Total Price</label>
                                                    <input
                                                        className={styles['create-invoice-div-input']}
                                                        type='text'
                                                        name='totalPrice'
                                                        placeholder='Enter Total Price'
                                                        value={section.totalPrice}
                                                        onChange={(event) => handleInputChange(index, event)}
                                                    />
                                                </div>

                                                <div className={styles['create-invoice-div-container']}>
                                                    <label className={styles['create-invoice-div-label']}>Est. Delivery Time</label>
                                                    <input
                                                        className={styles['create-invoice-div-input']}
                                                        type='text'
                                                        name='estDeliveryTime'
                                                        placeholder='Enter Est. Delivery Time'
                                                        value={section.estDeliveryTime}
                                                        onChange={(event) => handleInputChange(index, event)}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        {productType && productType.value === 'secondary_market' && (
                                            <div className={styles['create-invoice-new-product-section-containers']}>
                                                <div className={styles['create-invoice-div-container']}>
                                                    <label className={styles['create-invoice-div-label']}>Quantity</label>
                                                    <input
                                                        className={styles['create-invoice-div-input']}
                                                        type='text'
                                                        name='quantity'
                                                        placeholder='Enter Quantity'
                                                        value={section.quantity}
                                                        onChange={(event) => handleInputChange(index, event)}
                                                    />
                                                </div>

                                                <div className={styles['create-invoice-div-container']}>
                                                    <label className={styles['create-invoice-div-label']}>Unit Price</label>
                                                    <input
                                                        className={styles['create-invoice-div-input']}
                                                        type='text'
                                                        name='unitPrice'
                                                        placeholder='Enter Unit Price'
                                                        value={section.unitPrice}
                                                        onChange={(event) => handleInputChange(index, event)}
                                                    />
                                                </div>
                                                <div className={styles['create-invoice-div-container']}>
                                                    <label className={styles['create-invoice-div-label']}>Condition</label>
                                                    <Select
                                                        className={styles['create-invoice-div-input-select']}
                                                        value={section.condition}
                                                        onChange={(selected) => handleConditionChange(index, selected)}
                                                        options={conditionOptions}
                                                        placeholder="Select Condition"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        {formSections.length > 1 && (
                                            <div className={styles['craete-add-cross-icon']} onClick={() => removeFormSection(index)}>
                                                <CloseIcon />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={styles['create-invoice-inner-form-section']}>
                            <div className={styles['create-invoice-product-image-section']}>
                                <div className={styles['create-invoice-upload-purchase']}>
                                    <div className={styles['create-invoice-form-heading']}>Upload Product Image</div>
                                    <ImageAddUploader />
                                </div>
                                {productType && productType.value === 'secondary_market' && (
                                    <>
                                        <div className={styles['create-invoice-upload-purchase']}>
                                            <div className={styles['create-invoice-form-heading']}>Upload Purchase Invoice</div>
                                            <AddPdfUpload />
                                        </div>
                                    </>
                                )}

                            </div>
                        </div>
                        <div className={styles['craete-invoices-button']}>
                            <div className={styles['create-invoices-cancel']}>Cancel</div>
                            <button type="submit" className={styles['create-invoices-submit']}>Add Product</button>
                        </div>
                    </form>

                </div>

            </div>
        </>
    );
};

export default EditSecondaryProduct;