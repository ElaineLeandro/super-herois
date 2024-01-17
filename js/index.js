

window.onload = function () {
  let btn = document.querySelector('#btn-navbar');
  btn.addEventListener('click', function () {
    let confirm = window.confirm('Deseja sair dessa pagina?');
    if (confirm) {
      window.location.href = 'https://www.youtube.com/watch?v=9fVYKsEmuRo&ab_channel=PlayStation';
    }
  });
}



