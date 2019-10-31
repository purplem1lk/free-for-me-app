class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  mount_uploader :profile_photo, ProfilePhotoUploader

  validates :username, presence: true
  validates :password, length: { minimum: 6 }, on: :create

  has_many :listings
end
