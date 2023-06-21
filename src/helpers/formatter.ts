import { Loan, LoanSchedule } from "@/constants/loan.constant";

export const formatLoanScheduleData = (data: Array<LoanSchedule>) => {
    console.log('data', data)
    return data.map(d => {
        const formattedObj: LoanSchedule | any = {};
        for (let key in d) {
            if (key !== 'month') {
                formattedObj[key] = `$${formatNumber((d[key as keyof LoanSchedule]))}`;
            } else {
                formattedObj[key] = d[key];
            }
        }
        return formattedObj
    })
}

export const formatLoanData = (data: Array<Loan>) => {
    return data.map(d => {
        const formattedObj: Loan | any = {};
        for (let key in d) {
            if (key === 'amount') {
                formattedObj[key] = `$${formatNumber((d[key]))}`;

            } else if (key === 'apr') {
                formattedObj[key] = `${d[key]}%`;
                
            } else {
                formattedObj[key] = d[key as keyof Loan];
            }
        }
        return formattedObj
    })
}



export const addCommas = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return formattedValue;
};


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

export const removeCommas = (value: string) => {
    return value.replace(/,/g, '');
};



