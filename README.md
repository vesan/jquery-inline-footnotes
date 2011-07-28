# jQuery Inline Footnotes

Allows users to hover footnotes to view the footnote content inline. Implemented as a jQuery plugin.

Works out of the box with Markdown style footnotes that many intrepreters implement (for example [Maruku](http://maruku.rubyforge.org/maruku.html#extra) and [PHP Markdown Extra](http://michelf.com/projects/php-markdown/extra/#footnotes)).

Demo can be seen at ...

TODO: Add picture.

## Dependencies

jQuery. Tested with 1.6.2 but probably works with older versions too.

## Supported Browsers

TODO

## Usage

```html
<!-- Example HTML -->
<p>
  Sentence.
  <sup id="fnref:1">
    <a href="#fn:1" rel="footnote">1</a>
  </sup>
</p>

<ol>
  <li id="fn:1">
    <p>
      Footnotes content 1.
    </p>
    <a href="#fnref:1" rev="footnote">↩</a>
  </li>
</ol>
```

```javascript
$("[rel=footnote]").inlineFootnote({
  // possible options
})
```

The selector given to $ is the selector for the links. The content to be shown is found by finding an element with `id` that matches the links `href` in this case `fn:1`. If the matching content has elements with attribute `rev` with value `footnote`, those will be hidden (can be changed with `hideFromContent` option.

Styling is done with CSS.

### Options

* *hideDelay*: The delay before hiding the footnote box after user moves mouse out of the link or footnote box. Defaults to 200.
* *hideFromContent*: Elements matching this selector are hidden when showing the footnote content inside the opened box. Defaults to "[rev=footnote]".
* *modalId*: Id applied to the footnote box. Defaults to "footnote_box"

## Development

jQuery Inline Footnotes is written with Coffee-Script. Tests are written with [Jasmine](http://pivotal.github.com/jasmine/). Open SpecRunner.html to run the tests.

## Author

Vesa Vänskä ~ @vesan

