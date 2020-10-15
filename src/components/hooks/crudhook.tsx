import * as React from 'react';
import API from '../api';
import  axios from 'axios';
import { useContext } from 'react';
import data from '../constant/county.json'


// interface to define attributes need for country record
export interface ICountry {
    id?: ""
    name: string
    code: string
    capitalCity: string
}


export interface IRequestStatus {
    error: boolean,
    isLoading: boolean,
    isSuccesfull: boolean,
    message: string

}

export interface IInitialState {
    id: string,
    country: ICountry
    countryList: ICountry[]
    isUpdated: boolean
    isDeleted: boolean
}


export const initialState: IInitialState = { country: { capitalCity: "", code: "", name: "" }, countryList: [], id: "", isDeleted: false, isUpdated: false }


//custom hook
export const useCrudBasic = () => {
    //watches the life cycle of an http request and displays result accordingly
    const [requestStatus, setRequestStatus] = React.useState<IRequestStatus>({ error: false, isLoading: false, isSuccesfull: false, message: "" });
    //Captures state and displayes it globally
    const { state, dispatch } = useContext(CountryContext);
    //define and populates country attribute
    const [country, setCountry] = React.useState<ICountry>({ capitalCity: "", id: "", code: "", name: "" })


    //watches changes in html input eg textfield
    const handleCountryChange = (e: any) => {
        const { name, value } = e.target;
        setCountry({ ...country, [name]: value })
    }


    // ensure that records passes certain conditions before being persited to database
    const validation = (c: ICountry) => {
        const messages: string[] = [];
        if (!c.name) {
            messages.push("Country name should not be empty !!");
        }
        else if (!c.capitalCity) {
            messages.push("Capital city should not be empty !!")
        }
        else if (!c.code) {
            messages.push("Country code should not be empty !!")
        }
        else if (c.code.length !== 2) {
            messages.push("Country code should have 2 letters !!")
        }
        return messages;
    }

    // create hook
    const create = async (country: ICountry) => {

        try {
            setRequestStatus({ error: false, isLoading: true, isSuccesfull: false, message: "Still loading request" });
            const messages = validation(country);
            if (messages.length === 0) {
                let payload = await API.post(`/`, country);
                if (payload.status === 201) {
                    dispatch({ type: "CreateResponseAction", country: payload.data })
                    setRequestStatus({ error: false, isLoading: false, isSuccesfull: true, message: "Country has been saved" });
                }

            }
        } catch (error) {
            if (error.response.status === 409) {
                setRequestStatus({ error: true, isSuccesfull: false, isLoading: false, message: "Country record already available" })
            }
            else {
                setRequestStatus({ error: true, isSuccesfull: false, isLoading: false, message: "Server error" })
            }
        } finally {
            setRequestStatus({ error: false, isSuccesfull: false, isLoading: false, message: "" });

        }
    }

    //update function
    const update = async (country: ICountry, id: string) => {
        try {
            setRequestStatus({ error: false, isLoading: true, isSuccesfull: false, message: "Still loading request" });
            const messages = validation(country);
            if (messages.length === 0) {
                let updatedPayload = await API.put(`/${id}`, country);
                if (updatedPayload.status === 200) {
                    dispatch({ type: "CountryUpdateAction", isUpdated: true });
                    setRequestStatus({ error: false, isLoading: false, isSuccesfull: true, message: "Country has been updated" });
                }
            }
        } catch (error) {
            if (error.response.status === 404) {
                setRequestStatus({ error: true, isSuccesfull: false, isLoading: false, message: "Record was not found !!" })
            }

        } finally {
            setRequestStatus({ error: false, isSuccesfull: false, isLoading: false, message: "" });

        }
    }

    //list function
    const list = async () => {

        try {
            setRequestStatus({ error: false, isLoading: true, isSuccesfull: false, message: "Still loading request" });
            let listPayload = await API.get(`/`);
            if (listPayload.status === 200) {
                dispatch({ type: "CountryListResponseAction", countryList: listPayload.data })
            }
            else if (listPayload.status === 204) {
                setRequestStatus({ error: false, isSuccesfull: true, isLoading: false, message: "List is empty!!" });
                dispatch({ type: "CountryListResponseAction", countryList: listPayload.data })
            }

        } catch (error) {
            if (error.response.status === 404)
                setRequestStatus({ error: true, isSuccesfull: false, isLoading: false, message: "Record was not found !!" });

        } finally {
            setRequestStatus({ error: false, isSuccesfull: false, isLoading: false, message: "" });

        }
    }
    
    //find by id function
    const findById = async (id: string) => {
        try {
            setRequestStatus({ error: false, isLoading: true, isSuccesfull: false, message: "Still loading request" });
            let payloadById = await axios.get(`/edit/${id}`);

                //this is dummy data edit
          
            if (payloadById.status === 200) {
                dispatch({ type: "CreateResponseAction", country: payloadById.data });
                setRequestStatus({ error: false, isLoading: false, isSuccesfull: true, message: "Country has been has be found" });
            }else{
                console.log(`tonderai`)
                let dt = data.filter(a => a.id === id);
                dispatch({ type: "CreateResponseAction", country: dt });
                setRequestStatus({ error: false, isLoading: false, isSuccesfull: true, message: "Country has been has be found" });
            }


        } catch (error) {
            if (error.response.status === 404) {
                setRequestStatus({ error: true, isSuccesfull: false, isLoading: false, message: "Country was not found !!" });
            }
        }
        finally {
            setRequestStatus({ error: false, isSuccesfull: false, isLoading: false, message: "" });
        }

    }

    // delete by id function
    const deleteById = async (id: ICountry['id']) => {
        try {
            let deletedPayload = await API.delete(`/${id}`);
            if (deletedPayload.status === 200) {
                dispatch({ type: "CountryDeleteAction", isDeleted: true });
            }
        } catch (error) {
            if (error.response.status === 500) {
                setRequestStatus({ error: true, isSuccesfull: false, isLoading: false, message: "Record did not delete.Something went wrong" });
                dispatch({ type: "CountryDeleteAction", isDeleted: false });

            }
        } finally {
            setRequestStatus({ error: false, isSuccesfull: false, isLoading: false, message: "" });
        }
    }


    return {
        create,
        update,
        list,
        deleteById,
        findById,
        handleCountryChange,
        country,
        validation,
        setCountry,
        state
    }

}

