/**
 * Get the future value of a series of payments made at equal intervals
 * @param annuity the annuity payment per period
 * @param interestRate interest rate per period
 * @param periods the number of periods
 * @returns {number} the future value of the annuity
 */
export function getAnnuityFutureValue(annuity, interestRate, periods) {
    return (annuity * (Math.pow((1 + interestRate), periods) - 1)) / interestRate;
}

export function getSavingsFutureValue(initialBalance, periodicDeposit, annualInterestRate, paymentsPerYear, years) {
    let adjustedNumberOfPeriods = years * paymentsPerYear;
    let adjustedInterestRate = annualInterestRate / paymentsPerYear;
    let initialBalanceFutureValue = initialBalance * Math.pow(1 + adjustedInterestRate, adjustedNumberOfPeriods);
    let periodicPaymentsFutureValue = getAnnuityFutureValue(periodicDeposit,
        adjustedInterestRate, adjustedNumberOfPeriods);
    return initialBalanceFutureValue + periodicPaymentsFutureValue;
}