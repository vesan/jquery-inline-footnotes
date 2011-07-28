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
        @positionModal()

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

    @positionModal = ->
      modalHorizontalPadding = parseInt(@modal.css("padding-left")) + parseInt(@modal.css("padding-right"))
      linkLeftOffset = @el.offset().left
      windowWidth = $(window).width()

      if (windowWidth / 2) > linkLeftOffset
        # Position box right of the link
        boxLeft = linkLeftOffset + 20

        boxWidth = windowWidth - boxLeft - modalHorizontalPadding - @options.boxMargin * 2
        if boxWidth > @options.maximumBoxWidth
          boxWidth = @options.maximumBoxWidth

      else
        # Position box left of the link
        boxWidth = linkLeftOffset - modalHorizontalPadding - @options.boxMargin * 2
        if boxWidth > @options.maximumBoxWidth
          boxWidth = @options.maximumBoxWidth

        boxLeft = linkLeftOffset - boxWidth - @options.boxMargin * 2


      @modal.css(
        width: boxWidth
        left: boxLeft
      )

    @initialize()

  $.inlineFootnote.defaultOptions = 
    boxMargin: 20
    hideDelay: 200
    hideFromContent: "[rev=footnote]"
    maximumBoxWidth: 500
    modalId: "footnote_box"

  $.fn.inlineFootnote = (options) ->
    @each ->
      (new $.inlineFootnote(@, options));
)(jQuery)

