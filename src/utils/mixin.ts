export default function mixin(func: Object) {
    function f(target: any) {
        Object.assign(target.prototype, func)
    }
    return f
}

export const sayName = () => {
    console.log('111')
}