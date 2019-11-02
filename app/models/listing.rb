class Listing < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true
  validates :postal_code, presence: true

  mount_uploaders :photo_urls, PhotoUploader

  belongs_to :user
  has_many :photo_urls
end
