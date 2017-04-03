class Rack::Attack
  # Use ActiveSupport MemoryStore for caching. Note: this will have to change to
  # a service like Redis if we scale beyond a single machine.
  Rack::Attack.cache.store = ActiveSupport::Cache::MemoryStore.new

  # Whitelist localhost from throttling
  whitelist('allow-localhost') do |req|
    '127.0.0.1' == req.ip || '::1' == req.ip
  end

  # Set throttle for requests that pass through to ActionNetwork API
  throttle('req/ip', limit: 1, period: 20) do |req|
    req.ip if req.path == '/people' && req.get?
  end

  # Set response when user exceeds request limit
  self.throttled_response = ->(env) {
    retry_after = (env['rack.attack.match_data'] || {})[:period]
    [
      429,
      {'Content-Type' => 'application/json', 'Retry-After' => retry_after.to_s},
      [{error: "Throttle limit reached. Retry after 20 seconds."}.to_json]
    ]
  }
end