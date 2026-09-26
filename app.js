/* =====================================================
   REAL-ALPHA GEN SHOP
   CUSTOMER STORE JAVASCRIPT
===================================================== */

/* ================= PRODUCTS ================= */

const defaultProducts = [

  {
    id: 1,
    name: "HP EliteBook 840 G7",
    category: "laptop",
    price: 34999,
    oldPrice: 39999,
    description: 'Core i5 • 8GB RAM • 256GB SSD • 14"',
    emoji: "💻",
    deal: true
  },

  {
    id: 2,
    name: "Lenovo ThinkPad T490",
    category: "laptop",
    price: 36999,
    oldPrice: 42999,
    description: "Core i5 • 16GB RAM • 256GB SSD",
    emoji: "💻",
    deal: true
  },

  {
    id: 3,
    name: "Dell Latitude 5420",
    category: "laptop",
    price: 39999,
    oldPrice: 44999,
    description: "Core i5 • 16GB RAM • 256GB SSD",
    emoji: "💻",
    deal: true
  },

  {
    id: 4,
    name: "Samsung Galaxy A17 5G",
    category: "phone",
    price: 20970,
    oldPrice: 22999,
    description: "4GB RAM • 128GB • 5G • 5000mAh",
    emoji: "📱",
    deal: true
  },

  {
    id: 5,
    name: "Infinix Hot 70",
    category: "phone",
    price: 19527,
    oldPrice: 21999,
    description: "4GB RAM • 128GB • 4G • 6000mAh",
    emoji: "📱",
    deal: true
  },

  {
    id: 6,
    name: "Itel A50C",
    category: "phone",
    price: 10270,
    oldPrice: 11999,
    description: "2GB + 4GB RAM • 64GB • Dual SIM",
    emoji: "📱",
    deal: false
  },

  {
    id: 7,
    name: "Wireless Keyboard & Mouse",
    category: "accessory",
    price: 1100,
    oldPrice: 1500,
    description: "Wireless keyboard and mouse combo",
    emoji: "⌨️",
    deal: true
  },

  {
    id: 8,
    name: "Logitech Wireless Mouse",
    category: "accessory",
    price: 2000,
    oldPrice: 2500,
    description: "Wireless computer mouse",
    emoji: "🖱️",
    deal: false
  },

  {
    id: 9,
    name: "USB Type-C Fast Charger",
    category: "accessory",
    price: 1500,
    oldPrice: 2000,
    description: "Fast charging USB Type-C charger",
    emoji: "🔌",
    deal: true
  },

  {
    id: 10,
    name: "Bluetooth Headphones",
    category: "accessory",
    price: 2500,
    oldPrice: 3200,
    description: "Wireless Bluetooth headphones",
    emoji: "🎧",
    deal: false
  }

];


/* ================= LOCAL STORAGE ================= */

let products =
  JSON.parse(
    localStorage.getItem("real_alpha_products")
  ) || defaultProducts;


let cart =
  JSON.parse(
    localStorage.getItem("real_alpha_cart")
  ) || [];


let orders =
  JSON.parse(
    localStorage.getItem("real_alpha_orders")
  ) || [];


/* ================= MONEY ================= */

function formatMoney(amount) {

  return "KSh " +
    Number(amount).toLocaleString("en-KE");

}


/* ================= SAVE DATA ================= */

function saveData() {

  localStorage.setItem(
    "real_alpha_products",
    JSON.stringify(products)
  );

  localStorage.setItem(
    "real_alpha_cart",
    JSON.stringify(cart)
  );

  localStorage.setItem(
    "real_alpha_orders",
    JSON.stringify(orders)
  );

}


/* ================= PRODUCT CARD ================= */

function createProductCard(product) {

  const image = product.image
    ? `<img src="${product.image}" alt="${product.name}">`
    : product.emoji || "📦";


  return `

    <article class="product">

      <div class="product-image">

        ${image}

        ${
          product.deal
            ? `<span class="deal-badge">DEAL</span>`
            : ""
        }

      </div>


      <div class="product-body">

        <h3 title="${product.name}">
          ${product.name}
        </h3>


        <div class="product-description">
          ${product.description || ""}
        </div>


        <div class="product-price">

          ${formatMoney(product.price)}

          ${
            product.oldPrice
              ? `
                <span class="old-price">
                  ${formatMoney(product.oldPrice)}
                </span>
              `
              : ""
          }

        </div>


        <button
          class="add-cart"
          onclick="addToCart(${product.id})"
        >
          ADD TO CART
        </button>

      </div>

    </article>

  `;

}


