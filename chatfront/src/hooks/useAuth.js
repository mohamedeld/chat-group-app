

const useAuth = ()=>{
    const user = localStorage.getItem("user");
    const userData = JSON.parse(user);
    return {
        isLoggedIn:userData?.id ? true : false
    }
}

export default useAuth;