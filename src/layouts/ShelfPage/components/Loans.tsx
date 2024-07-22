import { useOktaAuth } from '@okta/okta-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ShelfCurrentLoans from '../../../models/ShelfCurrentLoans';
import { SpinnerLoading } from '../../Utils/SpinnerLoading';
import { error } from 'console';

export const Loans = () => {
    
    const { authState } = useOktaAuth();
    const [httpError, setHttpError] = useState(null);

    // Current Loans
    const [shelfCurrentLoans, setShelfCurrentLoans] = useState<ShelfCurrentLoans[]>([]);
    const [isLoadingUserLoans, setIsLoadingUserLoans] = useState(true);

    useEffect(() => {
        const fetchUserCurrentLoans = async () => {
            if(authState && authState.isAuthenticated) {
                const url = `http://localhost:8080/api/books/secure/currentloans`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${authState.accessToken?.accessToken}`,
                        'content-type': 'application/json'
                    }
                }
                const shelfCurrentLoansResponse = await fetch(url, requestOptions);
                if(!shelfCurrentLoansResponse.ok) {
                    throw new Error('Something went wrong!');
                }
                const shelfCurrentLoansResponseJson = await shelfCurrentLoansResponse.json();
                setShelfCurrentLoans(shelfCurrentLoansResponseJson);
            }
            setIsLoadingUserLoans(false);
        }
        fetchUserCurrentLoans().catch((error: any) => {
            setIsLoadingUserLoans(false);
            setHttpError(error.message);
        })
        
    }, [authState]);

    if(isLoadingUserLoans) {
        return (<SpinnerLoading />);
    }

    if(httpError) {
        return (
            <div className='container mt-5'>
                <p>
                    {httpError}
                </p>
            </div>
        )
    }
}