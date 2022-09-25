import React from "react";


let searchStatus = (num) => {
    let result;
    if (num) {
        let suffix = [2, 3, 4].includes(num%10) ? 'a' : ''
        result =<h1><span className="badge bg-primary">{num} человек{suffix} тусанет с тобой сегодня</span></h1>;
    } else {
        result = <h1><span className="badge bg-danger">Никто с тобой  не тусанет</span></h1>;
    }
    return result;
}

export default searchStatus;