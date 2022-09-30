import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Input } from "@components/inputs";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { addAddressStart, getAddressStart, getStateAction, removeAddressStart, updateAddressStart } from "@redux/user/user-action";

const AddressForm = ({getStateAction,countries, user, address, getAddress, addAddress, removeAddress, updateAddress, edit = null, close }) => {
    const addressStructure = {
        address_fields: null,
        address_id: "",
        address_line_1: "",
        address_line_2: "",
        address_status: "",
        address_tag: "",
        city: "",
        country: "India",
        country_code: "IND",
        create_date: "",
        customer_id: "",
        delivery_schema_id: "",
        full_name: "",
        is_default: "",
        last_modified_date: "",
        latitude: "",
        longitude: "",
        phone: "",
        state: "Tamil Nadu",
        state_code: "TN",
        zip_code: "",
        isd_code: "91"
    }
    const [countryState, setCountryState] = useState([])
    const [state, setState] = useState("91")
    const [newAddress, setNewAddress] = useState(edit || addressStructure)
    const [isAddressActive, setIsAddressActive] = useState(false);
    const [error, setError] = useState("");

    

    useEffect(()=>{
        getStateAction({ code: newAddress.country_code, setCountryState })
    },[])


    const onChangeAddress = (e) => {
        const { value, name } = e.target;
        setError("")
        if (name == 'phone' || name == 'zip_code') {
            if (!(/^\d*$/.test(value))) return;
        }
        setNewAddress({ ...newAddress, [name]: value });
    }

    const onChangeCountry = (e) => {
        const country = e.target.value
        
        const countryCode = countries.filter(item => item.country_name == country)[0]
        setNewAddress({ ...newAddress,country, country_code: countryCode.country_code,state_code:"",state:"" });
        getStateAction({ code: countryCode.country_code, setCountryState })
    }

    const stateOnChange=(e)=>{
        const state=e.target.value
        const stateCode = countryState.filter(item => item.state_name == state)[0]
        if(stateCode){
            setNewAddress({ ...newAddress,state, state_code: stateCode.state_code });
        }
        else{
            setNewAddress({ ...newAddress, state_code: "",state:"" });
        }
    }



    const onSave = () => {
        if (!newAddress.full_name || !newAddress.phone || !newAddress.address_line_1 || !newAddress.city || !newAddress.state || !newAddress.country || !newAddress.zip_code) {
            setError("Please fill all Required(*) field")
            return;
        }
        if (newAddress?.address_id) {

            updateAddress({
                userId: user.customer_id, addressId: newAddress.address_id,
                address: newAddress
            })
        } else {

            addAddress({ userId: user.customer_id, address: newAddress, setError });
        }
        // setIsAddressActive(false);
        // setNewAddress(addressStructure);
        close()
    }

    const onPhoneCodeChange = (value) => {
        setNewAddress({ ...newAddress, isd_code: value });
    }

    return (<>

        <div className="fixed inset-0 px-4 sm:px-8 md:px-20 bg-black-color-lighter bg-opacity-75 address-form">
            <div className='py-6 md:px-20 flex justify-end '>
                <svg onClick={() => { close(); setNewAddress(addressStructure) }} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
            <div className=" absolute inset-y-14  overflow-auto inset-x-0 mx-4 sm:mx-16 md:mx-32 lg:mx-80" >
                <div className="heading sticky top-0 bg-black-color-lighter border-gray-300 pb-10 border-b-2">
                    {
                        Object(newAddress).hasOwnProperty('address_id') ?
                            <h2 className="font-semibold text-xl dark-blue titile">Update Address</h2>
                            :
                            <h2 className="font-semibold text-xl dark-blue titile">Add a New Address</h2>
                    }
                </div>
                <div className="add-c">
                    <div className="row space-y-6">
                        <div className="mt-4 col-12">
                            <div className="font-semibold text-gray-700 text-base">Full Name*</div>
                            <Input onChange={onChangeAddress} type="text" name='full_name' placeholder="Your full name..." value={newAddress.full_name} />
                        </div>
                        <div className="mt-4 col-12">
                            <div className="font-semibold text-gray-700 text-base">Phone*</div>
                            {/* <Input onChange={onChangeAddress} type="text" name='phone' placeholder="Phone number" value={newAddress.phone} /> */}
                            <div className='mt-2 flex space-x-1'>
                            <div className='w-[4rem] shrink-0 relative'>
                                <PhoneInput
                                    inputClass='hidden'
                                    containerClass='py-4 w-full h-full'
                                    buttonClass='w-full flag-div'
                                    // country={'us'}
                                    // enableAreaCodes={true}
                                    value={newAddress.isd_code+""}
                                    onChange={(value) => onPhoneCodeChange(value)}
                                />
                            </div>
                            <div className=' relative w-full'>
                                <input className='ml-1 absolute text-center text-sm top-1/2 -translate-y-1/2 w-14 outline-none' value={'+' + newAddress.isd_code} />
                                <Input className="addressphone" onChange={onChangeAddress} type="text" name='phone' placeholder="Phone number" value={newAddress.phone} />
                            </div>
                            </div>
                        </div>
                        <div className="mt-4 col-12">
                            <div className="font-semibold text-gray-700 text-base">Address Line 1*</div>
                            <Input onChange={onChangeAddress} type="text" name='address_line_1' placeholder="An Address" value={newAddress.address_line_1} />
                        </div>
                        <div className="mt-4 col-12">
                            <div className="font-semibold text-gray-700 text-base">Address Line 2</div>
                            <Input onChange={onChangeAddress} type="text" name='address_line_2' placeholder="An Address" value={newAddress.address_line_2} />
                        </div>
                        <div className="mt-4 col-md-6">
                            <div className="font-semibold text-gray-700 text-base">Country*</div>
                            {/* <p>{newAddress.country}</p> */}
                            <select name='country' onChange={onChangeCountry} className="w-full p-4 custom-input">
                            {countries.map(item => {
                                        return (
                                            <option value={item.country_name} selected={item.country_name==newAddress.country}>{item.country_name}</option>
                                        )
                                    })}
                            </select>
                        </div>
                        <div className="mt-4 col-md-6">
                            <div className="font-semibold text-gray-700 text-base">State*</div>
                            {/* <Input onChange={onChangeAddress} type="text" name='state' placeholder="State" value={newAddress.state} /> */}
                            <select name='country' onChange={stateOnChange} className="w-full p-4 custom-input">
                            <option value="">--Select State--</option>
                                {countryState.map(item => {
                                    return (
                                        <option value={item.state_name} selected={item.state_name==newAddress.state}>{item.state_name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="mt-4 col-md-6">
                            <div className="font-semibold text-gray-700 text-base">City*</div>
                            <Input onChange={onChangeAddress} type="text" name='city' placeholder="City" value={newAddress.city} />
                        </div>
                        <div className="mt-4 col-md-6">
                            <div className="font-semibold text-gray-700 text-base">Zip code*</div>
                            <Input onChange={onChangeAddress} type="text" name='zip_code' placeholder="Zip Code" value={newAddress.zip_code} />
                        </div>
                        <div className="mt-4 col-md-12">
                            <div className="font-semibold text-gray-700 text-base">Address Type</div>
                            <div className="flex justify-start items-start  p-2">
                                <div>
                                    <input type="radio" name="address_tag" id="add-t-1" value='Home' onChange={onChangeAddress} checked={newAddress.address_tag == 'Home'} />
                                    <label className={`font-12 ml-4 font-w-600 type-of-address ${newAddress.address_tag == 'Home' ? "selected" : ""}`} htmlFor='add-t-1'>Home</label></div>
                                <div className="ml-24">
                                    <input type="radio" name="address_tag" value='Work' id="add-t-2" onChange={onChangeAddress} checked={newAddress.address_tag == 'Work'} />
                                    <label className={`font-12 ml-4 font-w-600 type-of-address ${newAddress.address_tag == 'Work' ? "selected" : ""}`} htmlFor='add-t-2' >Work</label></div>
                            </div>
                        </div>
                        <div className="col-12 mt-4">
                            <span className="red-color">{error ? error : ""}</span>
                        </div>
                        <div className="flex justify-between items-center space-x-4">
                            <Button className="w-full bg-success-color py-4 rounded white-color" onClick={onSave} >Save</Button>
                            <Button className="w-full bg-red-color py-4 rounded white-color" onClick={() => { close(); setNewAddress(addressStructure) }}>Cancel</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        {/* <div className="">
            <div className="heading border-gray-300 pb-10 border-b-2">
                {
                    Object(newAddress).hasOwnProperty('address_id') ?
                        <h2 className="font-w-600 font-24 dark-blue titile">Update Address</h2>
                        :
                        <h2 className="font-w-600 font-24 dark-blue titile">Add a New Address</h2>
                }
            </div>
            <div className="add-body-container">
                <div className="add-c">
                    <div className="row text-base font-normal">
                        <div className="mt-4 col-12">
                            <div className="text-base font-medium mb-1">Full Name*</div>
                            <Input onChange={onChangeAddress} type="text" name='full_name' placeholder="Enter Your Full Name" value={newAddress.full_name} />
                        </div>
                        <div className="mt-4 col-12">
                            <div className="text-base font-medium mb-1">Mobile Number* <span className=" text-sm font-normal">( Commonly Used to Assist Delivery ) </span></div>
                            <Input onChange={onChangeAddress} type="text" name='phone' placeholder="Enter Your 10 digit Mobile Number" value={newAddress.phone} />
                        </div>
                        <div className="mt-4 col-12">
                            <div className="text-base font-medium mb-1">Address Line 1*</div>
                            <Input onChange={onChangeAddress} type="text" name='address_line_1' placeholder="Address" value={newAddress.address_line_1} />
                        </div>
                        <div className="mt-4 col-12">
                            <div className="text-base font-medium mb-1">Address Line 2</div>
                            <Input onChange={onChangeAddress} type="text" name='address_line_2' placeholder="Address" value={newAddress.address_line_2} />
                        </div>
                        <div className="mt-4 col-xl-6">
                            <div className="text-base font-medium mb-1">Country*</div>
                            <Input onChange={onChangeAddress} type="text" name='state' disabled={true} placeholder="State" value={'India'} />
                        </div>
                        <div className="mt-4 col-xl-6">
                            <div className="text-base font-medium mb-1">State*</div>
                            <Input onChange={onChangeAddress} type="text" name='state' placeholder="State" value={newAddress.state} />
                        </div>
                        <div className="mt-4 col-md-6">
                            <div className="text-base font-medium mb-1">City*</div>
                            <Input onChange={onChangeAddress} type="text" name='city' placeholder="Enter City Name" value={newAddress.city} />
                        </div>
                        <div className="mt-4 col-xl-6">
                            <div className="text-base font-medium mb-1">Zin code*</div>
                            <Input onChange={onChangeAddress} type="text" name='zip_code' placeholder="Enter Your Area PIN " value={newAddress.zip_code} />
                        </div>
                        <div className="mt-6 col-xl-12">
                            <div className="text-base font-medium mb-1">Address Type</div>
                            <div className=" mt-2">
                                <div>
                                    <input type="radio" name="address_tag" id="add-t-1" value='Home' onChange={onChangeAddress} checked={newAddress.address_tag == 'Home'} />
                                    <label className={`text-base ml-8 font-medium  ${newAddress.address_tag == 'Home' ? "selected" : ""}`} htmlFor='add-t-1'>Home Address
                                        <span className="text-sm font-normal">{' '}
                                            ( product will be delivered between 7 am to 9 pm)
                                        </span>
                                    </label></div>
                                <div className="mt-4">
                                    <input type="radio" name="address_tag" value='Work' id="add-t-2" onChange={onChangeAddress} checked={newAddress.address_tag == 'Work'} />
                                    <label className={`text-base ml-8 font-medium ${newAddress.address_tag == 'Work' ? "selected" : ""}`} htmlFor='add-t-2' >
                                        Office/ Work Address
                                        <span className="text-sm font-normal">{' '}
                                            ( product will be delivered between 10 am - 6 pm)
                                        </span>
                                    </label></div>
                            </div>
                        </div>
                        <div className="col-12 mt-4">
                            <div className="text-base font-medium mb-1 error-danger">{error ? error : ""}</div>
                        </div>
                        <div className="mt-5 col-12 row">
                            <div className="col-6">
                                <Button className="w-100" onClick={onSave} >Save</Button>
                            </div>
                            <div className="col-6">
                                <Button className="w-100 bg-error-danger" onClick={() => { setNewAddress(null); close() }}>Cancel</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> */}
    </>
    )
}

const mapStateToProps = state => ({
    address: state.user.address,
    user: state.user.currentUser
})
const mapDispatchToProps = dispatch => ({
    addAddress: (data) => dispatch(addAddressStart(data)),
    getAddress: (userId) => dispatch(getAddressStart(userId)),
    removeAddress: (data) => dispatch(removeAddressStart(data)),
    updateAddress: (data) => dispatch(updateAddressStart(data)),
    getStateAction: (data) => dispatch(getStateAction(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddressForm);
