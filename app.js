const menu = document.querySelector(".menu-button");
const nav = document.querySelector("#main-nav");

menu.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menu.setAttribute("aria-expanded", String(open));
});

const flow = document.querySelector("#booking-flow");
if (flow) {
  const allowed = {
    stay: ["Family Hotel", "Four-Star Resort", "Budget Hostel"],
    activity: ["Volcano Visit", "Snorkeling", "Beach Day"],
  };
  const params = new URLSearchParams(location.search);
  const type = params.get("type");
  const item = params.get("item");
  const valid = allowed[type]?.includes(item);

  document.querySelector("#booking-empty").hidden = valid;
  flow.hidden = !valid;

  if (valid) {
    document.querySelector("#booking-item").textContent = item;
    document.querySelector("#booking-back").href =
      type === "stay" ? "stay.html" : "things.html";
    document.querySelector("#date-label").textContent =
      type === "stay" ? "Arrival date" : "Activity date";

    const date = document.querySelector("#date");
    date.min = new Date().toISOString().slice(0, 10);
    document.querySelector("#demo-form").addEventListener("submit", (event) => {
      event.preventDefault();
      const party = document.querySelector("#party").value;
      const message = document.createElement("div");
      message.className = "confirmation";
      const heading = document.createElement("strong");
      heading.textContent = "Demo selection complete.";
      const details = document.createElement("p");
      details.textContent = `You selected ${item} for ${date.value}, for ${party} people. No real reservation was made.`;
      const home = document.createElement("a");
      home.href = "index.html";
      home.textContent = "Return to Home";
      message.append(heading, details, home);
      document.querySelector("#result").replaceChildren(message);
      event.currentTarget.hidden = true;
    });
  }
}
