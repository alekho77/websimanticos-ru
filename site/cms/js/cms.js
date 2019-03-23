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
function createMetaValue(key, value) {
  // TODO: encoding strings
  return `<input type="text" class="key" value="${key}" />=<input type="text" class="value" value="${value}" />`;
}
function createMetaRow(meta) {
  if (meta.values.length > 0) {
    var values = [];
    for(var i = 0; i < meta.values.length; i++) {
      if (meta.values[i].length == 2) {
        values.push(createMetaValue(meta.values[i][0], meta.values[i][1]));
      }
    }
    if (values.length > 0) {
      var row = `<div class="list-row"><button type="button" class="simplebutton">&#10005;</button>`;
      for(var i = 0; i < values.length; i++) {
        row += values[i];
      }
      row += `<button type="button" class="simplebutton"${values.length == 1 ? `disabled="disabled"` : ""} style="margin-left: 0.2em">&#9003;</button><button type="button" class="simplebutton last" style="margin-left: 0.2em">&#10151;</button></div>`;
      return row;
    }
  }
  return "";
}
var button_add_new_meta = `<div class="list-row"><button type="button" class="simplebutton" style="font-weight: bold">&#8617;</button></div>`;
function updateSiteData(data) {
  if (data.site.new) {
    document.getElementById("newsite").style.display = "inline-block";
    document.getElementById("siteicon-input").value = "";
    document.getElementById("siteicon-input").readOnly = true;
    document.getElementById("siteicon-browse").disabled = true;
    document.getElementById("siteicon-img").src = "";
    document.getElementById("chapter-site-meta").innerHTML = "";        
  } else {
    document.getElementById("newsite").style.display = "none";
    document.getElementById("siteicon-input").value = data.site.icon;
    document.getElementById("siteicon-input").readOnly = false;
    document.getElementById("siteicon-browse").disabled = false;
    document.getElementById("siteicon-img").src = data.site.icon;
    var sitemeta = "";
    for(var i = 0; i < data.site.meta.length; i++) {
      sitemeta += createMetaRow(data.site.meta[i]);
    }
    sitemeta += button_add_new_meta;
    document.getElementById("chapter-site-meta").innerHTML = sitemeta;
  }
}
function updatePages(pages) {
  if (pages) {
    document.getElementById("new-page").disabled = false;
    if (pages.names.length > 0) {
      var pageslist = "";
      var selected = false;
      for(var i = 0; i < pages.names.length; i++) {
        selected = selected || (pages.selected == pages.names[i]);
        pageslist += `<tr><td class="page-list-item${pages.selected == pages.names[i] ? " page-list-item-selected" : ""}">${pages.names[i]}</td></tr>`;
      }
      document.getElementById("remove-page").disabled = !selected;
      document.getElementById("pages-list").innerHTML = `<table style="width: 100%">${pageslist}</table>`;        
    } else {
      document.getElementById("remove-page").disabled = true;
      document.getElementById("pages-list").innerHTML = "";        
    }
  } else {
    document.getElementById("new-page").disabled = true;
    document.getElementById("remove-page").disabled = true;
    document.getElementById("pages-list").innerHTML = "";        
  }
}
function updatePage(page) {
  if (page) {
    
  } else {
    document.getElementById("chapter-page-meta").innerHTML = "";        
    document.getElementById("chapter-page-blocks").innerHTML = "";        
  }
}