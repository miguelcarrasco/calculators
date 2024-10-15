import {expect, test} from 'vitest'
import {getAnnuityFutureValue} from '../../utils/financial.js'

test('It must calculate the future value of an annuity', () => {
    expect(getAnnuityFutureValue(1000, 0.1, 10)).toBe(15937.424601000022)
})