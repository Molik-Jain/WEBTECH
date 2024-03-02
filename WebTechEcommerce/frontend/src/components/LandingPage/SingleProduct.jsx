import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { HeartIcon, MoveLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { addToCart } from "@/slice/cartSlice";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

// const product = {
//   name: "Straight Regular Jean",
//   category: "jeans",
//   price: 2299,
//   brand: "zara",
//   color: "Denim blue",
//   size: ["XL", "L", "M", "S"],
//   image: [
//     "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fdb%2F03%2Fdb0302030ce7fb228a9f0276d0d5136cf69781f0.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/fullscreen]",

//     "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fc7%2F1c%2Fc71c282e1e668d18731dab67e17ab1ecbc4bb70e.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/fullscreen]",

//     "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F68%2Fd3%2F68d3bef0673fade57b99ad7a4bbe1e16bdb5136d.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/fullscreen]",

//     "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F19%2F0a%2F190a862c9889a085763565910ddf437b4608d177.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/fullscreen]",

//     "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F3d%2F45%2F3d4546a5511264384edf70e040f6a061b5fd7126.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/fullscreen]",

//     "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F41%2F64%2F4164791808838fd93fc0fbe7073edd81ea34556b.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bmen_jeans_regular%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/fullscreen]",

//     "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fec%2F2a%2Fec2a538b0bfd4662b1bdf8c3ab5905643e81e675.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bmen_jeans_regular%5D%2Ctype%5BDESCRIPTIVEDETAIL%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/fullscreen]",
//   ],
// };

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  console.log(id);

  const fetchSingleProduct = async () => {
    const res = await axios.get(`/api/product/${id}`);
    return res.data;
  };

  const { data: product } = useQuery({
    queryKey: ["singleProduct"],
    queryFn: fetchSingleProduct,
  });

  console.log(product);

  return (
    <div className="bg-white py-28 sm:py-36">
      {product && (
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          {/* <Link to="/allproducts">
            <div className="-mt-10 mb-12 flex">
              <MoveLeft />
              Back
            </div>
          </Link> */}
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
            {/* Product image */}
            <div>
              <Tabs defaultValue={product.image[0]}>
                <TabsList className="bg-transparent">
                  {product &&
                    product.image.map((item, index) => (
                      <TabsTrigger
                        className="border-1"
                        key={index}
                        value={item}
                      >
                        <img src={item} alt="product-name" className="h-32" />
                      </TabsTrigger>
                    ))}
                </TabsList>
                {product &&
                  product.image.map((item, index) => (
                    <TabsContent key={index} value={item}>
                      <img
                        src={item}
                        alt="product-name"
                        className="rounded-md"
                      />
                    </TabsContent>
                  ))}
              </Tabs>
            </div>

            {/* Product info */}
            <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                {product.name}
              </h1>

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-xl text-gray-900">
                  {product.brand.toUpperCase()}
                </p>
              </div>
              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl text-gray-900">₹{product.price}</p>
              </div>

              <div className="mt-6">
                {/* Colors */}
                <div>
                  <h3 className="text-sm text-gray-600">
                    Color:{" "}
                    <span className="text-black font-semibold">
                      {product.color}
                    </span>
                  </h3>
                </div>
                <div>
                  <h3 className="text-sm text-gray-600">
                    Category:{" "}
                    <span className="text-black font-semibold">
                      {product.category.toUpperCase()}
                    </span>
                  </h3>
                </div>

                <div className="flex my-6">
                  <ToggleGroup type="single" variant="outline">
                    {product.size.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <ToggleGroupItem value={item} id={index}>
                          {item}
                        </ToggleGroupItem>
                      </div>
                    ))}
                  </ToggleGroup>
                </div>

                <div className="mt-10 flex sm:flex-col1">
                  <Button
                    type="submit"
                    onClick={() => dispatch(addToCart(product))}
                    className="max-w-xs flex-1 border border-transparent rounded-md py-6 px-8 flex items-center justify-center text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                  >
                    Add to bag
                  </Button>

                  <button
                    type="button"
                    className="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                  >
                    <HeartIcon
                      className="h-6 w-6 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Add to favorites</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
