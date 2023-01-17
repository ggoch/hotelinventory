import { Calculator } from "./testservice"

describe('testService',() => {
    it('should add 2 number',() => {
        const service = new Calculator();
        expect(service.add(2,4)).toBe(6);
    })
    it('should sub 2 number',() => {
        const service = new Calculator();
        expect(service.subtract(2,4)).toBe(-2);
    })
    it('should multiply 2 number',() => {
        const service = new Calculator();
        expect(service.multiply(2,4)).toBe(8);
    })
})