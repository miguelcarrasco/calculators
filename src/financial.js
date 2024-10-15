let exports = {};

exports.getFutureValue = (annuity, interestRate, periods) => {
    return (annuity * (Math.pow((1 + interestRate), periods) - 1)) / interestRate;
};
export default exports;