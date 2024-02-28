function dasButton() {
  const numberElement = document.getElementById("button");
  const number = parseInt(numberElement.innerText, 10) + 1;
  numberElement.innerText = number;
}