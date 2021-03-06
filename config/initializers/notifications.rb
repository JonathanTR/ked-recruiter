# If someone triggers our request throttler, log it so we can find them
ActiveSupport::Notifications.subscribe("rack.attack") do |name, start, finish, request_id, req|
  if req.env['rack.attack.match_type'] == :throttle
    Rails.logger.info "Throttled IP: #{req.ip}"
  end
end