import React from "react";

interface Props {
    params: { id: number };
}

const UserDetail = ({ params }: Props) => {
    return <div>UserDetail {params.id}</div>;
};

export default UserDetail;
