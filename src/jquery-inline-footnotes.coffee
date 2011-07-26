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
        footnoteContent = $("[id='" + @footnoteId + "']").children().not("[rev=footnote]")
        linkOffset = @el.offset()
        @modal = $("<div />", {
          id: "footnote_modal",
          html: footnoteContent,
          css: {
            position: "absolute",
            top: linkOffset.top,
            left: linkOffset.left + @el.outerWidth()
          }
        }).appendTo "body"

    @closeModal = (event) =>
      if @modal
        if @hoveringFootnote(event)
          if @closeTimeout
            clearTimeout(@closeTimeout)
            @closeTimeout = null
        else
          unless @closeTimeout
            @closeTimeout = setTimeout (=>
              console.log "remove"
              @modal.remove()
              @modal = null
            ), @options.hidingDelay

    @hoveringFootnote = (event) ->
      @modal.is(event.target) || $(event.target).closest(@modal).length > 0 || event.target == @el[0]

    @initialize()

  $.inlineFootnote.defaultOptions = 
    hidingDelay: 200

  $.fn.inlineFootnote = (options) ->
    @each ->
      (new $.inlineFootnote(@, options));
)(jQuery)

