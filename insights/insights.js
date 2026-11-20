/* Progressive enhancement: all seven entries remain readable without JavaScript. */
(() => {
  'use strict';
  const group = document.querySelector('.ix-filters');
  const results = document.getElementById('ix-results');
  const count = document.getElementById('ix-count');
  if (!group || !results || !count) return;
  const buttons = Array.from(group.querySelectorAll('[data-filter]'));
  const cards = Array.from(results.querySelectorAll('[data-series]'));
  const valid = new Set(buttons.map(button => button.dataset.filter));
  function apply(filter) {
    if (!valid.has(filter)) filter = 'all';
    let visible = 0;
    cards.forEach(card => {
      card.hidden = filter !== 'all' && card.dataset.series !== filter;
      if (!card.hidden) visible++;
    });
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === filter)));
    count.textContent = visible + (visible === 1 ? ' insight' : ' insights') + ' shown';
  }
  buttons.forEach(button => button.addEventListener('click', () => apply(button.dataset.filter)));
  document.querySelectorAll('[data-jump]').forEach(link => link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    apply(link.dataset.jump);
    document.getElementById('browse').scrollIntoView({block:'start'});
    const active = buttons.find(button => button.dataset.filter === link.dataset.jump);
    if (active) active.focus({preventScroll:true});
  }));
  function fromHash() {
    if (location.hash === '#friday-framework') apply('ff');
    else if (location.hash === '#themes') apply('themes');
    else apply('all');
  }
  group.hidden = false;
  fromHash();
  window.addEventListener('hashchange', fromHash);
})();
