import React, { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import useLoader from "../../hooks/useLoader";
import usePlaid from "../../hooks/usePlaid";
import Error from "./Error";
import Button from "./../../components/common/Button";
import PageLoader from "../../components/common/PageLoader";

const Home = () => {
  const auth = useAuth();
  const plaid = usePlaid();

  useEffect(() => {
    if (auth.user)
      plaid
        .fetchAccounts(auth.user.id)
        .then((_) => {})
        .catch((error) => console.log(error));
    return () => {};
  }, [auth.user]);

  return (
    <div className="relative">
      <Error />
      <Splash visibility={!plaid.state.accounts.length} />
      <PageLoader visibility={true} message="Fetching your bank data..." />
    </div>
  );
};

/** Visible only if the user has no bank account linked yet */
const Splash = ({ visibility }) => {
  const loader = useLoader();
  const auth = useAuth();
  const plaid = usePlaid();

  if (!loader.status && visibility) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center overflow-y-hidden">
        <h1 className="text-2xl font-bold text-gray-500 mb-5">
          Welcome {auth?.user?.first_name + " " + auth?.user?.last_name}
        </h1>
        <p className="mb-5 text-xl">You haven't linked a bank account yet.</p>
        <div>
          <Button onClick={() => plaid.open()}>Please Link Your Bank</Button>
        </div>
      </div>
    );
  } else return <></>;
};

export default Home;
