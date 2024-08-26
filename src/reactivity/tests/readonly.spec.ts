import { readonly } from "../reactive";
describe('reactive',() => {
    it('happy path',() => {
        const original = {foo:1}
        const wrapped  = readonly(original);
        expect(wrapped).not.toBe(original);
        expect(wrapped.foo).toBe(1);

    })
})