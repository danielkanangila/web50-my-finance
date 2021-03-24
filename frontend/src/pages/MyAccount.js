import React, { useEffect } from 'react';
import UserInfo from '../components/UserInfo';
import Container from "./../components/common/Container"

const MyAccount = () => {

    useEffect(() => {
        console.log("it works");
    }, [])

    return (
        <>
        
                <h1>My Account</h1>
            {/* <Container>
                <div className="w-full rounded-lg">
                    <UserInfo />
                </div>
            </Container> */}
        </>
    );
};

export default MyAccount;