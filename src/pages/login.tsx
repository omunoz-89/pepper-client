import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader } from 'reactstrap';
import { Providers } from '../config/firebase';
import logging from '../config/logging';
import firebase from 'firebase/app';
import { Authenticate, SignInWithSocialMedia } from '../modules/auth';
import UserContext from '../contexts/user';


const LoginPage: React.FunctionComponent<{}> = props => {
    const [authenticating, setAuthenticating] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const userContext = useContext(UserContext)
    const history = useNavigate();
    const isLogin = window.location.pathname.includes('login');

    const signInWithSocialMedia = (provider: firebase.auth.AuthProvider) => {
        if (error !== '') setError('');

        setAuthenticating(true);

        SignInWithSocialMedia(provider)
        .then(async (result) => {
            logging.info(result);
            
            let user = result.user;
            
            if (user)
            {
                let uid = user.uid;
                let name = user.displayName;

                if (name)
                {
                    try 
                    {
                        let fire_token = await user.getIdToken();

                        Authenticate(uid, name, fire_token, (error, _user) => {
                            if (error)
                            {
                                setError(error);
                                setAuthenticating(false);
                            }
                            else if (_user)
                            {
                                userContext.userDispatch({ type: 'login', payload: { user: _user, fire_token } })
                            }
                        });
                    } 
                    catch (error) 
                    {
                        setError('Invalid token.');
                        logging.error(error);
                        setAuthenticating(false);
                    }
                }
                else
                {
                    setError('The identify provider is missing a display name.')
                    setAuthenticating(false);
                }
                
            }
            else
            {
                setError('The social media provider does not have enough information. Please try a different provider.')
                setAuthenticating(false);
            }
        })
        .catch(error => {
            logging.error(error);
            setAuthenticating(false);
            setError(error.message);
        });
    }

    return (
            <Card>
                <CardHeader>
                    {isLogin ? 'Login' : 'Sign Up'}
                </CardHeader>
                <CardBody>
                    <Button
                        block
                        disabled={authenticating}
                        onClick={() => signInWithSocialMedia(Providers.google)}
                        style={{ backgroundColor:'#ea4335', borderColor: '#ea4335'}} 
                    >
                        <i className="fab fa-google mr-2"></i> Sign {isLogin ? 'in' : 'up'} with Google
                    </Button>
                    {authenticating} 
                </CardBody>
            </Card>
    );
}

export default LoginPage;