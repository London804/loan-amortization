export const formatData = (data) => {
    return data.map(d => {
        const formattedObj = {};
        for (let key in d) {
            if (key !== 'month') {
                formattedObj[key] = +(d[key]).toFixed(2);
            } else {
                formattedObj[key] = d[key];
            }
        }
        return formattedObj
    })
}
