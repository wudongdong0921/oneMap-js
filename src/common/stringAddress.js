const stringCode = function(str) {
    
    var first,last,arr,firstName,lastName;
    var index = str && str.indexOf('datasources')
    if(index && index > 0) {
        
        first = str.slice(0,index)
        last = str.slice(index)
        arr = last.split('/')
        firstName = arr[arr.length-1]
        lastName = arr[arr.length-3]
    }
    
    return {
        first: first,
        firstName: firstName,
        lastName: lastName
    }
}
export default {
    stringCode
}