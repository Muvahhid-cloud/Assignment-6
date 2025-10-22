// ----------- Theme Toggle -----------
const toggle = document.createElement("button");
toggle.textContent = "🌙 Night Mode";
Object.assign(toggle.style, {
  position: "fixed",
  top: "10px",
  right: "10px",
  padding: "8px 12px",
  border: "none",
  borderRadius: "6px",
  background: "#6f4e37",
  color: "white",
  cursor: "pointer",
  zIndex: "100"
});
document.body.appendChild(toggle);

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  toggle.textContent = document.body.classList.contains("dark-theme")
    ? "☀️ Day Mode"
    : "🌙 Night Mode";
});

// ----------- Carousel (full width + fade animation) -----------
const images = [
  "images/22.jpg",
  "images/4.jpg",
  "images/6.jpg",
  "images/7.jpg",
  "images/8.jpg"
];
let i = 0;
const carouselImg = document.getElementById("carouselImg");
if (carouselImg) {
  setInterval(() => {
    carouselImg.style.opacity = "0";
    setTimeout(() => {
      i = (i + 1) % images.length;
      carouselImg.src = images[i];
      carouselImg.style.opacity = "1";
    }, 500);
  }, 3000);
}

// ----------- Read More Toggle -----------
const readBtn = document.getElementById("readMoreBtn");
if (readBtn) {
  const extraText = document.getElementById("extraText");
  readBtn.addEventListener("click", () => {
    const isHidden = extraText.style.display === "none";
    extraText.style.display = isHidden ? "block" : "none";
    readBtn.textContent = isHidden ? "Read Less" : "Read More";
  });
}

// ----------- Contact Form (Strict Email Validation) -----------
const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const msg = document.getElementById("successMessage");

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!name || !email || !message) {
      msg.textContent = "⚠️ Please fill in all fields.";
      msg.style.color = "red";
      return;
    }

    if (!emailRegex.test(email)) {
      msg.textContent = "❌ Please enter a valid email address (e.g. user@example.com).";
      msg.style.color = "red";
      return;
    }

    msg.textContent = `✅ Thanks, ${name}! We'll get back to you at ${email} soon.`;
    msg.style.color = "green";
    form.reset();
  });
}

// ----------- Menu Cards (9 Drinks Restored) -----------
const menuGrid = document.getElementById("menu-grid");
if (menuGrid) {
  const menuItems = [
    { name: "Espresso", price: "$2.50", img: "images/espresso.jpeg" },
    { name: "Cappuccino", price: "$3.50", img: "images/capucino.jpeg" },
    { name: "Latte", price: "$3.00", img: "images/lattes.jpeg" },
    { name: "Iced Coffee", price: "$2.00", img: "images/iced.jpeg" },
    { name: "Cold Brew", price: "$2.00", img: "images/cold brew.jpeg" },
    { name: "Mocha", price: "$2.50", img: "images/mocha.jpeg" },
    { name: "Americano", price: "$2.30", img: "images/4.jpg" },
    { name: "Macchiato", price: "$3.20", img: "images/5.jpg" },
    { name: "Flat White", price: "$3.00", img: "images/6.jpg" }
  ];

  menuItems.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("menu-card");
    card.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>${item.price}</p>
      <div class="rating"></div>
      <button class="order-btn">Order Now</button>
    `;
    menuGrid.appendChild(card);
  });

  // ----------- ⭐ Rating Stars Feature -----------
  document.querySelectorAll(".rating").forEach(ratingDiv => {
    for (let s = 1; s <= 5; s++) {
      const star = document.createElement("span");
      star.textContent = "★";
      star.style.fontSize = "20px";
      star.style.cursor = "pointer";
      star.style.color = "gray";
      star.addEventListener("click", () => {
        ratingDiv.querySelectorAll("span").forEach((st, idx) => {
          st.style.color = idx < s ? "gold" : "gray";
        });
      });
      ratingDiv.appendChild(star);
    }
  });

  // ----------- Working Sound + Animation for all buttons -----------
  const buttons = document.querySelectorAll(".order-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      btn.style.transform = "scale(1.1)";
      setTimeout(() => (btn.style.transform = "scale(1)"), 200);

      const clickSound = new Audio("https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg");
      clickSound.play().catch(err => console.log("Sound blocked:", err));
    });
  });
}

// ----------- Keyboard Navigation -----------
document.addEventListener("keydown", (e) => {
  const links = document.querySelectorAll("nav a");
  let current = [...links].findIndex(l => l.classList.contains("active"));
  if (e.key === "ArrowRight") current = (current + 1) % links.length;
  else if (e.key === "ArrowLeft") current = (current - 1 + links.length) % links.length;
  else return;
  links.forEach(l => l.classList.remove("active"));
  links[current].classList.add("active");
});

// ----------- Time-Based Greeting -----------
(function timeGreeting() {
  const hour = new Date().getHours();
  let greet;
  switch (true) {
    case (hour < 12): greet = "Good Morning! ☀️"; break;
    case (hour < 18): greet = "Good Afternoon! ☕"; break;
    default: greet = "Good Evening! 🌙";
  }

  const greetDiv = document.createElement("div");
  greetDiv.textContent = greet;
  Object.assign(greetDiv.style, {
    textAlign: "center",
    fontSize: "1.5em",
    fontWeight: "bold",
    margin: "20px 0",
    color: "#6f4e37"
  });
  document.body.prepend(greetDiv);
})();

// ----------- Image Gallery Preview (Manipulating Attributes) -----------
const previewImg = document.getElementById("preview");
const menuImages = document.querySelectorAll("#menu-grid img");

if (previewImg && menuImages.length) {
  menuImages.forEach(img => {
    img.addEventListener("click", () => {
      const src = img.getAttribute("src");
      previewImg.setAttribute("src", src);
      previewImg.style.transform = "scale(1.05)";
      setTimeout(() => (previewImg.style.transform = "scale(1)"), 200);
    });
  });
}
