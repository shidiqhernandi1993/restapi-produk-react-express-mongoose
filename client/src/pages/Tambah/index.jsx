import { useState } from "react";
import Input from "../../components/Input";
import "./index.scss";

import { useNavigate } from "react-router-dom";
const initialError = {
  name: [],
  price: [],
  stock: [],
  status: [],
};

const Tambah = () => {
  const [error, setError] = useState(initialError);
  const navigate = useNavigate();

  const handlePost = async (e) => {
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
      const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/product", {
        method: "POST",
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
        <h2>Tambah Produk</h2>
        <br />
        <form onSubmit={handlePost}>
          <Input
            name="name"
            type="text"
            placeholder="Nama Produk..."
            label="Nama"
            error={error.name}
          />
          <Input
            name="price"
            type="number"
            placeholder="Harga Produk..."
            label="Harga"
            error={error.price}
          />
          <Input
            name="stock"
            type="number"
            placeholder="Stock Produk..."
            label="Stock"
            error={error.stock}
          />
          <Input
            name="status"
            type="checkbox"
            label="Active"
            defaultChecked={true}
            error={error.status}
          />
          <button type="submit" className="btn btn-primary">
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
};

export default Tambah;
