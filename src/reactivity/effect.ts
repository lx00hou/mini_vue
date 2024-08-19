class ReactiveEffect{
    private _fn:Function
    constructor(fn:Function){
        this._fn = fn 
    }
    run(){
        activeEffect = this;
        return this._fn()
    }
}

// 实现依赖收集
const targetMap = new Map();
export function track(target,key){ 
    // target -> key -> dep
    let depsMap = targetMap.get(target);
    if(!depsMap){
        depsMap = new Map();
        targetMap.set(target,depsMap);
    } 

    let dep = depsMap.get(key);
    if(!dep){
        dep = new Set();
        depsMap.set(key,dep)
    }
    dep.add(activeEffect);
}

// 实现派发更新
export function trigger(target,key){
    /**
     * 根据 对象 取出key
     * 根据 key 去除存入的fn
     * 遍历执行 fn
     */
    let depsMap = targetMap.get(target);
    let dep = depsMap.get(key);
    for (const effect of dep) {
        effect.run();
    }
}

let activeEffect; // 创建全局变量 获取到 fn,存入依赖收集函数中
export function effect(fn:Function){
  const _effect = new ReactiveEffect(fn);
  _effect.run();

  return _effect.run.bind(_effect);
}