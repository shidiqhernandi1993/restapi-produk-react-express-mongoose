import Input from "../../components/Input";
import { useNavigate, useParams } from "react-router-dom";
import * as React from "react";

const initialError = {
  name: [],
  price: [],
  stock: [],
  status: [],
};

const Edit = () => {
  const [product, setProduct] = React.useState(null);
  const { id } = useParams();
  const [error, setError] = React.useState(initialError);
  const navigate = useNavigate();

  React.useEffect(() => {
    fetch(import.meta.env.VITE_BACKEND_URL + "/product/" + id)
      .then((res) => res.json())
      .then((data) => {
        // throw Error("error");
        setProduct(data);
      })
      .catch(() => setProduct("Something wrong"));
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError(initialError);

    const form = e.currentTarget;

    const name = form.name.value;
    const price = form.price.value;
    const stock = form.stock.value;
    const status = form.status.checked;

    if (!name) {
      setError((err) => ({ ...err, name: [...err.name, "this field is required!"] }));
    }

    if (!price) {
      setError((err) => ({ ...err, price: [...err.price, "this field is required!"] }));
    }

    if (price < 1000) {
      setError((err) => ({
        ...err,
        price: [...err.price, "the minimum price is 1000!"],
      }));
    }

    if (!stock) {
      setError((err) => ({ ...err, stock: [...err.stock, "this field is required!"] }));
    }

    if (stock < 1) {
      setError((err) => ({
        ...err,
        stock: [...err.stock, "the minimum price is 1000!"],
      }));
    }

    if (!name || !price || price < 1000 || !stock || stock < 1) return;

    try {
      const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/product/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price,
          stock,
          status,
        }),
      });
      navigate("/");
      await res.json();
    } catch (error) {
      console.log(error);
      return;
    }
  };

  return (
    <div className="main">
      <div className="card">
        <h2>Edit Produk</h2>
        <br />
        {!product ? (
          <h3>Loading....</h3>
        ) : typeof product === "string" ? (
          <h3>{product}</h3>
        ) : (
          <form onSubmit={handleUpdate}>
            <Input
              name="name"
              type="text"
              placeholder="Nama Produk..."
              label="Nama"
              defaultValue={product.name}
              error={error.name}
            />
            <Input
              name="price"
              type="number"
              placeholder="Harga Produk..."
              label="Harga"
              defaultValue={product.price}
              error={error.price}
            />
            <Input
              name="stock"
              type="number"
              placeholder="Stock Produk..."
              label="Stock"
              defaultValue={product.stock}
              error={error.stock}
            />
            <Input
              name="status"
              type="checkbox"
              label="Active"
              defaultChecked={product.status}
              error={error.status}
            />
            <button type="submit" className="btn btn-primary">
              Simpan
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Edit;
