import { Link, useParams } from "react-router-dom";
import "./index.scss";
import * as React from "react";

const Detail = () => {
  const [product, setProduct] = React.useState(null);
  const { id } = useParams();

  React.useEffect(() => {
    fetch(import.meta.env.VITE_BACKEND_URL + "/product/" + id)
      .then((res) => res.json())
      .then((data) => {
        // throw Error("error");
        setProduct(data);
      })
      .catch(() => setProduct("Something wrong"));
  }, []);

  return (
    <div className="main">
      <Link to="/" className="btn btn-primary">
        Kembali
      </Link>

      <table className="table">
        {!product ? (
          <h3 className="text-center">loading...</h3>
        ) : typeof product === "string" ? (
          <h3 className="text-center" style={{ color: "red" }}>
            {product}
          </h3>
        ) : (
          <tbody>
            <tr>
              <td>ID</td>
              <td>: {id}</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>: {product.name}</td>
            </tr>
            <tr>
              <td>Price</td>
              <td>: Rp. {product.price.toLocaleString({ style: "currency", currency: "IDR" })}</td>
            </tr>
            <tr>
              <td>Stock</td>
              <td>: {product.stock}</td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default Detail;
