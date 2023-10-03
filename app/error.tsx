"use client";

import React from "react";

interface Props {
    error: Error;
    reset: () => void;
}

const Error = ({ error, reset }: Props) => {
    return (
        <>
            <div>An unexpected error occurred.</div>
            <button className="btn">Retry</button>
        </>
    );
};

export default Error;
