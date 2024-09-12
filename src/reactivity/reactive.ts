import { mutableHandlers,readonlyHandlers } from "./baseHandle"
export const enum ReactiveFlags {
    IS_REACTIVE = "__v_isReactive"
} 
export function reactive(raw){
    return createActiveObj(raw,mutableHandlers);
}

export function isReactive(value){
    return value[ReactiveFlags.IS_REACTIVE]
}

export function readonly(raw){
    return createActiveObj(raw,readonlyHandlers);
}
function createActiveObj(raw,baseHandles){
    return new Proxy(raw,baseHandles)
}