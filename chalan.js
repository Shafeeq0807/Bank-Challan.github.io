const loginForm = document.getElementById("login-form");
		const challanForm = document.getElementById("challan-form");

		loginForm.addEventListener("submit", (event) => {
			event.preventDefault();
			const username = event.target.elements.username.value;
			const password = event.target.elements.password.value;

			// Replace this with actual authentication code
			if (username === "exampleuser" && password === "examplepassword") {
				loginForm.style.display = "none";
				challanForm.style.display = "block";
			} else {
				alert("Invalid username or password");
			}
		});