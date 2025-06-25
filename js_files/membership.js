// Apply for Membership
function applyMembership(plan) {
    let email = prompt("Enter your email to receive the verification code:");
    if (email) {
        alert(`A verification code has been sent to ${email}.`);
        document.getElementById("verification-container").style.display = "block";
    }
}

// Verify Code
function verifyCode() {
    let code = document.getElementById("verification-code").value;
    if (code === "123456") {  // Example static code
        document.getElementById("verification-status").innerHTML = "✅ Verified! Enjoy your luxury membership.";
        document.getElementById("verification-status").style.color = "green";
    } else {
        document.getElementById("verification-status").innerHTML = "❌ Incorrect code. Please try again.";
        document.getElementById("verification-status").style.color = "red";
    }
}
