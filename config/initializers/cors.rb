Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'localhost:3000'
    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end


# CORS policy is what blocks out outside requests from hitting their API. CORS lets you gate APIs, where you can only hit them from certain places. this all executes once the rails server starts.
