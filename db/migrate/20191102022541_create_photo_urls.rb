class CreatePhotoUrls < ActiveRecord::Migration[5.2]
  def change
    create_table :photo_urls do |t|
      t.belongs_to :listing

      t.timestamps
    end
  end
end