/* ================= DISPLAY PRODUCTS ================= */

function displayProducts() {

  const productContainer =
    document.getElementById("products");


  if (!productContainer) {
    return;
  }


  const searchInput =
    document.getElementById("search");


  const categoryFilter =
    document.getElementById("categoryFilter");


  const sortProducts =
    document.getElementById("sortProducts");


  const search =
    searchInput
      ? searchInput.value.toLowerCase()
      : "";


  const category =
    categoryFilter
      ? categoryFilter.value
      : "all";


  const sort =
    sortProducts
      ? sortProducts.value
      : "featured";


  let filteredProducts =
    products.filter(product => {

      const matchesSearch =
        `${product.name} ${product.description || ""}`
          .toLowerCase()
          .includes(search);


      const matchesCategory =
        category === "all" ||
        product.category === category;


      return matchesSearch && matchesCategory;

    });


  if (sort === "low") {

    filteredProducts.sort(
      (a, b) => a.price - b.price
    );

  }


  if (sort === "high") {

    filteredProducts.sort(
      (a, b) => b.price - a.price
    );

  }


  if (filteredProducts.length === 0) {

    productContainer.innerHTML = `
      <p>
        No products found.
      </p>
    `;

  } else {

    productContainer.innerHTML =
      filteredProducts
        .map(createProductCard)
        .join("");

  }

}


/* ================= DEAL PRODUCTS ================= */

function displayDeals() {

  const dealsContainer =
    document.getElementById("dealsProducts");


  if (!dealsContainer) {
    return;
  }


  const deals =
    products
      .filter(product => product.deal)
      .slice(0, 4);


  dealsContainer.innerHTML =
    deals.length
      ? deals.map(createProductCard).join("")
      : "<p>No deals available.</p>";

}


/* ================= ADD TO CART ================= */

function addToCart(productId) {

  const product =
    products.find(
      product => product.id === productId
    );


  if (!product) {
    return;
  }


  const existing =
    cart.find(
      item => item.id === productId
    );


  if (existing) {

    existing.quantity += 1;

  } else {

    cart.push({

      id: productId,

      quantity: 1

    });

  }


  saveData();

  displayCart();

  showToast(
    product.name + " added to cart"
  );

}


/* ================= CHANGE QUANTITY ================= */

function changeQuantity(
  productId,
  change
) {

  const item =
    cart.find(
      item => item.id === productId
    );


  if (!item) {
    return;
  }


  item.quantity += change;


  if (item.quantity <= 0) {

    cart =
      cart.filter(
        item => item.id !== productId
      );

  }


  saveData();

  displayCart();

}


/* ================= CART ================= */

function displayCart() {

  const cartItems =
    document.getElementById("cartItems");


  const cartCount =
    document.getElementById("cartCount");


  const cartTotal =
    document.getElementById("cartTotal");


  if (!cartItems) {
    return;
  }


  let total = 0;

  let quantityTotal = 0;


  if (cart.length === 0) {

    cartItems.innerHTML = `
      <p>
        Your cart is empty.
      </p>
    `;

  } else {

    cartItems.innerHTML =
      cart.map(item => {

        const product =
          products.find(
            product => product.id === item.id
          );


        if (!product) {
          return "";
        }


        const itemTotal =
          product.price * item.quantity;


        total += itemTotal;

        quantityTotal += item.quantity;


        return `

          <div class="cart-item">

            <div>

              <strong>
                ${product.name}
              </strong>

              <br>

              <small>
                ${formatMoney(product.price)}
              </small>

              <br><br>

              <div class="cart-quantity">

                <button
                  onclick="changeQuantity(
                    ${product.id},
                    -1
                  )"
                >
                  −
                </button>

                <span>
                  ${item.quantity}
                </span>

                <button
                  onclick="changeQuantity(
                    ${product.id},
                    1
                  )"
                >
                  +
                </button>

              </div>

            </div>


            <strong>
              ${formatMoney(itemTotal)}
            </strong>

          </div>

        `;

      }).join("");

  }


  if (cartCount) {

    cartCount.textContent =
      quantityTotal;

  }


  if (cartTotal) {

    cartTotal.textContent =
      formatMoney(total);

  }

}


