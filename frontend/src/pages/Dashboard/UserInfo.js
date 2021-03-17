import React from "react";
import { FlexBox } from "../../components/common";
import { UserCircle } from "../../components/icons";
import useAuth from "../../hooks/useAuth";

const UserInfo = () => {
  const auth = useAuth();
  return (
    <div className="mb-8 cursor-pointer">
      <FlexBox>
        <div className="w-11 h-11">
          <UserCircle className="w-11 h-11 fill-gray-300" />
        </div>
        <div className="ml-1">
          <h1 className="font-extrabold leading-3">{`${auth?.user?.first_name} ${auth?.user?.last_name}`}</h1>
          <span className="text-xs leading-3 text-gray-500">
            {auth?.user?.username}
          </span>
        </div>
      </FlexBox>
    </div>
  );
};

export default UserInfo;
