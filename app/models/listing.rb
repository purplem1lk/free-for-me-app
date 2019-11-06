class Listing < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true
  validates :postal_code, presence: true

  belongs_to :user

  include PgSearch
  pg_search_scope :search_by_listing_title, against: [:title, :postal_code]
end

# pg_search_scope says that something in the model is searchable, similar to an index of an column. ex: search_by_listing_title is the variable and pg_search_scope describes what it is. pg_search_scope is technically a function.
