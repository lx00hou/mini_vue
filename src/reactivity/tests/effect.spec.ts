
import { reactive } from "../reactive"; 
import { effect , stop} from "../effect";
describe('effect',() => {
    it('happy path',() => {
        const user = reactive({
            age:10,
        })
        let nextAge;
        effect(() => {
            nextAge = user.age + 1;
        })

        expect(nextAge).toBe(11);

        // update
        user.age++;
        expect(nextAge).toBe(12);

    })

    it('should return runner when call effect',() => {
        /**
         * 调用 effect 之后会返回一个 function ,当  调用function,会调用传入effect的fn,会将 fn返回值 return
         *effect(fn) -> function -> fn -> return 
         */
        let foo = 10;
        const runner = effect(() => {
            foo++;
            return 'foo'
        });
        expect(foo).toBe(11);
        const r = runner();
        expect(foo).toBe(12);
        expect(r).toBe('foo');

    })

})