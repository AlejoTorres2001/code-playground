const initState = {
    html :"",
    css:"",
    javascript:"", 
}
const codeReducer = (state = initState,action)=>{
    switch (action.type) {
        case "UPDATE_HTML":
            return {...state,html:action.payload}
    
        case "UPDATE_CSS":
            return {...state,css:action.payload}
    
        case "UPDATE_JAVASCRIPT":
            return {...state,javascript:action.payload}
    
        default:
            return state
    }
}
export default codeReducer;