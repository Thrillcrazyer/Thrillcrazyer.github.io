/* TextType (vanilla JS)
 * Lightweight typing effect for Jekyll/static pages.
 * Usage:
 *   <span class="js-texttype" data-texts='["a","b"]' data-typing-speed="75" data-pause-duration="1500" data-show-cursor="true" data-cursor-character="|"></span>
 */

(function () {
  "use strict";

  function toInt(value, fallback) {
    var n = parseInt(value, 10);
    return Number.isFinite(n) ? n : fallback;
  }

  function toBool(value, fallback) {
    if (value === undefined || value === null || value === "") return fallback;
    if (typeof value === "boolean") return value;
    var s = String(value).toLowerCase();
    if (s === "true" || s === "1" || s === "yes" || s === "y") return true;
    if (s === "false" || s === "0" || s === "no" || s === "n") return false;
    return fallback;
  }

  function safeParseJsonArray(value, fallback) {
    if (!value) return fallback;
    try {
      var parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed.map(function (x) { return String(x); });
      return fallback;
    } catch (_) {
      return fallback;
    }
  }

  function TextType(el, options) {
    this.el = el;
    this.options = options;

    this._textSpan = document.createElement("span");
    this._textSpan.className = "texttype__text";

    this._cursorSpan = document.createElement("span");
    this._cursorSpan.className = "texttype__cursor";
    this._cursorSpan.setAttribute("aria-hidden", "true");

    this._timer = null;
    this._isRunning = false;

    while (this.el.firstChild) this.el.removeChild(this.el.firstChild);
    this.el.appendChild(this._textSpan);
    if (this.options.showCursor) {
      this._cursorSpan.textContent = this.options.cursorCharacter;
      this.el.appendChild(this._cursorSpan);
    }

    this._textIndex = 0;
    this._charIndex = 0;
  }

  TextType.prototype.start = function () {
    if (this._isRunning) return;
    this._isRunning = true;

    if (!this.options.text || this.options.text.length === 0) {
      this._textSpan.textContent = "";
      return;
    }

    this._loop();
  };

  TextType.prototype.stop = function () {
    this._isRunning = false;
    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = null;
    }
  };

  TextType.prototype._setTimeout = function (fn, ms) {
    var self = this;
    this._timer = setTimeout(function () {
      self._timer = null;
      fn();
    }, ms);
  };

  TextType.prototype._loop = function () {
    var self = this;
    if (!self._isRunning) return;

    var current = self.options.text[self._textIndex] || "";

    if (self._charIndex <= current.length) {
      self._textSpan.textContent = current.slice(0, self._charIndex);
      self._charIndex += 1;
      self._setTimeout(function () { self._loop(); }, self.options.typingSpeed);
      return;
    }

    // full word shown; pause, then move to next word
    self._setTimeout(function () {
      self._textIndex = (self._textIndex + 1) % self.options.text.length;
      self._charIndex = 0;
      self._loop();
    }, self.options.pauseDuration);
  };

  function initTextTypeElements() {
    var nodes = document.querySelectorAll(".js-texttype");
    if (!nodes || nodes.length === 0) return;

    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];

      var texts = safeParseJsonArray(el.getAttribute("data-texts"), []);

      var typingSpeed = toInt(el.getAttribute("data-typing-speed"), 75);
      var pauseDuration = toInt(el.getAttribute("data-pause-duration"), 1500);
      var showCursor = toBool(el.getAttribute("data-show-cursor"), true);
      var cursorCharacter = el.getAttribute("data-cursor-character") || "|";

      var instance = new TextType(el, {
        text: texts,
        typingSpeed: Math.max(0, typingSpeed),
        pauseDuration: Math.max(0, pauseDuration),
        showCursor: showCursor,
        cursorCharacter: String(cursorCharacter),
      });

      // store for possible debugging
      el._textTypeInstance = instance;
      instance.start();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTextTypeElements);
  } else {
    initTextTypeElements();
  }
})();
