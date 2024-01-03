// Authenticator.tsx
import axios from 'axios';
import React, {useEffect} from 'react';

interface AuthenticatorProps {
  onAuthSuccess: (accessToken: string) => void;
}

const Authenticator: React.FC<AuthenticatorProps> = ({onAuthSuccess}) => {
  useEffect(() => {
    const CLIENT_ID = 'c3f9e197d28e4bbd8d4d123637ece125';
    const CLIENT_SECRET = '7ded5ca252a74134a48a7cdf32453d03';

    const authParameters = {
      grant_type: 'client_credentials',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    };

    axios
      .post('https://accounts.spotify.com/api/token', null, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        params: authParameters,
      })
      .then(response => onAuthSuccess(response.data.access_token))
      .catch(error => console.error('Error fetching access token:', error));
  }, [onAuthSuccess]);

  return null; // No need to render anything
};

export default Authenticator;