interface ICreateRequestAction {
    type: "CreateRequestAction",
    country: ICountry
}

interface ICreateResponseAction {
    type: "CreateResponseAction",
    country: ICountry
}
interface ICountryUpdateAction {
    type: "CountryUpdateAction",
    isUpdated: boolean
}
interface ICountryDeletedAction {
    type: "CountryDeleteAction",
    isDeleted: boolean
}

interface ICountryListResponseAction {
    type: "CountryListResponseAction",
    countryList: ICountry[]
}

type Action = ICreateRequestAction | ICreateResponseAction | ICountryListResponseAction | ICountryUpdateAction | ICountryDeletedAction
//
//helps with state management
const countryReducer = (state = initialState, action: Action) => {
    switch (action.type) {

        case "CountryListResponseAction":
            return {
                ...state, countryList: action.countryList
            }
        case "CreateRequestAction":
            return {
                ...state, county: action.country
            }
        case "CreateResponseAction":
            return {
                ...state, county: action.country
            }
        case "CountryUpdateAction":
            return {
                ...state, isUpdated: action.isUpdated
            }
        case "CountryDeleteAction":
            return {
                ...state, isDeleted: action.isDeleted
            }

        default:
            return {
                ...state,
            }
    }

}
//response for global access of attributes to other components in the app
export const CountryContext = React.createContext<any>([]);
export const CountryContextProvider = (props: any) => {
    const [state, dispatch] = React.useReducer(countryReducer, initialState);
    return (
        <CountryContext.Provider value={{ state, dispatch }}>
            {props.children}
        </CountryContext.Provider>)

}
export const useCountryContext = () => React.useContext(CountryContext);



