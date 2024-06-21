import React from 'react';
import data from './cShape.json';

const CShape = () => {


    // const handleClick = (id) => { // https://medium.com/womenintechnology/commonly-asked-machine-coding-problem-in-front-end-interviews-e16042ab1e10

    // }
    
    return (
        <div className='container'>
            {
                data.map((item, index) => {
                    const { id, isClicked } = item;
                    return (
                        <div key={index} className={`item ${isClicked ? 'yellow' : 'green'}`}>
                            <p>{id}</p>
                        </div>
                    )
                })
            }
        </div>
    );
};


export default CShape;