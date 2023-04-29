import { useEffect, useState } from 'react';

const withAuth = (WrappedComponent) => {
  const Auth = () => {
    const [tokenDetails, setTokenDetails] = useState(null);

    useEffect(() => {
      async function check() {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/';
        } else {
          const isValid = await fetch('/api/validateToken', {
            method:"POST",
            body:JSON.stringify({
                token:token
            }),
            headers:{
                "Content-type": "application/json",
            }
          });
          const data = await isValid.json();
          setTokenDetails(data);        
        }
      }

      check();
    }, []);

    return <>{tokenDetails && <WrappedComponent {...tokenDetails} />}</>;
  };

  return Auth;
};

export default withAuth;
