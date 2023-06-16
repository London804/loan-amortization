export const formatData = (data) => {
    return data.map(d => {
        const formattedObj = {};
        for (let key in d) {
            console.log('key', key)
            console.log('key value', d[key])
            if (key !== 'month') {
                // let formattedValue = addCommas(d[key])

                // update to accomodate commas
                // update to add $
                // update to add % for APR
                // formattedObj[key] = +(d[key]).toFixed(2);
                formattedObj[key] = `$${formatNumber((d[key]))}`;


            } else {
                formattedObj[key] = d[key];
            }
        }
        return formattedObj
    })
}

// write separate function for top level table that works like formatData

// move formatNumber here
// also create removeFormatNumber here
export const addCommas = (value) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return formattedValue;
};


// this doesn't work
export const formatNumber = (value: string | number) => {
    const formatString = typeof value !== 'string' ? value.toString() : value as string;
    const numericValue = formatString.replace(/[^0-9.]/g, ''); // Allowing decimal point (.)
    const floatValue = parseFloat(numericValue);

    if (!isNaN(floatValue)) {
        const parts = floatValue.toFixed(2).split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');
    }

    return '';
};

export const removeCommas = (number: string) => {
    return number.replace(/,/g, '');
};



