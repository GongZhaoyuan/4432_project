//21096764d Liu Jiahao
//21105665d Gong Zhaoyuan
window.onload = function () {
  fetch('/auth/me')
    .then((response) => {
      if (!response.ok) {
        alert('Please login');

        window.open('/login.html', '_self');
      } else {
        response.json().then((data) => {
          document.getElementById('username').textContent = data.user.username;
          document.getElementById('role').textContent = data.user.role;
        });
      }
    })
    .catch((error) => {
      console.error('There was an error!', error);
    });
};

document.getElementById('logout').addEventListener('click', function () {
  if (confirm('Confirm to logout?')) {
    fetch('/auth/logout', {
      method: 'POST',
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = '/login.html';
        } else {
          alert('Logout failed.');
        }
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }
});
