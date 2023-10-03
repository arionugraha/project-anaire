import React from "react";

const Loading = () => {
    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th className="bg-gray-300 h-6 w-12 animate-pulse"></th>
                        <th className="bg-gray-300 h-6 w-24 animate-pulse"></th>
                        <th className="bg-gray-300 h-6 w-36 animate-pulse"></th>
                    </tr>
                </thead>
                <tbody>
                    {[...Array(5)].map((_, index) => (
                        <tr key={index} className="hover">
                            <td className="bg-gray-200 h-8 w-12 animate-pulse my-2"></td>
                            <td className="bg-gray-200 h-8 w-24 animate-pulse my-2"></td>
                            <td className="bg-gray-200 h-8 w-36 animate-pulse my-2"></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Loading;
