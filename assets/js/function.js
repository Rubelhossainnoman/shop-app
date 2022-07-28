// Aleart Function...

const check_field_validation = (msg,type) =>{
    return `<p class="alert alert-${type} d-flex justify-content-between">${msg}<button data-bs-dismiss="alert" class="btn-close"></button></p>`;
}


/**
 * set product value in localstroge
*/

const createLSData = (key, value) =>{

    // Data initlizations...
    let data = [];
    if (localStorage.getItem(key)) {
        data = JSON.parse(localStorage.getItem(key));
    }
    // Data push...
    data.push(value);

    localStorage.setItem(key, JSON.stringify(data))
}

/**
 * Get product value form localstroge
*/

const getLSdata = (key) =>{

    if (localStorage.getItem(key)) {
       return JSON.parse(localStorage.getItem(key));
    }else{
        return false;
    }
}

/**
 * Update ls data....here...
*/

const update_lsdata = (key, array) =>{
    localStorage.setItem(key, JSON.stringify(array));
}