/* ================= CART OPEN ================= */

function openCart() {

  const cartPanel =
    document.getElementById("cartPanel");


  const overlay =
    document.getElementById("overlay");


  cartPanel.classList.add("open");

  overlay.classList.add("show");

}


/* ================= CART CLOSE ================= */

function closeCart() {

  const cartPanel =
    document.getElementById("cartPanel");


  const overlay =
    document.getElementById("overlay");


  cartPanel.classList.remove("open");

  overlay.classList.remove("show");

}


/* ================= CATEGORY FILTER ================= */

function filterCategory(category) {

  const categoryFilter =
    document.getElementById("categoryFilter");


  if (categoryFilter) {

    categoryFilter.value =
      category;

  }


  displayProducts();


  const catalogue =
    document.getElementById("catalogue");


  if (catalogue) {

    catalogue.scrollIntoView({
      behavior: "smooth"
    });

  }

}


/* ================= SEARCH ================= */

function searchProducts() {

  displayProducts();


  const catalogue =
    document.getElementById("catalogue");


  if (catalogue) {

    catalogue.scrollIntoView({
      behavior: "smooth"
    });

  }

}


/* ================= ORDERS ================= */

function displayOrders() {

  const ordersList =
    document.getElementById("ordersList");


  if (!ordersList) {
    return;
  }


  if (orders.length === 0) {

    ordersList.innerHTML = `
      <p>
        No orders yet.
      </p>
    `;

    return;

  }


  ordersList.innerHTML =

    orders
      .slice()
      .reverse()
      .map(order => {

        return `

          <div class="order-card">

            <div>

              <strong>
                ${order.id}
              </strong>

              <br>

              ${order.items
                .map(
                  item =>
                    `${item.name} × ${item.quantity}`
                )
                .join(", ")
              }

              <br>

              <small>
                Delivery:
                ${order.location}
              </small>

              <br>

              <small>
                Payment:
                ${order.payment}
              </small>

            </div>


            <div>

              <strong>
                ${formatMoney(order.total)}
              </strong>

              <br>

              <span class="order-status">
                ${order.status}
              </span>

            </div>

          </div>

        `;

      })
      .join("");

}


/* ================= CHECKOUT ================= */

function openCheckout() {

  if (cart.length === 0) {

    showToast(
      "Your cart is empty"
    );

    return;

  }


  const modal =
    document.getElementById(
      "checkoutModal"
    );


  const summary =
    document.getElementById(
      "checkoutSummary"
    );


  let total = 0;

  let quantity = 0;


  cart.forEach(item => {

    const product =
      products.find(
        product => product.id === item.id
      );


    if (product) {

      total +=
        product.price *
        item.quantity;

      quantity +=
        item.quantity;

    }

  });


  summary.innerHTML = `

    <p>
      Items:
      <strong>${quantity}</strong>
    </p>

    <p>
      Total:
      <strong>
        ${formatMoney(total)}
      </strong>
    </p>

  `;


  modal.classList.add("show");

}


/* ================= CLOSE CHECKOUT ================= */

function closeCheckout() {

  document
    .getElementById("checkoutModal")
    .classList.remove("show");

}


/* ================= PAYMENT METHOD ================= */

function paymentMethodChanged() {

  const paymentMethod =
    document.getElementById(
      "paymentMethod"
    );


  const pochiInformation =
    document.getElementById(
      "pochiInformation"
    );


  const paymentConfirmation =
    document.getElementById(
      "paymentConfirmation"
    );


  if (
    paymentMethod.value ===
    "Pochi la Biashara"
  ) {

    pochiInformation.classList.remove(
      "hidden"
    );

    paymentConfirmation.classList.remove(
      "hidden"
    );

  } else {

    pochiInformation.classList.add(
      "hidden"
    );

    paymentConfirmation.classList.add(
      "hidden"
    );

  }

}


/* ================= PLACE ORDER ================= */

