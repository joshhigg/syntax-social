// Login form event handler
const loginFormHandler = async (event) => {
  event.preventDefault();

  // Get user email and password from the input fields
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  // Check if email and password are provided
  if (email && password) {
      // Fetch request to the login route with user credentials
      const response = await fetch('/api/users/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: { 'Content-Type': 'application/json' },
      });

      // Check if the login was successful
      if (response.ok) {
          console.log('Login successful!');
          // Redirect the user to the homepage after successful login
          document.location.replace('/homepage');
      } else {
          // Display an alert if login fails
          alert(response.statusText);
      }
  }
};

// Add event listener to the login form submit button
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
