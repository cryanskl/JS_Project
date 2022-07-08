/* 
    @description 
*/

class MyPromise {
    state = 'pending'//state, pending, fulfilled, rejected
    value = undefined // value of success
    reason = undefined // reason of fail
    resolveCallBacks = []//pending cunchu success callback
    rejectCallBacks = []//pending cunchu fail callback

    constructor(fn){       
        const resolveHandler =(value)=>{
            if(this.state==='pending'){
                this.state = 'fulfilled'
                this.value = value
                this.resolveCallBacks.forEach(fn => fn(this.value))
            }
        }
        const rejectHandler =(reason)=>{
            if(this.state='pending'){
                this.state = 'rejected'
                this.reason = reason
                this.rejectCallBacks.forEach(fn=>fn(this.value))
            }
        }
        try{
            fn(resolveHandler, rejectHandler)
        }catch(err){
            rejectHandler(err)
        }
    }

    then(fn1,fn2){
        //pending xia, fn1 and fn2 cunchu 
        fn1 = typeof fn1 ==='function' ? fn1:(v)=>v
        fn2 = typeof fn2 ==='function' ? fn2:(e)=>e
        if(this.state==='pending'){
            const p1 = new MyPromise((resolve,reject)=>{
                this.resolveCallBacks.push(()=>{
                    try {
                        const newValue = fn1(this.value)
                        resolve(newValue)//p1.value
                    } catch (err) {
                        reject(err)
                    }
                })
                this.rejectCallBacks.push(()=>{
                    try {
                        const newReason = fn2(this.reason)
                        reject(newReason)//p2.reason
                    } catch (err) {
                        reject(err)
                }
            })
        })
            return p1
        }
        if(this.state==='fulfilled'){
            const p1 = new MyPromise((resolve,reject)=>{
                try {
                    const newValue = fn1(this.value)
                    resolve(newValue)
                } catch (err) {
                    reject(err)
                }
            })
            return p1
        }
        if(this.state==='rejected'){
            const p1 = new MyPromise((resolve,reject)=>{
                try {
                    const newReason = fn2(this.reason)
                    resolve(newReason)//p1.reason
                } catch (err) {
                    reject(err)
                }
            })
            return p1
        }
    }

    //catch shi then de yufatang
    catch(fn){
        return this.then(null,fn)
    }
}
MyPromise.resolve = function(value){
    return new MyPromise((resolve, reject)=>resolve(value))
}
MyPromise.reject = function(reason){
    return new MyPromise((resolve,reject)=>reject(reason))
}