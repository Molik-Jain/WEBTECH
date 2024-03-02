import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { addToCart } from "@/slice/cartSlice";
import { Link } from "react-router-dom";
import { Input } from "../ui/input";
import { useState } from "react";

const ProductList = ({ products, text }) => {
  const dispatch = useDispatch();
  const [searchKey, setSearchKey] = useState("");

  const [categoryFilter, setCategoryFilter] = useState("");
  const [sizeFilter, setSizeFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [brandFilter, setBrandFilter] = useState("");

  const sortProducts = (sortBy) => {
    switch (sortBy) {
      case "lowToHigh":
        return products.slice().sort((a, b) => a.price - b.price);
      case "highToLow":
        return products.slice().sort((a, b) => b.price - a.price);
      default:
        return products;
    }
  };

  const filterProducts = (products) => {
    let filteredProducts = [...products];

    if (categoryFilter) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === categoryFilter
      );
    }

    if (sizeFilter) {
      filteredProducts = filteredProducts.filter((product) =>
        product.size.includes(sizeFilter)
      );
    }

    if (brandFilter) {
      filteredProducts = filteredProducts.filter(
        (product) => product.brand === brandFilter
      );
    }

    return filteredProducts;
  };

  const sortedProducts = sortProducts(sortBy);
  const filteredPro = filterProducts(sortedProducts);

  const filteredProducts =
    products &&
    filteredPro.filter(
      (obj) =>
        obj.name
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(searchKey.toLowerCase().replace(/\s+/g, "")) ||
        obj.color
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(searchKey.toLowerCase().replace(/\s+/g, ""))
    );

  return (
    <>
      <div className="bg-white py-10 sm:py-0">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="flex justify-between flex-col sm:flex-row">
            <h2 className="text-xl font-bold text-gray-900">{text}</h2>
            <Input
              value={searchKey}
              placeholder="Search Here..."
              onChange={(e) => setSearchKey(e.target.value)}
              className="w-1/2"
            />
          </div>

          <div className="flex gap-5 flex-col sm:flex-row justify-between items-center mt-10">
            <div className=" flex items-center justify-end ">
              <label htmlFor="sortBy" className="mr-2">
                Sort by:
              </label>
              <select
                id="sortBy"
                className="py-1 text-sm text-primary border rounded-md"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="">Select</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
              </select>
            </div>
            <div>
              <label htmlFor="categoryFilter">Category:</label>
              <select
                id="categoryFilter"
                className="ml-2 py-1 text-sm text-primary border rounded-md"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">All</option>
                {/* Add options dynamically based on categories available */}
                {Array.from(
                  new Set(products.map((product) => product.category))
                ).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="sizeFilter">Size:</label>
              <select
                id="sizeFilter"
                value={sizeFilter}
                className="ml-2 py-1 text-sm text-primary border rounded-md"
                onChange={(e) => setSizeFilter(e.target.value)}
              >
                <option value="">All</option>
                {/* Add options dynamically based on sizes available */}
                {Array.from(
                  new Set(products.flatMap((product) => product.size))
                ).map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="brandFilter">Brand:</label>
              <select
                id="brandFilter"
                value={brandFilter}
                onChange={(e) => setBrandFilter(e.target.value)}
                className="ml-2 py-1 text-sm text-primary border rounded-md"
              >
                <option value="">All</option>
                {Array.from(
                  new Set(products.map((product) => product.brand))
                ).map((brand) => (
                  <option key={brand} value={brand}>
                    {brand.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {products && filteredProducts.length === 0 ? (
            <p>No products found.</p>
          ) : (
            filteredProducts &&
            filteredProducts.map((product) => (
              <div key={product._id}>
                <Link to={`/product/${product._id}`}>
                  <div className="relative">
                    <div className="relative w-full h-96 rounded-lg overflow-hidden">
                      <img
                        src={product.image[0]}
                        alt={product.imageAlt}
                        className="w-full h-full object-center object-cover"
                      />
                    </div>
                    <div className="relative mt-4">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.color}
                      </p>
                    </div>
                    <div className="absolute top-0 inset-x-0 h-96 rounded-lg p-4 flex items-end justify-end overflow-hidden">
                      <div
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-25"
                      />
                      <p className="relative text-lg font-semibold text-white">
                        ₹{product.price}
                      </p>
                    </div>
                  </div>
                </Link>

                <div className="mt-6">
                  <Button
                    href={product.href}
                    onClick={() => dispatch(addToCart(product))}
                    className="relative w-full flex bg-gray-100 border border-transparent rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-200"
                  >
                    Add to cart
                    <span className="sr-only">, {product.name}</span>
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default ProductList;
