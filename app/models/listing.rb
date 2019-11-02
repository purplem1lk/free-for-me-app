class Listing < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true
  validates :postal_code, presence: true

  belongs_to :user
  has_many :photos
end
