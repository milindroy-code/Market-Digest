/* My Stocks — a lightweight, no-signup watchlist.
   Stored in this browser's localStorage only (per-device, not synced across
   devices or accounts — there's no backend on this static site). Scans the
   page's own text for mentions of your saved names/tickers and surfaces them. */
(function () {
  var STORAGE_KEY = 'openingBellWatchlist';

  function readList() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function writeList(list) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      /* private browsing / storage blocked — fail silently, widget still works this session */
    }
  }

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function findMentions(list) {
    var root = document.querySelector('[data-digest-content]');
    if (!root) return [];
    var text = root.innerText || root.textContent || '';
    var lines = text.split('\n').map(function (l) { return l.trim(); }).filter(Boolean);
    var hits = [];
    list.forEach(function (name) {
      var needle = name.trim().toLowerCase();
      if (!needle) return;
      var matchLine = lines.find(function (l) { return l.toLowerCase().indexOf(needle) !== -1; });
      if (matchLine) hits.push({ name: name, line: matchLine });
    });
    return hits;
  }

  function render() {
    var mount = document.getElementById('watchlist-widget');
    if (!mount) return;
    var list = readList();
    var hits = findMentions(list);

    var chips = list.map(function (name, i) {
      return '<span class="wl-chip">' + escapeHtml(name) +
        '<button type="button" class="wl-remove" data-idx="' + i + '" aria-label="Remove ' + escapeHtml(name) + '">×</button></span>';
    }).join('');

    var hitsHtml = '';
    if (list.length > 0) {
      if (hits.length > 0) {
        hitsHtml = '<div class="wl-hits">' +
          '<div class="wl-hits-title">Your stocks in this edition</div>' +
          hits.map(function (h) {
            return '<div class="wl-hit"><strong>' + escapeHtml(h.name) + '</strong> — ' + escapeHtml(h.line) + '</div>';
          }).join('') +
          '</div>';
      } else {
        hitsHtml = '<div class="wl-hits wl-hits-empty">No mentions of your saved stocks in this edition.</div>';
      }
    }

    mount.innerHTML =
      '<div class="wl-header">' +
        '<span class="wl-title">My Stocks</span>' +
        '<span class="wl-sub">Saved on this device — highlights mentions in every edition you open here</span>' +
      '</div>' +
      '<form class="wl-form" id="wl-form">' +
        '<input type="text" id="wl-input" placeholder="e.g. Infosys, TCS, HDFC Bank" autocomplete="off">' +
        '<button type="submit">Add</button>' +
      '</form>' +
      (chips ? '<div class="wl-chips">' + chips + '</div>' : '') +
      hitsHtml;

    var form = document.getElementById('wl-form');
    var input = document.getElementById('wl-input');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var val = input.value.trim();
      if (!val) return;
      var current = readList();
      current.push(val);
      writeList(current);
      input.value = '';
      render();
    });

    mount.querySelectorAll('.wl-remove').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var idx = parseInt(btn.getAttribute('data-idx'), 10);
        var current = readList();
        current.splice(idx, 1);
        writeList(current);
        render();
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
