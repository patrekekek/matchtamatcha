import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const role = 'user';    //needs fixing

    const { signup, error, isLoading } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await signup(email, password, firstName, lastName, address, role);
    }

    return (
        <div className="signup-container">
            <form className="signup" onSubmit={handleSubmit}>
                <h3>Sign up</h3>

                <div className="name">
                    <input
                        type="text" 
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                        placeholder="First Name"
                    />

                    <input
                        type="text" 
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        placeholder="Last Name"
                    />
                </div>

                <input
                    type="text" 
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    placeholder="Address"
                />

                <input
                    type="email" 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="Email"
                />

                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder="Password"
                />

                <button disabled={isLoading}>Sign up</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    )
}

export default Signup;