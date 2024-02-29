const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {

    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');


    const productId = button.dataset.idproduct;
    const productQuantity = 1;
    const product = { id: productId, quantity: productQuantity, userId };


    fetch("http://localhost:9090/orders/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((response) => {
        if (response.ok) {

          console.log(
            "Vente enregistrée avec succès dans la base de données des ventes."
          );
        } else {

          console.error(
            "Erreur lors de l'enregistrement de la vente dans la base de données des ventes."
          );
        }
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la requête pour enregistrer la vente dans la base de données des ventes :",
          error
        );
      });
  });
});