function placeOrder(event) {

  event.preventDefault();


  const form =
    document.getElementById(
      "checkoutForm"
    );


  const formData =
    new FormData(form);


  const payment =
    formData.get("payment");


  if (
    payment === "Pochi la Biashara"
  ) {

    const confirmation =
      formData.get("paidConfirm");


    if (!confirmation) {

      showToast(
        "Please confirm your payment"
      );

      return;

    }

  }


  let total = 0;


  const orderItems =
    cart.map(item => {

      const product =
        products.find(
          product => product.id === item.id
        );


      if (!product) {
        return null;
      }


      total +=
        product.price *
        item.quantity;


      return {

        id: product.id,

        name: product.name,

        price: product.price,

        quantity: item.quantity

      };

    })
    .filter(Boolean);


  const order = {

    id:
      "RA-" +
      Date.now()
        .toString()
        .slice(-8),

    customerName:
      formData.get("name"),

    phone:
      formData.get("phone"),

    email:
      formData.get("email"),

    location:
      formData.get("location"),

    payment:
      payment,

    items:
      orderItems,

    total:
      total,

    status:
      "Pending",

    date:
      new Date().toLocaleString()

  };


  orders.push(order);


  cart = [];


  saveData();

  displayCart();

  displayOrders();


  form.reset();


  closeCheckout();

  closeCart();


  showToast(
    "Order placed successfully!"
  );


}


/* ================= TOAST ================= */

function showToast(message) {

  const toast =
    document.getElementById("toast");


  if (!toast) {
    return;
  }


  toast.textContent =
    message;


  toast.style.display =
    "block";


  setTimeout(() => {

    toast.style.display =
      "none";

  }, 2500);

}


/* ================= PAGE START ================= */

document.addEventListener(
  "DOMContentLoaded",
  function () {


    /* DISPLAY */

    displayProducts();

    displayDeals();

    displayCart();

    displayOrders();


    /* SEARCH */

    const search =
      document.getElementById(
        "search"
      );


    if (search) {

      search.addEventListener(
        "input",
        displayProducts
      );

      search.addEventListener(
        "keydown",
        function(event) {

          if (
            event.key === "Enter"
          ) {

            searchProducts();

          }

        }
      );

    }


    /* CATEGORY */

    const categoryFilter =
      document.getElementById(
        "categoryFilter"
      );


    if (categoryFilter) {

      categoryFilter.addEventListener(
        "change",
        displayProducts
      );

    }


    /* SORT */

    const sortProducts =
      document.getElementById(
        "sortProducts"
      );


    if (sortProducts) {

      sortProducts.addEventListener(
        "change",
        displayProducts
      );

    }


    /* CART BUTTON */

    const cartButton =
      document.getElementById(
        "cartButton"
      );


    if (cartButton) {

      cartButton.addEventListener(
        "click",
        openCart
      );

    }


    /* CLOSE CART */

    const closeCartButton =
      document.getElementById(
        "closeCart"
      );


    if (closeCartButton) {

      closeCartButton.addEventListener(
        "click",
        closeCart
      );

    }


    /* OVERLAY */

    const overlay =
      document.getElementById(
        "overlay"
      );


    if (overlay) {

      overlay.addEventListener(
        "click",
        closeCart
      );

    }


    /* CHECKOUT */

    const checkoutButton =
      document.getElementById(
        "checkoutButton"
      );


    if (checkoutButton) {

      checkoutButton.addEventListener(
        "click",
        openCheckout
      );

    }


    /* CLOSE CHECKOUT */

    const closeCheckoutButton =
      document.getElementById(
        "closeCheckout"
      );


    if (closeCheckoutButton) {

      closeCheckoutButton.addEventListener(
        "click",
        closeCheckout
      );

    }


    /* PAYMENT */

    const paymentMethod =
      document.getElementById(
        "paymentMethod"
      );


    if (paymentMethod) {

      paymentMethod.addEventListener(
        "change",
        paymentMethodChanged
      );

    }


    /* CHECKOUT FORM */

    const checkoutForm =
      document.getElementById(
        "checkoutForm"
      );


    if (checkoutForm) {

      checkoutForm.addEventListener(
        "submit",
        placeOrder
      );

    }

  }
);
