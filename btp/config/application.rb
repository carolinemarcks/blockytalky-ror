require File.expand_path('../boot', __FILE__)

require 'rails/all'

if defined?(Bundler)
    # If you precompile assets before deploying to production, use this line
    Bundler.require(*Rails.groups(:assets => %w(development test)))
end

module Btp
    class Application < Rails::Application
        # Settings in config/environments/* take precedence over those specified here.
        # Application configuration should go into files in config/initializers
        # -- all .rb files in that directory are automatically loaded.

        # Custom directories with classes and modules you want to be autoloadable.
        config.autoload_paths += %W(#{config.root}/lib)

        # Activate observers that should always be running.
        # config.active_record.observers = :cacher, :garbage_collector, :forum_observer

        # Configure the default encoding used in templates for Ruby 1.9.
        config.encoding = "utf-8"

        # Configure sensitive parameters which will be filtered from the log file.
        config.filter_parameters += [:password]

        # Enable escaping HTML in JSON.
        config.active_support.escape_html_entities_in_json = true

        # Use SQL instead of Active Record's schema dumper when creating the database.
        # This is necessary if your schema can't be completely dumped by the schema dumper,
        # like if you have constraints or database-specific column types
        # config.active_record.schema_format = :sql

        config.active_record.whitelist_attributes = true

        # Enable the asset pipeline
        config.assets.enabled = true

        # Do not attempt to connect to the database during precompilation
        # see: https://devcenter.heroku.com/articles/rails-asset-pipeline#troubleshooting
        config.assets.initialize_on_precompile = false

        # Version of your assets, change this if you want to expire all your assets
        config.assets.version = '1.0'
    end
end
