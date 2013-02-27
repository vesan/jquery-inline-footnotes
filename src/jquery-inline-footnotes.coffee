(($)->
  $.inlineFootnote = (el, options) ->
    @el = $(el);

    @el.data("inlineFootnote", @);

    @initialize = ->
      @options = $.extend {}, $.inlineFootnote.defaultOptions, options

      @footnoteId = @el.attr("href").match(/#(.*)/)[1]

      if(@footnoteId)
        @el.mouseenter @openBox
        $("body").mousemove @closeBox

    @openBox = (event) =>
      unless @box
        footnoteContent = $("[id='" + @footnoteId + "']").find(":not(#{@options.hideFromContent})")
        linkOffset = @el.offset()
        @box = $("<div />", {
          id: @options.boxId,
          html: footnoteContent.clone(),
          css: {
            position: "absolute",
            top: linkOffset.top,
            left: linkOffset.left + @el.outerWidth()
          }
        }).appendTo "body"
        @positionBox()

    @closeBox = (event) =>
      if @box
        if @isHoveringFootnote(event)
          clearTimeout(@closeTimeout)
          @closeTimeout = null
        else
          unless @closeTimeout
            @closeTimeout = setTimeout (=>
              @box.remove()
              @box = null
            ), @options.hideDelay

    @isHoveringFootnote = (event) ->
      @box.is(event.target) || $(event.target).closest(@box).length > 0 || event.target == @el[0]

    @positionBox = ->
      boxHorizontalPadding = parseInt(@box.css("padding-left")) + parseInt(@box.css("padding-right"))
      linkLeftOffset = @el.offset().left
      windowWidth = $(window).width()

      if (windowWidth / 2) > linkLeftOffset
        # Position box right of the link
        boxLeft = linkLeftOffset + 20

        boxWidth = windowWidth - boxLeft - boxHorizontalPadding - @options.boxMargin * 2
        if boxWidth > @options.maximumBoxWidth
          boxWidth = @options.maximumBoxWidth

      else
        # Position box left of the link
        boxWidth = linkLeftOffset - boxHorizontalPadding - @options.boxMargin * 2
        if boxWidth > @options.maximumBoxWidth
          boxWidth = @options.maximumBoxWidth

        boxLeft = linkLeftOffset - boxWidth - @options.boxMargin * 2


      @box.css(
        width: boxWidth
        left: boxLeft
      )

    @initialize()

  $.inlineFootnote.defaultOptions = 
    boxMargin: 20
    hideDelay: 200
    hideFromContent: "[rev=footnote]"
    maximumBoxWidth: 500
    boxId: "footnote_box"

  $.fn.inlineFootnote = (options) ->
    @each ->
      (new $.inlineFootnote(@, options));
)(jQuery)

