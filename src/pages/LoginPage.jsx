const LoginPage = () => {
    

    const onSubmitHandle = (event) => {
        event.preventDefault;
        if(event.target.user.value === 'user' && event.target.password.value === 'admin') {
            setAuth(true);
        }
    }

    return (
        <form onSubmit={onSubmitHandle}>
            <input type="text" name="user"/>
            <input type="password" name="password"/>
        </form>
    );

}

export default LoginPage;