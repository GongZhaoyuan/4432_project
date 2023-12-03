//21096764d Liu Jiahao
//21105665d Gong Zhaoyuan
document.addEventListener('DOMContentLoaded', function () {
  const loginButton = document.getElementById('login-button');
  loginButton.addEventListener('click', function () {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
      alert('Username and password cannot be empty');
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    fetch('/auth/login', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Response Data:', data);
        if (data.status === 'success') {
          alert(`Logged as ${data.user.username} (${data.user.role})`);
          window.location.href = '/logged.html';
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        alert(error.message || 'Unknown error');
      });
  });
});
