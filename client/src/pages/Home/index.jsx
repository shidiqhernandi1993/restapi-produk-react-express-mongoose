import { Link } from "react-router-dom";
import "./index.scss";
import * as React from "react";
import { useNavigate } from "react-router";
const Home = () => {
  const [products, setProducts] = React.useState([]);
  const [q, setQ] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    let url = import.meta.env.VITE_BACKEND_URL + "/product";
    if (q) {
      url = import.meta.env.VITE_BACKEND_URL + `/product?search=${q}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          setProducts("your product is empty");
          return;
        }
        setProducts(data);
      })
      .catch(() => setProducts("Something wrong"));
  }, [q, navigate]);

  return (
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">
        Tambah Produk
      </Link>
      <div className="search">
        <input
          value={q}
          type="text"
          placeholder="Masukan kata kunci..."
          onChange={(e) => setQ(e.target.value)}
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className="text-right">Price</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {typeof products === "string" ? (
            <tr>
              <td className="text-center" colSpan={4}>
                <h3 style={{ color: "red" }}>{products}!</h3>
              </td>
            </tr>
          ) : products.length === 0 ? (
            <tr>
              <td className="text-center" colSpan={4}>
                <h3>Loading...</h3>
              </td>
            </tr>
          ) : (
            products.map((item, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{item.name}</td>
                <td className="text-right">
                  Rp.{" "}
                  {item.price.toLocaleString({
                    style: "currency",
                    currency: "IDR",
                  })}
                </td>
                <td className="text-center">
                  <Link
                    to={`/detail/${item._id}`}
                    className="btn btn-sm btn-info"
                  >
                    Detail
                  </Link>
                  <Link
                    to={`/edit/${item._id}`}
                    className="btn btn-sm btn-warning"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => {
                      fetch(
                        import.meta.env.VITE_BACKEND_URL +
                          "/product/" +
                          item._id,
                        {
                          method: "DELETE",
                        }
                      ).then((res) => navigate(0));
                    }}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
