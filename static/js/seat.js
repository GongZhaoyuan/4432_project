//21096764d Liu Jiahao
//21105665d Gong Zhaoyuan
$(document).ready(function () {
  $('.table').on('click', function () {
    //if..
    console.log('1');
    let position = $(this).attr('id');
    let row = position.charAt(0);
    let col = position.charAt(2); //a for 10, b for 11
    let selected = position.charAt(4);
    if (selected.equals(0)) {
      $(this).removeClass('table').addClass('booked');
    } else {
      $(this).removeClass('booked').addClass('table');
    }
  });
});

function changeColor() {
  let seat = document.getElementsByClassName('table');
}
