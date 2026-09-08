(function (root) {
  'use strict';

  var MONTHS = {
    jan: 'January',
    feb: 'February',
    mar: 'March',
    apr: 'April',
    may: 'May',
    jun: 'June',
    jul: 'July',
    aug: 'August',
    sep: 'September',
    oct: 'October',
    nov: 'November',
    dec: 'December'
  };

  var ACCENTS = {
    "'": {
      a: 'á', e: 'é', i: 'í', o: 'ó', u: 'ú', y: 'ý',
      A: 'Á', E: 'É', I: 'Í', O: 'Ó', U: 'Ú', Y: 'Ý'
    },
    '`': {
      a: 'à', e: 'è', i: 'ì', o: 'ò', u: 'ù',
      A: 'À', E: 'È', I: 'Ì', O: 'Ò', U: 'Ù'
    },
    '^': {
      a: 'â', e: 'ê', i: 'î', o: 'ô', u: 'û',
      A: 'Â', E: 'Ê', I: 'Î', O: 'Ô', U: 'Û'
    },
    '"': {
      a: 'ä', e: 'ë', i: 'ï', o: 'ö', u: 'ü', y: 'ÿ',
      A: 'Ä', E: 'Ë', I: 'Ï', O: 'Ö', U: 'Ü', Y: 'Ÿ'
    },
    '~': {
      a: 'ã', n: 'ñ', o: 'õ',
      A: 'Ã', N: 'Ñ', O: 'Õ'
    },
    '=': {
      a: 'ā', e: 'ē', i: 'ī', o: 'ō', u: 'ū',
      A: 'Ā', E: 'Ē', I: 'Ī', O: 'Ō', U: 'Ū'
    },
    '.': {
      c: 'ċ', e: 'ė', g: 'ġ', z: 'ż',
      C: 'Ċ', E: 'Ė', G: 'Ġ', Z: 'Ż'
    },
    u: {
      a: 'ă', e: 'ĕ', g: 'ğ', i: 'ĭ', o: 'ŏ', u: 'ŭ',
      A: 'Ă', E: 'Ĕ', G: 'Ğ', I: 'Ĭ', O: 'Ŏ', U: 'Ŭ'
    },
    v: {
      c: 'č', d: 'ď', e: 'ě', l: 'ľ', n: 'ň', r: 'ř', s: 'š', t: 'ť', z: 'ž',
      C: 'Č', D: 'Ď', E: 'Ě', L: 'Ľ', N: 'Ň', R: 'Ř', S: 'Š', T: 'Ť', Z: 'Ž'
    },
    H: {
      o: 'ő', u: 'ű', O: 'Ő', U: 'Ű'
    },
    c: {
      c: 'ç', s: 'ş', t: 'ţ', C: 'Ç', S: 'Ş', T: 'Ţ'
    },
    k: {
      a: 'ą', e: 'ę', A: 'Ą', E: 'Ę'
    },
    b: {
      b: 'ḇ', d: 'ḏ', k: 'ḵ', l: 'ḻ', n: 'ṉ', r: 'ṟ', t: 'ṯ', z: 'ẕ'
    },
    d: {
      a: 'ạ', e: 'ẹ', i: 'ị', o: 'ọ', u: 'ụ',
      A: 'Ạ', E: 'Ẹ', I: 'Ị', O: 'Ọ', U: 'Ụ'
    },
    r: {
      a: 'å', A: 'Å', u: 'ů', U: 'Ů'
    }
  };

  function BibTeXParser(source) {
    this.source = String(source || '').replace(/\r\n?/g, '\n');
    this.position = 0;
    this.strings = Object.assign({}, MONTHS);
    this.warnings = [];
  }

  BibTeXParser.prototype.peek = function () {
    return this.source[this.position];
  };

  BibTeXParser.prototype.skipSpace = function () {
    while (this.position < this.source.length) {
      if (/\s/.test(this.peek())) {
        this.position += 1;
      } else if (this.peek() === '%') {
        while (this.position < this.source.length && this.peek() !== '\n') {
          this.position += 1;
        }
      } else {
        break;
      }
    }
  };

  BibTeXParser.prototype.readIdentifier = function () {
    var start = this.position;
    while (this.position < this.source.length && /[A-Za-z0-9_:\-./]/.test(this.peek())) {
      this.position += 1;
    }
    return this.source.slice(start, this.position);
  };

  BibTeXParser.prototype.readUntil = function (stoppers) {
    var start = this.position;
    while (this.position < this.source.length && stoppers.indexOf(this.peek()) === -1) {
      this.position += 1;
    }
    return this.source.slice(start, this.position).trim();
  };

  BibTeXParser.prototype.readBraced = function () {
    var result = '';
    var depth = 1;
    this.position += 1;

    while (this.position < this.source.length) {
      var character = this.peek();

      if (character === '\\') {
        result += character;
        this.position += 1;
        if (this.position < this.source.length) {
          result += this.peek();
          this.position += 1;
        }
      } else if (character === '{') {
        depth += 1;
        result += character;
        this.position += 1;
      } else if (character === '}') {
        depth -= 1;
        this.position += 1;
        if (depth === 0) return result;
        result += character;
      } else {
        result += character;
        this.position += 1;
      }
    }

    throw new Error('Unclosed braced BibTeX value near character ' + this.position + '.');
  };

  BibTeXParser.prototype.readQuoted = function () {
    var result = '';
    var braceDepth = 0;
    this.position += 1;

    while (this.position < this.source.length) {
      var character = this.peek();

      if (character === '\\') {
        result += character;
        this.position += 1;
        if (this.position < this.source.length) {
          result += this.peek();
          this.position += 1;
        }
      } else if (character === '{') {
        braceDepth += 1;
        result += character;
        this.position += 1;
      } else if (character === '}') {
        braceDepth = Math.max(0, braceDepth - 1);
        result += character;
        this.position += 1;
      } else if (character === '"' && braceDepth === 0) {
        this.position += 1;
        return result;
      } else {
        result += character;
        this.position += 1;
      }
    }

    throw new Error('Unclosed quoted BibTeX value near character ' + this.position + '.');
  };

  BibTeXParser.prototype.readBare = function (closingCharacter) {
    var start = this.position;
    while (this.position < this.source.length) {
      var character = this.peek();
      if (character === ',' || character === '#' || character === closingCharacter) break;
      this.position += 1;
    }

    var token = this.source.slice(start, this.position).trim();
    var replacement = this.strings[token.toLowerCase()];
    return typeof replacement === 'string' ? replacement : token;
  };

  BibTeXParser.prototype.readValue = function (closingCharacter) {
    var parts = [];

    while (this.position < this.source.length) {
      this.skipSpace();
      var character = this.peek();

      if (character === '{') parts.push(this.readBraced());
      else if (character === '"') parts.push(this.readQuoted());
      else parts.push(this.readBare(closingCharacter));

      this.skipSpace();
      if (this.peek() !== '#') break;
      this.position += 1;
    }

    return parts.join('');
  };

  BibTeXParser.prototype.skipBalancedEntry = function (openingCharacter, closingCharacter) {
    var depth = 1;
    var inQuote = false;

    while (this.position < this.source.length && depth > 0) {
      var character = this.peek();
      if (character === '\\') {
        this.position += Math.min(2, this.source.length - this.position);
      } else {
        if (character === '"') inQuote = !inQuote;
        if (!inQuote && character === openingCharacter) depth += 1;
        if (!inQuote && character === closingCharacter) depth -= 1;
        this.position += 1;
      }
    }
  };

  BibTeXParser.prototype.parseStringEntry = function (closingCharacter) {
    while (this.position < this.source.length) {
      this.skipSpace();
      if (this.peek() === closingCharacter) {
        this.position += 1;
        return;
      }

      var name = this.readIdentifier().toLowerCase();
      this.skipSpace();
      if (!name || this.peek() !== '=') {
        this.readUntil([',', closingCharacter]);
      } else {
        this.position += 1;
        this.strings[name] = this.readValue(closingCharacter);
      }

      this.skipSpace();
      if (this.peek() === ',') this.position += 1;
    }
  };

  BibTeXParser.prototype.parseEntry = function () {
    this.position += 1;
    this.skipSpace();
    var type = this.readIdentifier().toLowerCase();
    this.skipSpace();

    var openingCharacter = this.peek();
    var closingCharacter = openingCharacter === '{' ? '}' : openingCharacter === '(' ? ')' : '';
    if (!closingCharacter) {
      this.warnings.push('Ignored malformed @' + (type || '?') + ' entry near character ' + this.position + '.');
      return null;
    }
    this.position += 1;

    if (type === 'comment' || type === 'preamble') {
      this.skipBalancedEntry(openingCharacter, closingCharacter);
      return null;
    }
    if (type === 'string') {
      this.parseStringEntry(closingCharacter);
      return null;
    }

    this.skipSpace();
    var key = this.readUntil([',', closingCharacter]);
    if (!key) {
      this.skipBalancedEntry(openingCharacter, closingCharacter);
      this.warnings.push('Ignored a BibTeX entry without a citation key.');
      return null;
    }

    var rawFields = {};
    var fields = {};
    if (this.peek() === ',') this.position += 1;

    while (this.position < this.source.length) {
      this.skipSpace();
      if (this.peek() === closingCharacter) {
        this.position += 1;
        break;
      }

      var fieldName = this.readIdentifier().toLowerCase();
      this.skipSpace();
      if (!fieldName || this.peek() !== '=') {
        this.warnings.push('Skipped a malformed field in "' + key + '".');
        this.readUntil([',', closingCharacter]);
      } else {
        this.position += 1;
        var rawValue = this.readValue(closingCharacter).trim();
        rawFields[fieldName] = rawValue;
        fields[fieldName] = decodeLatex(rawValue);
      }

      this.skipSpace();
      if (this.peek() === ',') this.position += 1;
    }

    fields.key = key;
    fields.type = type;
    fields.rawFields = rawFields;
    return fields;
  };

  BibTeXParser.prototype.parse = function () {
    var entries = new Map();

    while (this.position < this.source.length) {
      var nextEntry = this.source.indexOf('@', this.position);
      if (nextEntry === -1) break;
      this.position = nextEntry;

      var previousPosition = this.position;
      try {
        var entry = this.parseEntry();
        if (entry) {
          if (entries.has(entry.key)) {
            this.warnings.push('Ignored duplicate BibTeX key "' + entry.key + '".');
          } else {
            entries.set(entry.key, entry);
          }
        }
      } catch (error) {
        this.warnings.push(error.message);
        var recoveryPoint = this.source.indexOf('@', Math.max(this.position, previousPosition + 1));
        if (recoveryPoint === -1) break;
        this.position = recoveryPoint;
      }

      if (this.position <= previousPosition) this.position = previousPosition + 1;
    }

    return entries;
  };

  function decodeLatex(value) {
    var text = String(value || '');
    var specialLetters = {
      aa: 'å', AA: 'Å', ae: 'æ', AE: 'Æ', oe: 'œ', OE: 'Œ',
      o: 'ø', O: 'Ø', l: 'ł', L: 'Ł', ss: 'ß', i: 'ı', j: 'ȷ'
    };

    text = text.replace(/\\([`'"^~=\.uvHckbdr])\s*\{?\s*([A-Za-z])\s*\}?/g, function (_, accent, letter) {
      return ACCENTS[accent] && ACCENTS[accent][letter] ? ACCENTS[accent][letter] : letter;
    });
    text = text.replace(/\\(AA|AE|OE|aa|ae|oe|ss|[oOlLij])\b\s*\{?\}?/g, function (_, command) {
      return specialLetters[command] || '';
    });

    var previous;
    do {
      previous = text;
      text = text.replace(/\\(?:emph|textit|textbf|textrm|texttt|mathrm|mathbf|mathit|operatorname|url)\*?\s*\{([^{}]*)\}/g, '$1');
    } while (text !== previous);

    return text
      .replace(/\\([#$%&_{}])/g, '$1')
      .replace(/\\textasciitilde\b/g, '~')
      .replace(/\\textasciicircum\b/g, '^')
      .replace(/\\[A-Za-z]+\*?/g, '')
      .replace(/[{}$]/g, '')
      .replace(/---/g, '—')
      .replace(/--/g, '–')
      .replace(/~/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function splitAuthors(rawValue) {
    var raw = String(rawValue || '');
    var authors = [];
    var start = 0;
    var depth = 0;
    var index = 0;

    while (index < raw.length) {
      var character = raw[index];
      if (character === '\\') {
        index += 2;
        continue;
      }
      if (character === '{') depth += 1;
      else if (character === '}') depth = Math.max(0, depth - 1);

      if (depth === 0 && /\s/.test(character)) {
        var match = raw.slice(index).match(/^\s+and\s+/i);
        if (match) {
          authors.push(raw.slice(start, index).trim());
          index += match[0].length;
          start = index;
          continue;
        }
      }
      index += 1;
    }

    if (raw.slice(start).trim()) authors.push(raw.slice(start).trim());
    return authors.map(formatPersonName).filter(Boolean);
  }

  function formatPersonName(rawName) {
    var raw = String(rawName || '').trim();
    var isOrganization = raw[0] === '{' && raw[raw.length - 1] === '}';
    var name = decodeLatex(raw);
    if (!name || /^others$/i.test(name)) return name ? 'et al.' : '';
    if (isOrganization || name.indexOf(',') === -1) return name;

    var pieces = name.split(',').map(function (piece) { return piece.trim(); }).filter(Boolean);
    if (pieces.length < 2) return name;
    if (pieces.length === 2) return pieces[1] + ' ' + pieces[0];
    return pieces[2] + ' ' + pieces[0] + ', ' + pieces[1];
  }

  function formatAuthorList(entry) {
    var rawAuthor = entry.rawFields && entry.rawFields.author;
    var authors = splitAuthors(rawAuthor || entry.author || '');
    if (!authors.length) return entry.editor ? decodeLatex(entry.editor) : 'Unknown author';
    if (authors.length === 1) return authors[0];
    if (authors.length === 2) return authors[0] + ' and ' + authors[1];
    return authors.slice(0, -1).join(', ') + ', and ' + authors[authors.length - 1];
  }

  function normalizeDoi(value) {
    return String(value || '')
      .trim()
      .replace(/^doi:\s*/i, '')
      .replace(/^https?:\/\/(?:dx\.)?doi\.org\//i, '');
  }

  function safeHttpUrl(value) {
    if (!value || typeof URL === 'undefined') return '';
    try {
      var url = new URL(String(value).trim(), root.location ? root.location.href : 'https://example.invalid/');
      return url.protocol === 'http:' || url.protocol === 'https:' ? url.href : '';
    } catch (_) {
      return '';
    }
  }

  function entryLink(entry) {
    var directUrl = safeHttpUrl(entry.url);
    if (directUrl) return directUrl;
    var doi = normalizeDoi(entry.doi);
    return doi ? safeHttpUrl('https://doi.org/' + doi) : '';
  }

  function venueFor(entry) {
    return entry.journal || entry.booktitle || entry.school || entry.institution || entry.publisher || '';
  }

  function compactCitation(entry) {
    var authors = splitAuthors((entry.rawFields && entry.rawFields.author) || entry.author || '');
    var authorText = authors.length > 2 ? authors[0] + ' et al.' : authors.join(' and ');
    return (authorText || 'Unknown author') + ' (' + (entry.year || 'n.d.') + '). ' + (entry.title || 'Untitled');
  }

  function appendText(parent, value) {
    parent.appendChild(parent.ownerDocument.createTextNode(value));
  }

  function appendReference(parent, entry, includeLinks) {
    var documentRef = parent.ownerDocument;
    var authors = documentRef.createElement('span');
    authors.className = 'authors';
    authors.textContent = formatAuthorList(entry);
    parent.appendChild(authors);
    appendText(parent, ' (' + (entry.year || 'n.d.') + '). ');

    var title = documentRef.createElement(entryLink(entry) ? 'a' : 'span');
    title.className = 'title';
    title.textContent = entry.title || 'Untitled';
    if (title.tagName === 'A') {
      title.href = entryLink(entry);
      title.target = '_blank';
      title.rel = 'noopener noreferrer';
    }
    parent.appendChild(title);

    var venue = venueFor(entry);
    if (venue) {
      appendText(parent, '. ');
      var venueElement = documentRef.createElement('em');
      venueElement.textContent = venue;
      parent.appendChild(venueElement);
    }

    var publicationDetails = '';
    if (entry.volume) publicationDetails += ', ' + entry.volume;
    if (entry.number) publicationDetails += '(' + entry.number + ')';
    if (entry.pages) publicationDetails += ', ' + entry.pages;
    if (publicationDetails) appendText(parent, publicationDetails);
    appendText(parent, '.');

    if (includeLinks && entry.doi) {
      var doi = normalizeDoi(entry.doi);
      var doiUrl = safeHttpUrl('https://doi.org/' + doi);
      if (doiUrl) {
        appendText(parent, ' ');
        var doiLink = documentRef.createElement('a');
        doiLink.className = 'reference-link';
        doiLink.href = doiUrl;
        doiLink.target = '_blank';
        doiLink.rel = 'noopener noreferrer';
        doiLink.textContent = 'DOI';
        parent.appendChild(doiLink);
      }
    }
  }

  function referenceId(number) {
    return 'reference-' + number;
  }

  function positionPopover(cite, popover) {
    var gap = 10;
    var edge = 12;
    var citeBox = cite.getBoundingClientRect();
    var popoverBox = popover.getBoundingClientRect();
    var left = citeBox.left + (citeBox.width - popoverBox.width) / 2;
    left = Math.max(edge, Math.min(left, root.innerWidth - popoverBox.width - edge));
    var top = citeBox.top - popoverBox.height - gap;
    if (top < edge) top = citeBox.bottom + gap;
    top = Math.max(edge, Math.min(top, root.innerHeight - popoverBox.height - edge));
    popover.style.left = Math.round(left) + 'px';
    popover.style.top = Math.round(top) + 'px';
  }

  function attachPopoverBehavior(cite, popover) {
    function show() {
      cite.classList.add('distill-cite--open');
      root.requestAnimationFrame(function () {
        root.requestAnimationFrame(function () { positionPopover(cite, popover); });
      });
    }
    function hide() {
      cite.classList.remove('distill-cite--open');
    }

    cite.addEventListener('mouseenter', show);
    cite.addEventListener('mouseleave', hide);
    cite.addEventListener('focusin', show);
    cite.addEventListener('focusout', function (event) {
      if (!cite.contains(event.relatedTarget)) hide();
    });
    cite.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        hide();
        var focused = cite.querySelector(':focus');
        if (focused) focused.blur();
      }
    });
  }

  function renderCitations(cites, entries, citationList) {
    var documentRef = citationList.ownerDocument;
    var numberedEntries = [];
    var numbersByKey = new Map();

    cites.forEach(function (cite, citeIndex) {
      var keys = String(cite.getAttribute('key') || '')
        .split(',')
        .map(function (key) { return key.trim(); })
        .filter(Boolean);
      var resolved = keys.map(function (key) {
        if (!entries.has(key)) return { key: key, number: null, entry: null };
        if (!numbersByKey.has(key)) {
          var number = numberedEntries.length + 1;
          numbersByKey.set(key, number);
          numberedEntries.push({ key: key, number: number, entry: entries.get(key) });
        }
        return { key: key, number: numbersByKey.get(key), entry: entries.get(key) };
      });

      cite.replaceChildren();
      cite.classList.add('distill-cite--rendered');
      var marker = documentRef.createElement('span');
      marker.className = 'distill-cite__marker';
      appendText(marker, '[');

      resolved.forEach(function (item, itemIndex) {
        if (itemIndex) appendText(marker, ', ');
        if (item.entry) {
          var link = documentRef.createElement('a');
          link.href = '#' + referenceId(item.number);
          link.textContent = String(item.number);
          link.title = compactCitation(item.entry);
          link.setAttribute('aria-label', 'Reference ' + item.number + ': ' + compactCitation(item.entry));
          marker.appendChild(link);
        } else {
          var missing = documentRef.createElement('span');
          missing.className = 'distill-cite__missing';
          missing.textContent = '?';
          missing.title = 'Missing citation: ' + item.key;
          missing.setAttribute('aria-label', 'Missing citation: ' + item.key);
          marker.appendChild(missing);
          if (root.console && root.console.warn) root.console.warn('Missing BibTeX entry: ' + item.key);
        }
      });
      appendText(marker, ']');
      cite.appendChild(marker);

      var validItems = resolved.filter(function (item) { return item.entry; });
      if (validItems.length) {
        var popover = documentRef.createElement('span');
        popover.className = 'distill-cite__popover';
        popover.id = 'citation-popover-' + (citeIndex + 1);
        popover.setAttribute('role', 'tooltip');
        var popoverList = documentRef.createElement('ol');

        validItems.forEach(function (item) {
          var listItem = documentRef.createElement('li');
          var number = documentRef.createElement('strong');
          number.textContent = item.number + '. ';
          listItem.appendChild(number);
          appendText(listItem, compactCitation(item.entry));
          popoverList.appendChild(listItem);
        });
        popover.appendChild(popoverList);
        cite.appendChild(popover);
        marker.setAttribute('aria-describedby', popover.id);
        attachPopoverBehavior(cite, popover);
      }
    });

    citationList.replaceChildren();
    if (!numberedEntries.length) {
      citationList.hidden = true;
      return;
    }

    var heading = documentRef.createElement('h2');
    heading.id = 'references';
    heading.dataset.noToc = '';
    heading.textContent = 'References';
    citationList.appendChild(heading);

    var list = documentRef.createElement('ol');
    list.className = 'references';
    numberedEntries.forEach(function (item) {
      var listItem = documentRef.createElement('li');
      listItem.id = referenceId(item.number);
      appendReference(listItem, item.entry, true);
      list.appendChild(listItem);
    });
    citationList.appendChild(list);
    citationList.hidden = false;
    citationList.removeAttribute('aria-busy');
  }

  function renderLoadError(cites, citationList, message) {
    var documentRef = citationList.ownerDocument;
    cites.forEach(function (cite) {
      cite.replaceChildren();
      cite.classList.add('distill-cite--rendered');
      var missing = documentRef.createElement('span');
      missing.className = 'distill-cite__marker distill-cite__missing';
      missing.textContent = '[?]';
      missing.title = message;
      cite.appendChild(missing);
    });

    citationList.replaceChildren();
    var heading = documentRef.createElement('h2');
    heading.id = 'references';
    heading.dataset.noToc = '';
    heading.textContent = 'References';
    var error = documentRef.createElement('p');
    error.className = 'distill-citation-list__error';
    error.textContent = message;
    citationList.appendChild(heading);
    citationList.appendChild(error);
    citationList.hidden = false;
    citationList.removeAttribute('aria-busy');
  }

  function parseBibTeX(source) {
    var parser = new BibTeXParser(source);
    var entries = parser.parse();
    entries.warnings = parser.warnings;
    return entries;
  }

  function initializeCitations(documentRef) {
    var bibliography = documentRef.querySelector('d-bibliography[src]');
    var citationList = documentRef.querySelector('d-citation-list');
    var cites = Array.prototype.slice.call(documentRef.querySelectorAll('d-cite[key]'));
    if (!bibliography || !citationList || !cites.length) return Promise.resolve();

    citationList.setAttribute('aria-busy', 'true');
    return root.fetch(bibliography.getAttribute('src'), { credentials: 'same-origin' })
      .then(function (response) {
        if (!response.ok) throw new Error('Could not load bibliography (' + response.status + ').');
        return response.text();
      })
      .then(function (source) {
        var entries = parseBibTeX(source);
        if (!entries.size) throw new Error('The bibliography does not contain any valid entries.');
        if (entries.warnings.length && root.console && root.console.warn) {
          entries.warnings.forEach(function (warning) { root.console.warn(warning); });
        }
        renderCitations(cites, entries, citationList);
      })
      .catch(function (error) {
        var message = 'References could not be loaded: ' + error.message;
        renderLoadError(cites, citationList, message);
        if (root.console && root.console.error) root.console.error(error);
      });
  }

  var api = {
    parseBibTeX: parseBibTeX,
    decodeLatex: decodeLatex,
    splitAuthors: splitAuthors,
    safeHttpUrl: safeHttpUrl,
    initialize: initializeCitations
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.DistillCitations = api;

  if (root.document) {
    if (root.document.readyState === 'loading') {
      root.document.addEventListener('DOMContentLoaded', function () {
        initializeCitations(root.document);
      });
    } else {
      initializeCitations(root.document);
    }

    root.addEventListener('scroll', function () {
      Array.prototype.forEach.call(root.document.querySelectorAll('.distill-cite--open'), function (cite) {
        var popover = cite.querySelector('.distill-cite__popover');
        if (cite.contains(root.document.activeElement) && popover) positionPopover(cite, popover);
        else cite.classList.remove('distill-cite--open');
      });
    }, { passive: true });
  }
})(typeof window !== 'undefined' ? window : globalThis);
