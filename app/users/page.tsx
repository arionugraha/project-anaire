import React from "react";
import Link from "next/link";
import UserTable from "../components/UserTable";

interface Props {
    searchParams: { sortOrder: string };
}

const UsersPage = async ({ searchParams }: Props) => {
    return (
        <>
            <div className="m-auto">
                <UserTable sortOrder={searchParams.sortOrder} />
            </div>
            <div className="btn">
                <Link href={"/users/new"}>New User</Link>
            </div>
        </>
    );
};

export default UsersPage;
