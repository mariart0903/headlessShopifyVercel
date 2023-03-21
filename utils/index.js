export async function storefront(query, variables= {}){
    const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL_GRAPHQl,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_ACCESS_TOKEN
            },
            body: JSON.stringify({
                query, variables
            })
        })
    return response.json()
}

export const getTags = (tags, tagsLength) => {
    let formattedTags = '';
    tags?.map((tag, idx) => {
        formattedTags += tag;
        if(idx + 1 !== tagsLength) {
            formattedTags += ', '
        }
    })
    return formattedTags;
}

export function formatPrice(number) {
    return Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'RON',
        minimumFractionDigits: 2
    }).format(number)
}

export const checkIfObjectsAreEqual = (obj1, obj2) => {
    return Object.keys(obj1).every(key => obj1[key] === obj2[key]);
}

export const goToCheckout = (checkoutUrl) => {
    window.location.href = checkoutUrl;
}
