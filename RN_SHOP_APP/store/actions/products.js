import Product from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const deleteProduct = productId => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const response = await fetch(`https://rn-complete-guide-b6a35.firebaseio.com/products/${productId}.json?auth=${token}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Something whent wrong!');
        }

        dispatch({type: DELETE_PRODUCT, pid: productId});
    };
};

export const createProduct = (title, description, imageUrl, price) => {
    // we can execute any async code we want
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const ownerId = getState().auth.userId;
        const response = await fetch(`https://rn-complete-guide-b6a35.firebaseio.com/products.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
                price,
                ownerId
            })
        })

        const resData = await response.json();

        dispatch({
            type: CREATE_PRODUCT, 
            productData: {
                id: resData.name,
                title,
                description,
                imageUrl,
                price,
                ownerId
            }
        });
    };
};

export const updateProduct = (id, title, description, imageUrl) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const response = await fetch(`https://rn-complete-guide-b6a35.firebaseio.com/products/${id}.json?auth=${token}`, {
            method: 'PATCH',// PUT will fully overide the data but PATCH will updata the data that we pass
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                title,
                description,
                imageUrl
            })
        });
        
        if (!response.ok) {
            throw new Error('Something whent wrong!');
        }

        dispatch({
            type: UPDATE_PRODUCT,
            pid: id,
            productData: {
                title,
                description,
                imageUrl
            }
        });
    };
};

export const fetchProducts = () => {
    return async (dispatch, getState) => {
        try {
            const ownerId = getState().auth.userId;
            const response = await fetch('https://rn-complete-guide-b6a35.firebaseio.com/products.json');

            if (!response.ok) {
                throw new Error('Something whent wrong!');
            }
    
            const resData = await response.json();
            const loadedProducts = [];
    
            for (const key in resData) {
                loadedProducts.push(
                    new Product(
                        key,
                        resData[key].ownerId,
                        resData[key].title,
                        resData[key].imageUrl,
                        resData[key].description,
                        resData[key].price
                    )
                );
            }
    
            dispatch({
                type: SET_PRODUCTS,
                products: loadedProducts,
                userProducts: loadedProducts.filter(prod => prod.ownerId === ownerId)
            });
        } catch (err) {
            throw err;
        };
    }
}