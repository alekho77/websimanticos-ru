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
function createMeta(meta) {

}
function loadSiteData(data) {
  console.info(data);

  document.getElementById("newsite").style.display = data.site.new ? "inline-block" : "none";
  document.getElementById("siteicon-input").value = data.site.icon ? data.site.icon.href : "";
  document.getElementById("siteicon-img").src = data.site.icon ? data.site.icon.href : "";
  var sitemeta = document.getElementById("chapter-site-meta");
  var addmetabutton = sitemeta.lastChild.cloneNode(true);
  sitemeta.innerHTML = "";
  sitemeta.appendChild(addmetabutton.cloneNode(true));
  for(var i = 0; i < data.site.meta.length; i++) {
    console.info(data.site.meta[i]);
  }
}