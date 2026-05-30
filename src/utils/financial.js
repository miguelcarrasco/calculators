/**
 * Get the future value of a series of payments made at equal intervals
 *
 * @param annuity the annuity payment per period
 * @param interestRate interest rate per period
 * @param periods the number of periods
 * @return {number} the future value of the annuity
 */
export function getAnnuityFutureValue(annuity, interestRate, periods) {
    if (interestRate === 0) {
        return annuity * periods;
    }

    return (annuity * (Math.pow((1 + interestRate), periods) - 1)) / interestRate;
}

/**
 * Calculates the future value of a principal amount with compound interest.
 *
 * @param {number} principal - The initial amount of money being invested or loaned.
 * @param {number} interestRate - The interest rate per period, represented as a decimal (e.g., 0.05 for 5%).
 * @param {number} periods - The number of periods the interest is compounded over.
 * @return {number} The future value including the principal.
 */
export function getCompoundFutureValue(principal, interestRate, periods) {
    const growthFactor = 1 + interestRate;

    return principal * Math.pow(growthFactor, periods);
}

/**
 * Calculates the future value of savings based on an initial balance, periodic deposits,
 * an annual interest rate, the number of payments per year, and the total number of years.
 *
 * @param {number} initialBalance - The initial amount of money in the account.
 * @param {number} periodicDeposit - The amount deposited at each payment interval.
 * @param {number} annualInterestRate - The annual interest rate as a decimal (e.g., 0.05 for 5%).
 * @param {number} paymentsPerYear - The number of payments made each year.
 * @param {number} years - The total number of years the savings account will accumulate interest.
 * @return {number} The future value of the savings after the specified duration.
 */
export function getSavingsFutureValue(initialBalance, periodicDeposit, annualInterestRate, paymentsPerYear, years) {
    const totalPeriods = years * paymentsPerYear;
    const periodicInterestRate = annualInterestRate / paymentsPerYear;

    const initialBalanceFutureValue = getCompoundFutureValue(
        initialBalance,
        periodicInterestRate,
        totalPeriods
    );

    const periodicDepositsFutureValue = getAnnuityFutureValue(
        periodicDeposit,
        periodicInterestRate,
        totalPeriods
    );

    return initialBalanceFutureValue + periodicDepositsFutureValue;
}