(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  (function($) {
    $.inlineFootnote = function(el, options) {
      this.el = $(el);
      this.el.data("inlineFootnote", this);
      this.initialize = function() {
        this.options = $.extend({}, $.inlineFootnote.defaultOptions, options);
        this.footnoteId = this.el.attr("href").match(/#(.*)/)[1];
        if (this.footnoteId) {
          this.el.mouseenter(this.openModal);
          return $("body").mousemove(this.closeModal);
        }
      };
      this.openModal = __bind(function(event) {
        var footnoteContent, linkOffset;
        if (!this.modal) {
          footnoteContent = $("[id='" + this.footnoteId + "']").children().not("[rev=footnote]");
          linkOffset = this.el.offset();
          return this.modal = $("<div />", {
            id: "footnote_modal",
            html: footnoteContent,
            css: {
              position: "absolute",
              top: linkOffset.top,
              left: linkOffset.left + this.el.outerWidth()
            }
          }).appendTo("body");
        }
      }, this);
      this.closeModal = __bind(function(event) {
        if (this.modal) {
          if (this.hoveringFootnote(event)) {
            if (this.closeTimeout) {
              clearTimeout(this.closeTimeout);
              return this.closeTimeout = null;
            }
          } else {
            if (!this.closeTimeout) {
              return this.closeTimeout = setTimeout((__bind(function() {
                console.log("remove");
                this.modal.remove();
                return this.modal = null;
              }, this)), this.options.hidingDelay);
            }
          }
        }
      }, this);
      this.hoveringFootnote = function(event) {
        return this.modal.is(event.target) || $(event.target).closest(this.modal).length > 0 || event.target === this.el[0];
      };
      return this.initialize();
    };
    $.inlineFootnote.defaultOptions = {
      hidingDelay: 200
    };
    return $.fn.inlineFootnote = function(options) {
      return this.each(function() {
        return new $.inlineFootnote(this, options);
      });
    };
  })(jQuery);
}).call(this);

