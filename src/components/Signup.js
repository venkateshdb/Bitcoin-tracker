import { useNavigate } from 'react-router-dom';
import { signInWithGoogle } from "../firebase/firebase"


export default function Signin(props){
    let navigate = useNavigate();

    const onSuccess = async () => {

        let result = await signInWithGoogle()
        if(result)
            props.setLoggedIn(true)
            navigate('/price')
    }

    return (
         <div className='container'>
            <div className="google-btn" onClick={onSuccess}>
                <div className="google-icon-wrapper">
                    <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
                </div>
                <p className="btn-text"><b>Sigup with google</b></p>
            </div>
        </div>
    )
}

