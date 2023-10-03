import React from "react";

interface Props {
    params: { slug: string[] };
}

const ProductPage = ({ params }: Props) => {
    return <div>ProductPage {params.slug}</div>;
};

export default ProductPage;
