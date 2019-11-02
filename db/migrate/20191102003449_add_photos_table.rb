class AddPhotosTable < ActiveRecord::Migration[5.2]
  def change
    create_table :photos do |t|
      t.belongs_to :listing
      
      t.timestamps
    end
  end
end
