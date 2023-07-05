"use strict"

console.log("Contact with me")

function validateForm() {
    const name = document.forms["contactForm"]["name"].value;
    const email = document.forms["contactForm"]["email"].value;
    const message = document.forms["contactForm"]["message"].value;
    const error = "";

    if (name == "") {
        error += "please enter your name./n";
    }

    if (email == "") {
    error += "Please enter your email address./n"
    } else if (!validateEmail(email)) {
        error += "Please enter a valid email address./n";
    }

    if (message == "") {
        error += "please enter a message./n"
    }

    if (error != "") {
        alert(error);
        return false;
    }
    }

function validateEmail(email) {
    let re = /\S+@\S+\.\S+/;
}

