const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const passwordRepeat = document.querySelector('#password-repeat').value.trim();

    if (password !== passwordRepeat) {
        alert('passwords do not match!')
        return
    }


    if (name && email && password) {
        const response = await fetch('/api/users', {
          method: 'POST',
          body: JSON.stringify({ name, email, password }),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
          document.location.replace('/profile');
        } else {
          alert(response.statusText);
        }
    };

    
};

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);