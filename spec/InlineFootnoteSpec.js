describe("jquery.inlineFootnote", function() {
  describe("without nested backlinks", function() {
    beforeEach(function() {
      $("#example").html('<p>Sed lacinia tortor vel ligula dictum lobortis. Vestibulum vestibulum est ac eros lacinia hendrerit <sup id="fnref:1"><a href="#fn:1" rel="footnote">1</a></sup>.</p><div class="footnotes"> <hr> <ol> <li id="fn:1"><p>Footnotes content <em>1</em>.</p><a href="#fnref:1" rev="footnote">↩</a></li></ol></div>');
      $("[rel=footnote]").inlineFootnote();
      $("sup[id='fnref:1'] a").mouseenter();
    });

    // Needed to clear the state.
    afterEach(function() {
      $("sup[id='fnref:1'] a").mouseleave();
    });

    describe("when user hovers footnote", function() {
      it("shows a footnote box", function() {
        var box = $("#footnote_box");
        expect(box.is(":visible")).toBeTruthy();
      });

      it("shows correct content in the footnote box (removes the back link)", function() {
        $("sup[id='fnref:1'] a").mouseenter();
        var box = $("#footnote_box");
        expect(box.html()).toEqual("<p>Footnotes content <em>1</em>.</p>");
      });
    });
  });

  describe("with nested backlinks", function() {
    beforeEach(function() {
      $("#example").html('<p>Sed lacinia tortor vel ligula dictum lobortis. Vestibulum vestibulum est ac eros lacinia hendrerit <sup id="fnref:2"><a href="#fn:2" rel="footnote">2</a></sup></p><div class="footnotes"> <hr> <ol><li id="fn:2"><p>Footnotes content 2. <a href="#fnref:2" rev="footnote">↩</a></p></li></ol></div>');
      $("[rel=footnote]").inlineFootnote();
      $("sup[id='fnref:2'] a").mouseenter();
    });

    afterEach(function() {
      $("sup[id='fnref:2'] a").mouseleave();
    });

    describe("when user hovers footnote", function() {
      it("shows correct content in the footnote box", function() {
        var box = $("#footnote_box");
        setTimeout(function() {
          expect(box.html()).toEqual("<p>Footnotes content 2.</p>");
        }, 0);
      });
    });
  });
});
