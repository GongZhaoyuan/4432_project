//21096764d Liu Jiahao
//21105665d Gong Zhaoyuan
function calculatePrice() {
  let price = 0;

  let small = document.getElementById('small');
  let medium = document.getElementById('medium');
  let large = document.getElementById('large');

  let mySelect = document.getElementById('DrinkSelect');
  let RefreshThePrice = document.getElementById('price');

  if (mySelect.value != 'Please Select') {
    if (mySelect.value == 'Bubble Milktea') {
      if (small.checked == true) {
        price = 288;
      } else if (medium.checked == true) {
        price = 388;
      } else if (large.checked == true) {
        price = 488;
      }
    } else if (mySelect.value == 'Iced Latte') {
      if (small.checked == true) {
        price = 199;
      } else if (medium.checked == true) {
        price = 399;
      } else if (large.checked == true) {
        price = 599;
      }
    } else if (mySelect.value == 'Cocktail') {
      if (small.checked == true) {
        price = 400;
      } else if (medium.checked == true) {
        price = 500;
      } else if (large.checked == true) {
        price = 600;
      }
    }
    RefreshThePrice.innerHTML = price;
  } else {
    alert('Please select the date.');
    small.checked = false;
    medium.checked = false;
    large.checked = false;
  }
}

function placeOrder(event) {
  let drink = document.getElementById('DrinkSelect');
  if (drink.value == 'Pelese Select') {
    alert(' Please select a date first.');
  } else {
    let drink = document.forms['form']['DrinkSelect'].value;
    let size = document.forms['form']['size'].value;

    let orderData = [drink, size];

    localStorage.setItem('orders', orderData);

    alert('Thanks for your order!');

    document.getElementById('form').reset();
    var output = document.getElementById('price');
    output.innerHTML = 0;
    window.location.replace('/payment_confirm.html');
  }
}

function resetButton() {
  var output = document.getElementById('price');
  output.innerHTML = 0;
}
