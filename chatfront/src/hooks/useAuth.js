

const useAuth = ()=>{
    const token = localStorage.getItem("userAuth");
    return {
        isLoggedIn:token ? true : false
    }
}

export default useAuth;