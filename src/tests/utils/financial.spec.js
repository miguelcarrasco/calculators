import {expect, test} from 'vitest'
import {getAnnuityFutureValue, getSavingsFutureValue} from '../../utils/financial.js'

test('It must calculate the future value of an annuity', () => {
    expect(getAnnuityFutureValue(1000, 0.1, 10)).toBe(15937.424601000022)
})

test('it must calculate the future value of savings periodic deposits', () => {
    expect(getSavingsFutureValue(1000, 1000, 0.1, 12, 10)).toBe(207552.02039433146)
})