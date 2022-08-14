# Source

source "https://rubygems.org"



# Jekyll
# https://pages.github.com/versions/

gem "jekyll", "~> 3.9.2"



# Plugins

group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.6"
  gem "jekyll-sitemap"
end



# Windows

install_if -> { RUBY_PLATFORM =~ %r!mingw|mswin|java! } do
  gem "tzinfo", "~> 1.2"
  gem "tzinfo-data"
end
gem "wdm", "~> 0.1.0", :install_if => Gem.win_platform?



# Markdown Parser & Highlighter

gem "kramdown-parser-gfm"
gem "rouge"



# HTTP Server

gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]
gem "webrick", "~> 1.7"