import React, { useEffect } from 'react';
import Button from '../components/common/Button';
import LinkBankButton from '../components/LinkBankButton';
import UserInfo from '../components/UserInfo';
import usePlaid from '../hooks/usePlaid';
import Container from "./../components/common/Container"

const MyAccount = () => {
    const plaid = usePlaid()

    useEffect(() => {
        plaid.getLinkedBanks()
        .then(() => console.log("fetching down"))
        .catch((e) => console.log(e))
    }, []) // eslint-disable-line

    return (
        <>
            <Container>
                <div className="w-full rounded-lg bg-white shadow my-5 py-8 px-5">
                    <div className="flex justify-between">
                        <UserInfo />
                        <div className="w-20">
                            <Button>Edit</Button>
                        </div>
                    </div>
                    <div className="my-5 border-2 border-gray-200"></div>
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-bold">Linked Bank(s)</h1>
                        <div>
                            <LinkBankButton />
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default MyAccount;