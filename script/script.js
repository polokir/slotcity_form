const selector = document.querySelector(".button-list");
const telButton = document.querySelector(".button.tel");
const emailButton = document.querySelector(".button.email");
const input = document.querySelector("#number");
const countryCode = document.querySelector(".country-code");
const contactForm = document.querySelector(".contact-form");

selector.addEventListener("click", (e) => {
  if (e.target.nodeName != "BUTTON") {
    return;
  }

  const isEmail = e.target.classList.contains("email");
  if (isEmail) {
    emailButton.classList.add("active");
    telButton.classList.remove("active");
    input.type = "email";
    input.name = "email";
    input.placeholder = "Вкажіть email";
    input.style.paddingLeft = "22px";

    countryCode.style.display = "none";
  } else {
    telButton.classList.add("active");
    emailButton.classList.remove("active");
    input.type = "tel";
    input.placeholder = "Вкажіть ваш номер";
    countryCode.style.display = "flex";
    input.style.paddingLeft = "105px";
  }
});

contactForm.addEventListener("submit", hadleForm);

function hadleForm(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const { tel, email } = form.elements;

  const apiUrl = (email) ? `http://localhost:4444/register?email=${email.value}` : `http://localhost:4444/register?phone=${tel.value}`

  const data = {
    phone: tel?.value,
    email: email?.value,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  fetch(apiUrl, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Ответ от сервера:", data);
    })
    .catch((error) => {
      console.error("Ошибка:", error);
    });

  form.reset();
}
