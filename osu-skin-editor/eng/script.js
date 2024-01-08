import {
  mainHeader,
  mainFooter,
  menuButton,
  floatingButtons,
  floatButton,
} from "../scripts/components.js";

const buttons = [
  menuButton("PT-BR", "language", () => (location.href = "../pt-br")),
  menuButton(
    "Download",
    "download",
    () => (location.href = "https://github.com/Lokost")
  ),
];

document.body.replaceChild(
  mainHeader(buttons),
  document.querySelector("header")
);

document.body.replaceChild(mainFooter(), document.querySelector("footer"));

floatingButtons([
  floatButton("download", () => (location.href = "https://github.com/Lokost")),
  floatButton("arrow_upward", () => scrollTo({ top: 0, behavior: "smooth" })),
]);
