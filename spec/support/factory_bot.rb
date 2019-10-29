require 'factory_bot'

FactoryBot.define do
  factory :user do
    username { 'testaccount' }
    sequence(:email) {|n| "user#{n}@example.com" }
    password { 'password' }
    password_confirmation { 'password' }
  end

  factory :listing do
    sequence(:title) { 'Extra Coffee Mugs' }
    description { 'I have too many extra coffee mugs, come pick up.' }
    postal_code { '02111' }
    user { User.first }
  end
end
