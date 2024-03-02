import React from "react";
import CategoryPreview from "./CategoryPreview";
import ProductList from "./ProductList";

const LandingBody = () => {
  return (
    <>
      <div className="bg-gray-50 h-screen">
        <CategoryPreview />
      </div>
    </>
  );
};

export default LandingBody;
