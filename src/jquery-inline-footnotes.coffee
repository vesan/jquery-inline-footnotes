###
jQuery Inline Footnotes v1.0
Released under the MIT License.
###
(($)->
  $.inlineFootnote = (el, options) ->
    @el = $(el);

    @el.data("inlineFootnote", @);

    @initialize = ->
      @options = $.extend {}, $.inlineFootnote.defaultOptions, options

      @footnoteId = @el.attr("href").match(/#(.*)/)[1]

      if(@footnoteId)
        @el.mouseenter @openModal
        $("body").mousemove @closeModal

    @openModal = (event) =>
      unless @modal
        footnoteContent = $("[id='" + @footnoteId + "']").children().not(@options.hideFromContent)
        linkOffset = @el.offset()
        @modal = $("<div />", {
          id: @options.modalId
          html: footnoteContent.clone(),
          css: {
            position: "absolute",
            top: linkOffset.top,
            left: linkOffset.left + @el.outerWidth()
          }
        }).appendTo "body"

    @closeModal = (event) =>
      if @modal
        if @isHoveringFootnote(event)
          clearTimeout(@closeTimeout)
          @closeTimeout = null
        else
          unless @closeTimeout
            @closeTimeout = setTimeout (=>
              console.log "remove"
              @modal.remove()
              @modal = null
            ), @options.hideDelay

    @isHoveringFootnote = (event) ->
      @modal.is(event.target) || $(event.target).closest(@modal).length > 0 || event.target == @el[0]

    @initialize()

  $.inlineFootnote.defaultOptions = 
    hideDelay: 200,
    hideFromContent: "[rev=footnote]"
    modalId: "footnote_box"

  $.fn.inlineFootnote = (options) ->
    @each ->
      (new $.inlineFootnote(@, options));
)(jQuery)

