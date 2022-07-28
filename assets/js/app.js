
/**
 * Prodcut shop app....
*/

const addnew_form = document.getElementById('products_addnew_form');
const product_list = document.getElementById('product_list');
const single_view_products = document.getElementById('single_view_products');
const products_update_form = document.getElementById('products_update_form');
const msg = document.getElementById('msg');
const up_msg = document.getElementById('up_msg');

// add new products here....

addnew_form.onsubmit = (e) =>{
    e.preventDefault();

    // Get form entries....
    const addnew_formdata = new FormData(e.target);
    const productData = Object.fromEntries(addnew_formdata.entries());
    const {name,price,quantity,photo} = Object.fromEntries(addnew_formdata.entries());

    if (!name || !price || !quantity || !photo) {
        msg.innerHTML = check_field_validation('Please fillup all of those field','danger');
    } else {
        createLSData('product',productData);
        msg.innerHTML = check_field_validation('Data stable','success');
        e.target.reset();
        get_all_products();
    }
    
}

// Gell all products here....

const get_all_products = () =>{
    const LSdata = getLSdata('product');
    list = '';
    
    if (!LSdata || LSdata.length == 0 ) {
        list= `
        <tr>
            <td colspan="6" class="text-center">😢😢😢...No product found here...😢😢😢</td>
        </tr>
        `
    }
    if (LSdata && LSdata.length > 0) {
        let amount = 0;
        LSdata.map((item, index) =>{
            amount +=(item.price * item.quantity);
            list +=`
            <tr>
                <th scope="row">${index + 1}</th>
                <td><img src="${item.photo}" alt=""></td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>${item.quantity}</td>
                <td>${item.price * item.quantity} BDT</td>
                <td>
                    <a class="btn btn-primary product_view" index="${index}" data-bs-toggle="modal" href="#product_single_view"><i class="fas fa-eye"></i></a>
                    <a class="btn btn-warning product_edit" index="${index}" data-bs-toggle="modal" href="#product_edit_modal"><i class="fas fa-edit"></i></a>
                    <a class="btn btn-danger product_delet" index="${index}" data-bs-toggle="modal" href="#shop_delete_modal"><i class="fas fa-trash times"></i></a>
                </td>
            </tr>
            `;
        });
        list += `<tr>
            <td class="text-end" style="padding-right: 76px !important;" colspan="6">Total Amount right now = ${amount} BDT</td>
        </tr>`
    }
    product_list.innerHTML = list
}
get_all_products();

/**
 * For edit procudts....here....
*/

product_list.onclick  = (event) =>{

    // Product Signle View....here...

    if (event.target.classList.contains('product_view')) {
        let single_view = event.target.getAttribute('index');

        let for_s_data = getLSdata('product');
        let {name,price,photo,quantity} = for_s_data[single_view];
    
        single_view_products.innerHTML = `
            <!-- Product image -->
            <div class="product_image">
                <img src="${photo}" alt="">
            </div>
            <!-- Porduct Name -->
            <div class="porduct_name">
                <h3>Product Name is == __${name}__ </h3>
            </div>
            <!-- Product Price -->
            <div class="product_price">
                <p>Product Price is == __${price}__ </p>
            </div>
            <div class="product_quantity">
                <p>Product Quantity is == __${quantity}__ </p>
            </div>
            <!-- Product total amount -->
            <div class="product_total">
                <p> Product Total Amount is == __${price * quantity}__ </p>
            </div>
        `;
    };

    // Product Eidt...here...
    
    if(event.target.classList.contains('product_edit')){
        let index = event.target.getAttribute('index');
        let for_s_data = getLSdata('product');
        let {name,price,photo,quantity} = for_s_data[index];

        products_update_form.innerHTML = `
            <div class="my-3">
                <label for="">Product Name</label>
                <input name="name" class="form-control" value="${name}" type="text">
            </div>
            <div class="my-3">
                <label for="">Product Price</label>
                <input name="price" class="form-control" value="${price}" type="text">
            </div>
            <div class="my-3">
                <label for="">Product Quantity</label>
                <input name="quantity" class="form-control" value="${quantity}" type="text">
            </div>
            <div class="my-3" style="display:none;">
                <label for="">Product Index</label>
                <input name="index" class="form-control" value="${index}" type="text">
            </div>
            <div class="my-3">
                <label for="">Product Old Photo</label>
                <div class="product_image">
                    <img src="${photo}" alt="">
            </div>
                <label for="">Replace New Product Photo (URL) </label>
                <input name="photo" value="${photo}" class="form-control" type="text">
            </div>
            <div class="my-3">
                <input class="btn btn-primary d-block m-auto w-100" type="submit" value="Update product data">
            </div>
        `;
    };
    
    // Product delete...here....

    if(event.target.classList.contains('product_delet')){

        let conf_irmation = confirm('Are you sure to delete this data for your end...???');

        if (conf_irmation) {
            // Get index....here...
            let index = event.target.getAttribute('index');

            // Get ls data...here...
            let delet_data = getLSdata('product');

            // Delete Index data...
            delet_data.splice(index, 1);

            // Updatae index data...here...
            
            update_lsdata('product', delet_data);
            get_all_products();
        };
    };
    
}

/**
 * Update Products data....
*/

products_update_form.onsubmit = (e) =>{
    e.preventDefault();
    
    // Get update form data...for your website....

    let update = new FormData(e.target);
    let update_data = Object.fromEntries(update.entries());
    let {index} = Object.fromEntries(update.entries());

    // Get ls data...for localstrore

    const for_data = getLSdata('product');
    for_data[index] = update_data;

    update_lsdata('product', for_data);
    get_all_products();

}