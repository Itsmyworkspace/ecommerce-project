import "../styles/HomePage.css";
import "../styles/header.css";
import { Header } from "../components/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import { ProductsGrid } from "./ProductsGrid";
import { useSearchParams } from "react-router";

function Homepage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  useEffect(() => {
    const getProducts = async () => {
      if (search) {
        const urlPath = search
          ? `/api/products?search=${search}`
          : "/api/products";
        const getProductsResponse = await axios.get(urlPath);
        setProducts(getProductsResponse.data);
      }
    };
    getProducts();
  }, [search]);

  return (
    <>
      <link
        rel="icon"
        type="image/svg+xml"
        href="/images/icons/home-favicon.png"
      />
      <title>ecommerce-project</title>

      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}

export default Homepage;
