function contactButton(title, link) {
  const button = document.createElement("a");
  button.classList.add("contact-button");
  button.href = link;
  button.innerText = title;

  return button;
}

export function contact_popup() {
  document.querySelector(".backdrop").style.display = "block";

  const container = document.createElement("div");
  container.classList.add("contact-popup");

  const contactButtons = [
    contactButton("Whatsapp", "https://wa.me/+5511964438097"),
    contactButton("Telegram", "https://t.me/+5511964438097"),
    contactButton("Email", "mailto:gabriel.gomes289001@gmail.com"),
  ];

  const contactArea = document.createElement("div");
  contactArea.classList.add("contact-area");
  contactArea.append(...contactButtons);

  const title = document.createElement("h1");
  title.innerText = "Contato";
  container.append(title, contactArea);

  document.body.append(container);
}
