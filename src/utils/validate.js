import React from "react";

 export const required = (value) => {
     if (value) {
         return undefined
     } else {
         return 'field is required'
     }
};

export const maxStringLength = (symbolsNumber) => (value) => {

     if (value && value.length >symbolsNumber) {
         return `max length is ${symbolsNumber} symbols`
     } else {
         return undefined
     }
};

export const Input = ({input, meta, Typefield, ...props}) => {

    return(
        <div>
            <div className='login_fields'><Typefield {...input} {...props}/></div>
        <span className='login_error'>{meta.error && meta.touched ? meta.error : null}</span>
            </div>
    )
}

