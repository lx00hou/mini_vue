import { mutableHandlers,readonlyHandlers } from "./baseHandle"
export function reactive(raw){
    return createActiveObj(raw,mutableHandlers);
}

export function readonly(raw){
    return createActiveObj(raw,readonlyHandlers);
}
function createActiveObj(raw,baseHandles){
    return new Proxy(raw,baseHandles)
}