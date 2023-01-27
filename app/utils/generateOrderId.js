const generateOrderId = (orderIdCode, lastOrderId) => {
    let newOrderId = orderIdCode
    let initNumber = ''

    if (!lastOrderId) {
        newOrderId = `${orderIdCode}00000001`
    } else {
        const startIndexOrderId = lastOrderId.match(/[0-9]/).index;
        let substringOrderId = lastOrderId.substring(startIndexOrderId, lastOrderId.length);
        let incrementNumber = Number(substringOrderId) + 1;

        for (let i = incrementNumber.toString().length; i < substringOrderId.length; i++) {
            initNumber = initNumber + '0';
        }
        newOrderId = `${newOrderId}${initNumber}${incrementNumber}`;
    }
    return newOrderId;
}


module.exports = {
    generateOrderId
}