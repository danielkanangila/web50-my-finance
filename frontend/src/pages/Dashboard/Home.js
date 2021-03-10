import React, { Suspense, useEffect, useState } from "react";
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
    <Suspense
      fallback={
        <PageLoader visibility={true} message="Fetching your bank data..." />
      }
    >
      <div className="relative">
        <div className="p-5">
          <Error />
        </div>
        <Splash visibility={!plaid.state.accounts.length} />
      </div>
    </Suspense>
  );
};

/** Visible only if the user has no bank account linked yet */
const Splash = ({ visibility }) => {
  const [display, setDisplay] = useState(visibility);
  const loader = useLoader();
  const auth = useAuth();
  const plaid = usePlaid();

  useEffect(() => {
    if (plaid.state.accounts.length) setDisplay(false);
    else setDisplay(true);
    return () => {};
  }, [plaid.state.accounts.length]);

  if (!loader.status && display) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center overflow-y-hidden">
        <h1 className="text-2xl font-bold text-gray-500 mb-5">
          Welcome {auth?.user?.first_name + " " + auth?.user?.last_name}
        </h1>
        <p className="mb-5 text-xl">You haven't linked a bank account yet.</p>
        <div>
          <Button onClick={() => plaid.open(auth)}>
            Please Link Your Bank
          </Button>
        </div>
      </div>
    );
  } else return <></>;
};

export default Home;
