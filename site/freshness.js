/* Converts a data-ts ISO timestamp into a human "updated Xh ago" string,
   so a stale page is visibly stale rather than silently wrong. */
(function () {
  function relative(iso) {
    var then = new Date(iso).getTime();
    if (isNaN(then)) return '';
    var diffMin = Math.round((Date.now() - then) / 60000);
    if (diffMin < 1) return 'just now';
    if (diffMin < 60) return diffMin + ' min ago';
    var diffHr = Math.round(diffMin / 60);
    if (diffHr < 24) return diffHr + ' hr' + (diffHr === 1 ? '' : 's') + ' ago';
    var diffDay = Math.round(diffHr / 24);
    return diffDay + ' day' + (diffDay === 1 ? '' : 's') + ' ago';
  }
  document.querySelectorAll('[data-ts]').forEach(function (el) {
    var iso = el.getAttribute('data-ts');
    var rel = relative(iso);
    if (rel) el.textContent = 'Updated ' + rel;
    if (Date.now() - new Date(iso).getTime() > 20 * 3600 * 1000) {
      el.closest('.freshness') && el.closest('.freshness').classList.add('stale');
    }
  });
})();
