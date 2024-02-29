const Product = require("../../products/models/Product");
const Order = require("../models/Order");

index = async (req, res) => {
  try {
    const locals = {
      title: "My Orders",
    };

    const userId = req.query.userId;

    const ordersWithProducts = await Order.aggregate([
      {
        $lookup: {
          from: "products", // Nom de la collection des produits
          localField: "productId",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
      {
        $addFields: {
          quantity: "$quantity", // Ajouter la quantité depuis la collection orders
        },
      },
    ]);

    // Rendre la vue avec les commandes et les détails des produits associés
    res.render("index", { ordersWithProducts, locals, userId });
  } catch (error) {
    console.error(
      "Une erreur est survenue lors de la récupération des commandes avec les détails des produits :",
      error
    );
    res
      .status(500)
      .send("Une erreur est survenue lors de la récupération des commandes.");
  }
};

const add = async (req, res) => {
  try {
    const { quantity, userId, id } = req.body;

    // Recherchez si une commande existe déjà pour ce produit et cet utilisateur
    const existingOrder = await Order.findOne({
      userId: userId,
      productId: id,
    });

    if (existingOrder) {
      // Si une commande existe déjà, incrémentez simplement la quantité
      existingOrder.quantity += quantity;
      await existingOrder.save();
    } else {
      // Sinon, créez une nouvelle commande
      const order = new Order({
        quantity: quantity,
        productId: id,
        userId: userId || null,
      });
      await order.save();
    }

    res.redirect("/products");
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Une erreur est survenue lors de l'ajout de la commande.");
  }
};

destroy = async (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.productId;

  await Order.deleteOne({ userId: userId, productId: productId });

  res.redirect("/orders");
};

module.exports = {
  index,
  add,
  destroy,
};
