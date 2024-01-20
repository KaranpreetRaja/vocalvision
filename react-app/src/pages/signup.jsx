import axios from 'axios';
import Navbar from '../components/navbar';
import { useNavigate } from 'react-router-dom';

export default function Signup(){
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        const firstName = e.target.elements.firstName.value;
        const lastName = e.target.elements.lastName.value;
        const fullName = `${firstName} ${lastName}`

        console.log(email);
        console.log(password);
        console.log(firstName);
        console.log(lastName);

        try {
            const response = await axios.post('/register', {
                email,
                password,
                fullName
            });

            const uid = response.data.uid;
            console.log('Register successful! UID:', uid);
            navigate(`/dashboard/${uid}`);
        } catch (error) {
            console.error('Register failed:', error.message);
        }
    }

    return(
        <div>
            <Navbar/>
            <div className="sign-up-form-container">
                <form className="sign-up-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                className='input-field'
                                type="text"
                                id="firstName"
                                name="firstName"
                                placeholder="First name"
                                required
                            />
                        </div>
                        <div className="form-group" style={{ marginLeft: 10 }}>
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                className='input-field'
                                type="text"
                                id="lastName"
                                name="lastName"
                                placeholder="Last name"
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            className='input-field'
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            className='input-field'
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button className="btn-submit bg-blue-500 hover:bg-blue-700 transition ease-in-out duration-300 mt-3" type="submit">
                        Signup
                    </button>
                </form>
            </div>
        </div>
    )
}