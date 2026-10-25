(function () {
  'use strict';

  var progressBar = document.querySelector('[data-reading-progress]');
  var article = document.querySelector('.distill-article');
  var toc = document.querySelector('[data-table-of-contents]');
  var headings = [];
  var tocLinks = [];
  var ticking = false;

  function uniqueHeadingId(heading, index) {
    if (heading.id) return heading.id;

    var base = heading.textContent
      .trim()
      .toLowerCase()
      .replace(/[^\p{Letter}\p{Number}\s-]/gu, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-') || 'section-' + (index + 1);
    var candidate = base;
    var suffix = 2;

    while (document.getElementById(candidate)) {
      candidate = base + '-' + suffix;
      suffix += 1;
    }

    heading.id = candidate;
    return candidate;
  }

  function buildTableOfContents() {
    if (!article || !toc) return;

    headings = Array.prototype.slice.call(
      article.querySelectorAll('h2:not([data-no-toc]), h3:not([data-no-toc])')
    );

    if (!headings.length) {
      var tocContainer = toc.closest('.distill-toc');
      if (tocContainer) tocContainer.hidden = true;
      return;
    }

    var fragment = document.createDocumentFragment();
    headings.forEach(function (heading, index) {
      var id = uniqueHeadingId(heading, index);
      var link = document.createElement('a');
      link.href = '#' + encodeURIComponent(id);
      link.textContent = heading.textContent;
      link.className = 'toc-link toc-link--' + heading.tagName.toLowerCase();
      link.dataset.headingId = id;
      fragment.appendChild(link);
    });

    toc.appendChild(fragment);
    tocLinks = Array.prototype.slice.call(toc.querySelectorAll('.toc-link'));
  }

  function makeTablesScrollable() {
    if (!article) return;

    Array.prototype.slice.call(article.querySelectorAll('table')).forEach(function (table) {
      if (table.parentElement && table.parentElement.classList.contains('distill-table-wrap')) return;
      var wrapper = document.createElement('div');
      wrapper.className = 'distill-table-wrap';
      wrapper.setAttribute('role', 'region');
      wrapper.setAttribute('aria-label', 'Scrollable table');
      wrapper.setAttribute('tabindex', '0');
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });
  }

  function updateReadingState() {
    if (progressBar) {
      var root = document.documentElement;
      var distance = root.scrollHeight - root.clientHeight;
      var ratio = distance > 0 ? root.scrollTop / distance : 0;
      progressBar.style.transform = 'scaleX(' + Math.min(1, Math.max(0, ratio)) + ')';
    }

    if (headings.length && tocLinks.length) {
      var activeHeading = headings[0];
      var threshold = 130;

      headings.forEach(function (heading) {
        if (heading.getBoundingClientRect().top <= threshold) activeHeading = heading;
      });

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        activeHeading = headings[headings.length - 1];
      }

      tocLinks.forEach(function (link) {
        var isActive = link.dataset.headingId === activeHeading.id;
        link.classList.toggle('is-active', isActive);
        if (isActive) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }

    ticking = false;
  }

  function requestReadingStateUpdate() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateReadingState);
  }

  buildTableOfContents();
  makeTablesScrollable();
  updateReadingState();

  window.addEventListener('scroll', requestReadingStateUpdate, { passive: true });
  window.addEventListener('resize', requestReadingStateUpdate, { passive: true });
})();
