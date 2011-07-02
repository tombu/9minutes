output_style = ::Rails.env == "production" ? :compressed : :nested

Sass::Plugin.options[:style] = output_style