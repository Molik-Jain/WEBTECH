import BreadCrumb from "@/components/Breadcrumb";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import ProductTable from "./ProductTable";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ProductAction from "./ProductAction";

const Products = () => {
  const breadcrumbItems = [{ title: "Products", link: "/admin/products" }];

  const fetchAllProducts = async () => {
    const res = await axios.get("/api/getProducts");
    return res.data;
  };

  const { data: product } = useQuery({
    queryKey: ["adminAllProducts"],
    queryFn: fetchAllProducts,
  });

  const productColumn = [
    {
      header: "Product Name",
      accessorKey: "name",
    },
    {
      header: "Product Price(₹)",
      accessorKey: "price",
    },
    {
      header: "Product Category",
      accessorKey: "category",
    },
    {
      header: "Product Color",
      accessorKey: "color",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => <ProductAction data={row.original} />,
    },
  ];

  return (
    <div>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Products ${product?.length}`}
            description="Manage products"
          />

          <Link
            to={"/admin/products/new"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New Product
          </Link>
        </div>
        <Separator />
        {product && <ProductTable data={product} columns={productColumn} />}
      </div>
    </div>
  );
};

export default Products;
