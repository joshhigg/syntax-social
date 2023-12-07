// Signup form event handler
const signupFormHandler = async (event) => {
  event.preventDefault();

  // Get user registration information from the input fields
  const name = document.querySelector('#user-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const passwordRepeat = document.querySelector('#password-repeat').value.trim();

  // Check if passwords match
  if (password !== passwordRepeat) {
      alert('Passwords do not match!');
      return;
  }

  // Check if name, email, and password are provided
  if (name && email && password) {
      // Fetch request to the user registration route with user information
      const response = await fetch('/api/users', {
          method: 'POST',
          body: JSON.stringify({ name, email, password }),
          headers: { 'Content-Type': 'application/json' },
      });

      // Check if the user registration was successful
      if (response.ok) {
          // Redirect the user to the homepage after successful registration
          document.location.replace('/homepage');
      } else {
          // Display an alert if registration fails
          alert(response.statusText);
      }
  }
};

// Add event listener to the signup form submit button
document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
