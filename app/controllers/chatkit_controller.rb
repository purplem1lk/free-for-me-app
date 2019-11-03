require 'chatkit'

class ChatkitController < ApplicationController
  def create_user
    chatkit = Chatkit::Client.new({
      instance_locator: "v1:us1:ac944341-a321-4e72-968c-e2e07aca10ac",
      ##cannot be in JS because of security reasons
      key: "84dcf86b-08c6-41ee-8d42-94a705ae818d:Z5op50re398qC0r+3D8epoielwkYkQVmcyJ54HCj8lU="
    })

      chatkit.create_user({
        id: params["id"],
        name: params["username"]
        ## check if params can be symbol and not quotes
      })
  end

  private

  def user_params
    params.require(:id, :username)
  end

end
