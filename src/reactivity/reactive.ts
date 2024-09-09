import { mutableHandlers,readonlyHandlers } from "./baseHandle"
export const enum  ReactiveFlags {
    
} 
export function reactive(raw){
    return createActiveObj(raw,mutableHandlers);
}

export function isReactive(value){
    return 
}

export function readonly(raw){
    return createActiveObj(raw,readonlyHandlers);
}
function createActiveObj(raw,baseHandles){
    return new Proxy(raw,baseHandles)
}