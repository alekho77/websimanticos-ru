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
function beginRefreshing(id) {
  var refresher_id = id + '-refresh';
  if (!document.getElementById(refresher_id)) {
    var elem = document.getElementById(id);
    block = document.createElement('div');
    block.id = refresher_id;
    block.className = 'refresher';
    block.style.width = elem.offsetWidth + 'px';
    block.style.height = elem.offsetHeight + 'px';
    block.style.top = elem.offsetTop + 'px';
    block.style.left = elem.offsetLeft + 'px';
    var h = Math.min(48, elem.offsetHeight);
    var m = Math.max(0, (elem.offsetHeight - h) / 2);
    block.innerHTML = `<img src="images/282.gif" style="opacity: 1; width: auto; height: ${h}px; margin-top: ${m}px" />`;
    elem.parentElement.appendChild(block);
  }
}
function endRefreshing(id) {
  var refresher_id = id + '-refresh';
  var elem = document.getElementById(id).parentElement;
  if (elem.lastChild && elem.lastChild.id == refresher_id) {
    elem.removeChild(elem.lastChild);
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
      row += `<button type="button" class="simplebutton"${values.length == 1 ? ` disabled="disabled"` : ""} style="margin-left: 0.2em">&#9003;</button><button type="button" class="simplebutton last" style="margin-left: 0.2em">&#10151;</button></div>`;
      return row;
    }
  }
  return "";
}
function createMeta(meta) {
  var metalist = "";
  for(var i = 0; i < meta.length; i++) {
    metalist += createMetaRow(meta[i]);
  }
  metalist += `<div class="list-row"><button type="button" class="simplebutton" style="font-weight: bold">&#8617;</button></div>`;
  return metalist;
}
function updateSiteData(site) {
  if (site) {
    document.getElementById("newsite").style.display = "none";
    document.getElementById("siteicon-input").value = site.icon;
    document.getElementById("siteicon-input").readOnly = false;
    document.getElementById("siteicon-browse").disabled = false;
    document.getElementById("siteicon-img").src = site.icon;
    document.getElementById("chapter-site-meta").innerHTML = createMeta(site.meta);
  } else {
    document.getElementById("newsite").style.display = "inline-block";
    document.getElementById("siteicon-input").value = "";
    document.getElementById("siteicon-input").readOnly = true;
    document.getElementById("siteicon-browse").disabled = true;
    document.getElementById("siteicon-img").src = "";
    document.getElementById("chapter-site-meta").innerHTML = "";        
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
function createBlock(block, first, last) {
  var blockhtml = `<div class="page-block" style="height: 3em">`;
  blockhtml += `<span class="caption">${block.caption}</span>`;
  blockhtml += `<div style="float: right">`;
  blockhtml += `<button type="button" class="simplebutton"${first ? ` disabled="disabled"` : ""} >&#11205;</button>`;
  blockhtml += `<button type="button" class="simplebutton"${last ? ` disabled="disabled"` : ""}>&#11206;</button>`;
  blockhtml += `<button type="button" class="simplebutton gap">&#10005;</button>`;
  blockhtml += `</div>`;
  blockhtml += `</div>`;
  return blockhtml;
}
function createBlocks(blocks) {
  var blocklist = "";
  for(var i = 0; i < blocks.length; i++) {
    blocklist += createBlock(blocks[i], i == 0, i == (blocks.length - 1));
  }
  return blocklist;
}
function updatePage(page) {
  if (page) {
    document.getElementById("chapter-page-meta").innerHTML = createMeta(page.meta);        
    document.getElementById("chapter-page-blocks").innerHTML = createBlocks(page.blocks);        
  } else {
    document.getElementById("chapter-page-meta").innerHTML = "";        
    document.getElementById("chapter-page-blocks").innerHTML = "";        
  }
}

var sitedb = {
  site: false,
  pages: false,
  page: false,
};

function reloadSiteData(next) {
  beginRefreshing('chapter-site');
  setTimeout(function(){
    endRefreshing('chapter-site');
    updateSiteData(sitedb.site);
    if (next) {
      next();
    }
  }, 2000);
}
function reloadAll() {
  beginRefreshing('chapter-site');
  beginRefreshing('chapter-site-meta');
  beginRefreshing('chapter-page-list');
  beginRefreshing('chapter-page-meta');
  beginRefreshing('chapter-page-blocks');
  reloadSiteData();
}

function createSite(sitename) {
  reloadAll();
}