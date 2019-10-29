class CreateListings < ActiveRecord::Migration[5.2]
  def change
    create_table :listings do |t|
      t.belongs_to :user, null: false

      t.string :title, null: false
      t.text :description, null: false
      t.string :postal_code, null: false

      t.timestamps
    end
  end
end
