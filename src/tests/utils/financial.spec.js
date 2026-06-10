import { expect, test } from 'vitest'
import {
    DepositTiming,
    getAnnuityFutureValue,
    getCompoundFutureValue,
    getLoanPeriodicPayment,
    getSavingsFutureValue,
} from '@/utils/financial.js'

test('It must calculate the future value of an annuity', () => {
    expect(getAnnuityFutureValue(1000, 0.1, 10)).toBeCloseTo(15937.424601000022)
})

test('it must calculate the future value of an annuity with deposits at the beginning of the period', () => {
    expect(
        getAnnuityFutureValue(
            1000,
            0.1,
            10,
            DepositTiming.BEGINNING_OF_PERIOD,
        ),
    ).toBeCloseTo(17531.167061100026)
})

test('it must calculate the future value of an annuity when the interest rate is zero', () => {
    expect(getAnnuityFutureValue(1000, 0, 10)).toBe(10000)
})

test('it must throw an error when the annuity deposit timing is invalid', () => {
    expect(() => {
        getAnnuityFutureValue(1000, 0.1, 10, 'INVALID_TIMING')
    }).toThrow('Invalid deposit timing: INVALID_TIMING')
})

test('it must calculate compound future value', () => {
    expect(getCompoundFutureValue(1000, 0.1, 10)).toBeCloseTo(2593.7424601)
})

test('it must calculate compound future value when the interest rate is zero', () => {
    expect(getCompoundFutureValue(1000, 0, 10)).toBe(1000)
})

test('it must calculate the future value of savings periodic deposits', () => {
    expect(getSavingsFutureValue(1000, 1000, 0.1, 12, 10)).toBeCloseTo(207552.02039433146)
})

test('it must calculate the future value of savings periodic deposits at the beginning of the period', () => {
    expect(
        getSavingsFutureValue(
            1000,
            1000,
            0.1,
            12,
            10,
            DepositTiming.BEGINNING_OF_PERIOD,
        ),
    ).toBeCloseTo(209259.0618851933)
})

test('it must calculate the future value of savings when the annual interest rate is zero', () => {
    expect(getSavingsFutureValue(1000, 100, 0, 12, 10)).toBe(13000)
})

test('it must throw an error when the savings deposit timing is invalid', () => {
    expect(() => {
        getSavingsFutureValue(1000, 100, 0.1, 12, 10, 'INVALID_TIMING')
    }).toThrow('Invalid deposit timing: INVALID_TIMING')
})

test('it must calculate the periodic payment required to amortize a loan', () => {
    expect(getLoanPeriodicPayment(100000, 0.01, 60)).toBeCloseTo(2224.444768779898)
})

test('it must calculate the periodic loan payment when the interest rate is zero', () => {
    expect(getLoanPeriodicPayment(100000, 0, 60)).toBeCloseTo(1666.6666666666667)
})