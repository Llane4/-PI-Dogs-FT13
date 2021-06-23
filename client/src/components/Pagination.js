import React from 'react'

export const Pagination = () => {
    const pageNumbers=[];
    for(var i=1;i<=10;i++){
        pageNumbers.push(i)
    }
  
    return (
        <div>
            {pageNumbers.map(number =>{
                console.log(number);
                <div> {number}</div>
            })}
        </div>
    )
}
