import * as React from 'react';
import preloader from '../assets/images/loader.gif'


const Preloader = () => {
    return (
        <div className='preloader'>
            <img src={preloader} className='preloader_img'/>
        </div>)
}

export default Preloader;