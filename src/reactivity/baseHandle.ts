import { track,trigger } from "./effect";
import { ReactiveFlags } from "./reactive";

const get = creteGetter();
const set = creteSetter();
const readonlyGet = creteGetter(true);


function creteGetter(isReadonly = false){
    return function get(target,key){
        if(key === ReactiveFlags.IS_REACTIVE ){
            return !isReadonly
        }

        const res = Reflect.get(target,key);
        if(!isReadonly){
            track(target,key); // 依赖收集
        }
        return res
    }
}

function creteSetter(){
    return function set(target,key,value){
        /**
         * @returns 返回一个布尔值,更新target 例: {foo:1} => foo+1 =>  {foo:2}
         */
        const res = Reflect.set(target,key,value);
        trigger(target,key);   // 派发更新
        return res
    }
}


export const mutableHandlers = {
    get,
    set
} 

export const readonlyHandlers = {
    get: readonlyGet,
    set:() => {
        return true
    }
}