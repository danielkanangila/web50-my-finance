import React, { useEffect, useState } from 'react';
import Button from '../components/common/Button';
import List from '../components/common/List';
import PageLoader from '../components/common/PageLoader';
import LinkBankButton from '../components/LinkBankButton';
import UserInfo from '../components/UserInfo';
import usePlaid from '../hooks/usePlaid';
import Container from "./../components/common/Container"

const MyAccount = () => {
    const [bankList, setBankList] = useState([]);
    const [loading, setLoading] = useState(true) 
    const plaid = usePlaid()

    useEffect(() => {
        setLoading(true)
        plaid.getLinkedBanks(setBankList)
        .then(() => setLoading(false))
        .catch((e) => {setLoading(false); console.log(e)})
    }, []) // eslint-disable-line

    const unlinkBank = async (access_token_id) => {
        await plaid.unlinkBank(access_token_id, setBankList)
    } 

    return (
        <>
            {loading && (
                <PageLoader
                visibility={true}
                message="Retrieving your account information..."
                />
            )}
            {!loading && 
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
                        <div className="mt-7"></div>
                        <List data={bankList?.institutions?.map((item, index) => 
                                (<>
                                    <span>{item.country.join('|')} - {item.name}</span>
                                    <span onClick={() => unlinkBank(item.access_token_id)} className="material-icons text-red-500 cursor-pointer hover:text-red-400">delete</span>
                                </>)
                            )} />
                    </div>
                </Container>
            }
        </>
    );
};

export default MyAccount;