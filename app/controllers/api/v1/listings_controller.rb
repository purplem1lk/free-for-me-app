class Api::V1::ListingsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: { listings: Listing.all, user: user_signed_in? }
  end

  def show
    render json: { listing: Listing.find(params["id"]) }
  end

  def create
    if user_signed_in?
      new_listing = Listing.new(listing_params)
      new_listing.user = current_user
      if new_listing.save
        render json: new_listing
      else
        render json: new_listing.errors
      end

    else
      render json: { user: "You must be signed in to add a listing." }
    end
  end

  private

  def listing_params
    params.require(:listing).permit(:title, :description, :postal_code)
  end

end
