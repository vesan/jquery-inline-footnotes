(function() {
  /*
  jQuery Inline Footnotes v1.0
  Released under the MIT License.
  */  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
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
          footnoteContent = $("[id='" + this.footnoteId + "']").children().not(this.options.hideFromContent);
          linkOffset = this.el.offset();
          this.modal = $("<div />", {
            id: this.options.modalId,
            html: footnoteContent.clone(),
            css: {
              position: "absolute",
              top: linkOffset.top,
              left: linkOffset.left + this.el.outerWidth()
            }
          }).appendTo("body");
          return this.positionModal();
        }
      }, this);
      this.closeModal = __bind(function(event) {
        if (this.modal) {
          if (this.isHoveringFootnote(event)) {
            clearTimeout(this.closeTimeout);
            return this.closeTimeout = null;
          } else {
            if (!this.closeTimeout) {
              return this.closeTimeout = setTimeout((__bind(function() {
                this.modal.remove();
                return this.modal = null;
              }, this)), this.options.hideDelay);
            }
          }
        }
      }, this);
      this.isHoveringFootnote = function(event) {
        return this.modal.is(event.target) || $(event.target).closest(this.modal).length > 0 || event.target === this.el[0];
      };
      this.positionModal = function() {
        var boxLeft, boxWidth, linkLeftOffset, modalHorizontalPadding, windowWidth;
        modalHorizontalPadding = parseInt(this.modal.css("padding-left")) + parseInt(this.modal.css("padding-right"));
        linkLeftOffset = this.el.offset().left;
        windowWidth = $(window).width();
        if ((windowWidth / 2) > linkLeftOffset) {
          boxLeft = linkLeftOffset + 20;
          boxWidth = windowWidth - boxLeft - modalHorizontalPadding - this.options.boxMargin * 2;
          if (boxWidth > this.options.maximumBoxWidth) {
            boxWidth = this.options.maximumBoxWidth;
          }
        } else {
          boxWidth = linkLeftOffset - modalHorizontalPadding - this.options.boxMargin * 2;
          if (boxWidth > this.options.maximumBoxWidth) {
            boxWidth = this.options.maximumBoxWidth;
          }
          boxLeft = linkLeftOffset - boxWidth - this.options.boxMargin * 2;
        }
        return this.modal.css({
          width: boxWidth,
          left: boxLeft
        });
      };
      return this.initialize();
    };
    $.inlineFootnote.defaultOptions = {
      boxMargin: 20,
      hideDelay: 200,
      hideFromContent: "[rev=footnote]",
      maximumBoxWidth: 500,
      modalId: "footnote_box"
    };
    return $.fn.inlineFootnote = function(options) {
      return this.each(function() {
        return new $.inlineFootnote(this, options);
      });
    };
  })(jQuery);
}).call(this);
