class Api::V1::PhotosController < ApplicationController
  def index
    render json: { photos: Photo.all }
  end
end
