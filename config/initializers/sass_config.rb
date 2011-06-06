output_style = RAILS_ENV == "production" ? :compressed : :nested

Sass::Plugin.options[:style] = output_style