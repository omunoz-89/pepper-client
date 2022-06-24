import firebase from 'firebase/app';
import { auth } from '../config/firebase'
import logging from '../config/logging';
import axios from 'axios';
import config from '../config/config';
import IUser from '../interfaces/user';



export const SignInWithSocialMedia = (provider: firebase.auth.AuthProvider) =>
    new Promise<firebase.auth.UserCredential>((resolve, reject) => {
        auth.signInWithPopop(provider)
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });

export const Authenticate = async (uid: string, name : string, fire_token: string, callback: (error: string | null, user: IUser | null) => void) => {
    try{
        const response = await axios({
            method: 'Post',
            url: `${config.server.url}/user/login`,
            data: {
                uid,
                name
            },
            header: { Authorization: `Bearer ${fire_token}`}
        })

        if (response.status === 200 || response.status === 201 || response.status === 304)
        {
            logging.info('Successfully authenticated');
            callback(null, response.data.user);
        }
        else
        {
            logging.warn('Unable to authenticate');
            callback('Unable to authenticate', null);
        }
    }
    catch (error)
    {
        logging.error(error);
        callback('Unable to aiuthenticate', null)
    }
}

