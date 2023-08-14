const { ObjectId } = require("mongodb");
const Product = require("./model");

const index = async (req, res) => {
  const { search } = req.query;
  if (search) {
    try {
      const products = await Product.find();
      const filteredProducts = products.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
      return res.status(200).json(filteredProducts);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  } else {
    try {
      const products = await Product.find();
      return res.status(200).json(products);
    } catch (error) {
      console.log(error);
      return res.status(400).json("something wrong!");
    }
  }
};

const view = async (req, res) => {
  const { id } = req.params;
  try {
    const products = await Product.findOne({ _id: new ObjectId(id) });
    return res.status(200).json(products);
  } catch (error) {
    return res.status(400).json("something wrong!");
  }
};

const store = async (req, res) => {
  const { name, price, stock, status } = req.body;

  if (!name || !price || !stock) {
    return res.status(400).json("Your input not complate!");
  }

  try {
    await Product.create(req.body);
    return res.status(201).json("product created!");
  } catch (error) {
    return res.status(400).json("product failed to create!");
  }
};

const update = async (req, res) => {
  const { name, price, stock, status } = req.body;
  const { id } = req.params;
  if (!name || !price || !stock) {
    return res.status(400).json("Your input not complate!");
  }
  try {
    await Product.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name,
          price: Number(price),
          stock: Number(stock),
          status: Boolean(status),
        },
      }
    );

    return res.status(201).json("product updated!");
  } catch (error) {
    return res.status(400).json("product failed to update!");
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.deleteOne({ _id: new ObjectId(id) });
    return res.status(201).json("product deleted!!");
  } catch (error) {
    return res.status(400).json("product failed to delete!");
  }
};

module.exports = {
  index,
  view,
  store,
  update,
  destroy,
};
