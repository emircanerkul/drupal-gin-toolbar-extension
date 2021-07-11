function getToolbar() {
  return document.body.querySelector(".toolbar-menu-administration .toolbar-menu").outerHTML;
}

function goURL(url) {
  window.location.href = url;
}

chrome.tabs.executeScript({
  code: '(' + getToolbar + ')();'
}, (toolbar) => {
  if (toolbar[0] == null) {
    console.log(window.document.querySelector('p.error'));
    window.document.querySelector('p.error').style.display = "block";
    return;
  }
  window.document.getElementById('toolbar-placeholder').outerHTML = toolbar;
  window.document.querySelectorAll("a").forEach((i)=> {
    if (i.parentNode.classList.contains("menu-item--expanded")) return;
    i.addEventListener('click', (evt) => {
      evt.preventDefault();
      chrome.tabs.executeScript({
        code: '(' + goURL + ')("' + evt.target.getAttribute('href') + '");'
      });
    });
  });

  window.document.querySelectorAll('.menu-item--expanded a').forEach((i)=> {
    i.addEventListener('click', (evt) => {
      evt.preventDefault();
      document.body.querySelectorAll('.menu-item--expanded').forEach(e => e.classList.remove('expanded'));
      parentsUntil(evt.target.parentNode, "body").forEach(e => e.classList.add('expanded') );
    });
  });
  
});

function parentsUntil(elem, parent, filter) {
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector
  }
  const parents = []
  for (; elem && elem !== document; elem = elem.parentNode) {
    if (parent) {
      if (elem.matches(parent)) break
    }

    if (filter) {
      if (elem.matches(filter)) {
        parents.push(elem)
      }
      continue
    }
    parents.push(elem)
  }
  return parents
}
