export function reactive(raw){
    /**
     * 对目标对象进行代理
     */
    return new Proxy(raw,{
        get(target,key){  
            /**
             * @params target:当前传入的对象 例:{foo:1}
             * @params key:用户访问的属性 例:foo
             * @returns 返回当前属性对应的value值 例:1
             */
            const value = Reflect.get(target,key);
            // 依赖收集
            return value
        },
        set(target,key,value){
            /**
             * @returns 返回一个布尔值,更新target 例: {foo:1} => foo+1 =>  {foo:2}
             */
            const newTarget = Reflect.set(target,key,value);
            // 触发依赖
            return newTarget
        }
    })
}