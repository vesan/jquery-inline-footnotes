describe("jquery.inlineFootnote", function() {
  beforeEach(function() {
    $('<p>Sed lacinia tortor vel ligula dictum lobortis. Vestibulum vestibulum est ac eros lacinia hendrerit <sup id="fnref:1"><a href="#fn:1" rel="footnote">1</a></sup>.</p><div class="footnotes"> <hr> <ol> <li id="fn:1"><p>Footnotes content 1.</p><a href="#fnref:1" rev="footnote">↩</a></li></ol></div>').appendTo("body")
    $("[rel=footnote]").inlineFootnote();
  });

  describe("when user hovers footnote", function() {
    beforeEach(function() {
      $("sup a").mouseenter();
    });

    it("shows a modal box", function() {
      var modal = $("#footnote_box");
      expect(modal.is(":visible")).toBeTruthy();
    });

    it("shows correct content in the modal box (removes the back link)", function() {
      var modal = $("#footnote_box");
      console.log(modal.html());
      expect(modal.html()).toEqual("<p>Footnotes content 1.</p>");
    });
  });
});

