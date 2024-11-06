import React, { useEffect, useState } from 'react';
import '../css/Navbar.css'
import '../css/Home.css'
import Navbar from '../components/Navbar';
import { ref, get } from 'firebase/database';
import database from '../components/firebaseConfig';

function Home() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const sessionData = JSON.parse(sessionStorage.getItem('sessionData'));
        console.log('Session Data from sessionStorage:', sessionData);
    }, []);

    const getUsers = async () => {
        const usersRef = ref(database, 'users');
        const userSnapshot = await get(usersRef);

        if (userSnapshot.exists()) {
            const usersData = userSnapshot.val();
            const usersArray = Object.keys(usersData).map((key) => {
                return {
                    id: key,
                    username: usersData[key].username
                };
            });
            setUsers(usersArray);
            console.log(users)
        }
    }
    return (
        <div>
            <Navbar />
            <h1>Home Page</h1>
            <button onClick={getUsers}>
                Get Session Details
            </button>
            <h2>Start a direct message</h2>
            <div className='dm-container'>
                <ul className='dm-users'>
                    {users.map((user) => (
                        <li key={user.id} className='dm-user'>
                            <div className='dm-header'>
                                <span className='dm-name'>{user.username}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Home;
