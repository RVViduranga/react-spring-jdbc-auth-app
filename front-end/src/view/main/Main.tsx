import './Main.css';
import {useLoaderData, useNavigate} from "react-router";

type Client = {
    id: string,
    name: string,
    address: string,
    contact: string
}
type LoadType = {
    clients: Client[]
}

function Main() {
    const {clients} = useLoaderData<LoadType>();
    const navigate = useNavigate();

    async function logout() {
        const response = await fetch('http://localhost:8080/app/users/logout',
            {
                method: 'DELETE',
                credentials: 'include'
            });
        if (response.status === 204){
            navigate('/login');
        }else{
            alert("Something went wrong, try again");
        }
    }

    return (
        <>
            <header className='text-center p-2'>
                <h1>React Spring JDBC Auth App</h1>
                <button onClick={() => logout()}>Log out</button>
            </header>
            <main className='p-2'>
                <table className='table table-hover table-bordered'>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>ADDRESS</th>
                        <th>CONTACT</th>
                    </tr>
                    </thead>
                    <tbody>
                    {clients.map(c => (<tr>
                        <td>{c.id}</td>
                        <td>{c.name}</td>
                        <td>{c.address}</td>
                        <td>{c.contact}</td>
                    </tr>))}
                    </tbody>
                </table>
            </main>
        </>
    );
}

export default Main;