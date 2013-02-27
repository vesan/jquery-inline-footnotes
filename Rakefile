# encoding: utf-8

require 'uglifier'
require 'tempfile'

VERSION = "1.0.2"

task :default => [:minify]

task :minify => :compile do
  compiled_path = File.join(File.dirname(__FILE__), "compiled", "jquery-inline-footnotes.js")
  minified_path = File.join(File.dirname(__FILE__), "compiled", "jquery-inline-footnotes-min.js")

  File.open(minified_path, "w") do |f|
    f.write(
      Uglifier.compile(
        File.read(compiled_path), 
        mangle: false,
        copyright: true
      )
    )
  end
end

task :compile do
  file_path = File.join(File.dirname(__FILE__), "src", "jquery-inline-footnotes.coffee")
  compiled_path = File.join(File.dirname(__FILE__), "compiled", "jquery-inline-footnotes.js")
  `coffee -c -o compiled #{file_path}`

  # Add copyright notice
 copyright_notice = <<-END
// jQuery Inline Footnotes v#{VERSION}
// Copyright (c) 2011 Vesa Vänskä, released under the MIT License.

  END

  Tempfile.open File.basename(compiled_path) do |tempfile|
    tempfile << copyright_notice

    File.open(compiled_path, 'r+') do |file|
      tempfile << file.read
      file.pos = tempfile.pos = 0
      file << tempfile.read
    end
  end
end

