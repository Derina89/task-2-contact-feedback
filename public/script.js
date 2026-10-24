/* ========================================
   MOBILE NAVIGATION
======================================== */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("show");

    });

}


/* ========================================
   EMAIL VALIDATION
======================================== */

function isValidEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);

}


/* ========================================
   CONTACT FORM
======================================== */

const contactForm =
    document.getElementById("contactForm");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const name =
                document.getElementById("name");

            const email =
                document.getElementById("email");

            const message =
                document.getElementById("message");


            const nameError =
                document.getElementById("nameError");

            const emailError =
                document.getElementById("emailError");

            const messageError =
                document.getElementById("messageError");

            const successMessage =
                document.getElementById("successMessage");


            // Clear previous messages

            nameError.textContent = "";
            emailError.textContent = "";
            messageError.textContent = "";
            successMessage.textContent = "";


            let valid = true;


            // Name validation

            if (!name.value.trim()) {

                nameError.textContent =
                    "Please enter your name.";

                valid = false;

            }


            // Email validation

            if (!email.value.trim()) {

                emailError.textContent =
                    "Please enter your email.";

                valid = false;

            }

            else if (!isValidEmail(email.value.trim())) {

                emailError.textContent =
                    "Please enter a valid email address.";

                valid = false;

            }


            // Message validation

            if (!message.value.trim()) {

                messageError.textContent =
                    "Please enter your message.";

                valid = false;

            }

            else if (message.value.trim().length < 10) {

                messageError.textContent =
                    "Message must contain at least 10 characters.";

                valid = false;

            }


            // Stop if validation fails

            if (!valid) {

                return;

            }


            // Send data to backend

            try {

                const response = await fetch(
                    "/api/contact",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({

                            name: name.value,

                            email: email.value,

                            message: message.value

                        })

                    }
                );


                const data = await response.json();


                if (response.ok) {

                    successMessage.textContent =
                        "✓ " + data.message;

                    contactForm.reset();

                }

                else {

                    successMessage.textContent =
                        "⚠ " + data.message;

                }


            } catch (error) {

                successMessage.textContent =
                    "Unable to connect to the server.";

            }

        }
    );

}


/* ========================================
   FEEDBACK FORM
======================================== */

const feedbackForm =
    document.getElementById("feedbackForm");


if (feedbackForm) {

    feedbackForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const name =
                document.getElementById("feedbackName");

            const email =
                document.getElementById("feedbackEmail");

            const rating =
                document.getElementById("rating");

            const message =
                document.getElementById("feedbackMessage");


            const nameError =
                document.getElementById("feedbackNameError");

            const emailError =
                document.getElementById("feedbackEmailError");

            const ratingError =
                document.getElementById("ratingError");

            const messageError =
                document.getElementById("feedbackMessageError");

            const successMessage =
                document.getElementById("feedbackSuccess");


            // Clear previous messages

            nameError.textContent = "";
            emailError.textContent = "";
            ratingError.textContent = "";
            messageError.textContent = "";
            successMessage.textContent = "";


            let valid = true;


            // Name validation

            if (!name.value.trim()) {

                nameError.textContent =
                    "Please enter your name.";

                valid = false;

            }


            // Email validation

            if (!email.value.trim()) {

                emailError.textContent =
                    "Please enter your email.";

                valid = false;

            }

            else if (!isValidEmail(email.value.trim())) {

                emailError.textContent =
                    "Please enter a valid email address.";

                valid = false;

            }


            // Rating validation

            if (!rating.value) {

                ratingError.textContent =
                    "Please select a rating.";

                valid = false;

            }


            // Message validation

            if (!message.value.trim()) {

                messageError.textContent =
                    "Please enter your feedback.";

                valid = false;

            }


            if (!valid) {

                return;

            }


            // Send feedback to backend

            try {

                const response = await fetch(
                    "/api/feedback",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({

                            name: name.value,

                            email: email.value,

                            rating: rating.value,

                            message: message.value

                        })

                    }
                );


                const data = await response.json();


                if (response.ok) {

                    successMessage.textContent =
                        "✓ " + data.message;

                    feedbackForm.reset();

                }

                else {

                    successMessage.textContent =
                        "⚠ " + data.message;

                }


            } catch (error) {

                successMessage.textContent =
                    "Unable to connect to the server.";

            }

        }
    );

}