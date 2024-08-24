import { extend } from "../shared"; 
class ReactiveEffect{
    private _fn:Function;
    deps = [];
    active = true;
    onStop?:() => void;
    public scheduler:Function | undefined
    constructor(fn:Function,scheduler?:Function){
        this._fn = fn;
        this.scheduler = scheduler
    }
    run(){
        activeEffect = this;
        return this._fn()
    }
    stop(){
        if(this.active){
            clearUpEffect(this);
            this.onStop && this.onStop(); 
            this.active = false;
        }
    }
}
function clearUpEffect(effect){
    effect.deps.forEach((dep:any) => {
        dep.delete(effect)
    });
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

    if(!activeEffect) return
    dep.add(activeEffect);
    activeEffect.deps.push(dep)
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
        if(effect.scheduler){
            effect.scheduler();
        }else {
            effect.run();
        }
    }
}

let activeEffect; // 创建全局变量 获取到 fn,存入依赖收集函数中
export function effect(fn:Function,options:any = {}){
  const _effect = new ReactiveEffect(fn,options.scheduler);
  extend(_effect,options);

  _effect.run();

  const runner:any = _effect.run.bind(_effect);
  runner.effect = _effect;
  return runner
}


export function stop(runner){
    runner.effect.stop()

}