import { sort } from "fast-sort";
import Link from "next/link";
import React from "react";

interface User {
    id: number;
    name: string;
    email: string;
}

interface Props {
    sortOrder: string;
}

const UserTable = async ({ sortOrder }: Props) => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users", { cache: "no-store" });
    const users: User[] = await res.json();
    const sortedUsers: User[] = sort(users).asc(sortOrder === "name" ? (user) => user.name : sortOrder === "email" ? (user) => user.email : (user) => user.id);

    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            <Link href={"/users"}>ID</Link>
                        </th>
                        <th>
                            <Link href={"/users?sortOrder=name"}>Name</Link>
                        </th>
                        <th>
                            <Link href={"/users?sortOrder=email"}>Email</Link>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedUsers.map((user) => (
                        <tr key={user.id} className="hover">
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
