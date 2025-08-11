import './Login.css';
import {useRef} from "react";
import {useNavigate} from "react-router";

function Login() {
    const txtUsernameRef =
        useRef<HTMLInputElement>(null);

    const txtPasswordRef =
        useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function login(){
        const username = txtUsernameRef
            .current!.value.trim();
        const password = txtPasswordRef
            .current!.value.trim();
        const user = {username, password};
        const response = await fetch('http://localhost:8080/app/users/login',
            {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include"
            });
        if (response.status === 201){
            navigate('/');
        }else{
            alert("Invalid login credentials, try again");
            txtUsernameRef.current!.select();
            txtUsernameRef.current!.focus();
        }
    }

    return (
        <main className='d-flex justify-content-center
         align-items-center vh-100'>
            <div className='border rounded p-3 text-center'>
                <h1>
                    <i className='bi bi-lock-fill'></i>
                    Login
                </h1>
                <p>Enter your login credentials to continue</p>
                <form action="javascript:void(0)"
                      onSubmit={()=> login()}>
                    <div>
                        <label className='mb-2' htmlFor="txt-username">
                            Username</label>
                        <input ref={txtUsernameRef} className='form-control text-center'
                        placeholder='Enter your username here'
                               required
                               id='txt-username' type="text"/>
                    </div>
                    <div className='mt-2'>
                        <label className='mb-2' htmlFor="txt-password">
                            Password</label>
                        <input ref={txtPasswordRef} className='form-control text-center'
                               placeholder='Enter your password here'
                               required
                               id='txt-password' type="text"/>
                    </div>
                    <button className='btn btn-primary mt-3'>Log in</button>
                </form>
            </div>
        </main>
    );
}

export default Login;