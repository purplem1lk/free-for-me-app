class AddPhotoUrlsToListings < ActiveRecord::Migration[5.2]
  def change
    add_column :listings, :photo_urls, :string
  end
end
