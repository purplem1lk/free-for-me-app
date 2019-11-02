class AuthController < ApplicationController
  def is_signed_in?
    if user_signed_in?
      render :json => {"signed_in" => true, "user" => current_user}.to_json()
    else
      render :json => {"signed_in" => false}.to_json()
    end
  end
end

# we want to send user signed in info as json, not text/xml/etc. if the user is signed in, we have a signed in as true, and the actual user object exists. and if they're not signed in, signed_in is false.
