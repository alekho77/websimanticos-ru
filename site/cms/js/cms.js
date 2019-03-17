function collapse(btn, id) {
    var item = document.getElementById(id);
    if (item.style.display == 'none') {
      item.style.display = 'block';
      btn.innerHTML = '[-]';
    } else {
      item.style.display = 'none'; 
      btn.innerHTML = '[+]';
    }
  }
