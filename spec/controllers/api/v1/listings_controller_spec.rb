require "rails_helper"

RSpec.describe Api::V1::ListingsController, type: :controller do
  let!(:user) { User.create(
    username: 'testingaccount',
    email: 'testing@test.com',
    password: 'abc123'
  ) }

  let!(:listing) { Listing.create(
    title: 'Test Listing',
    description: 'Giving away all the test listings',
    postal_code: '02111',
    user: user
    ) }

  describe "GET#index" do
    it "should return a list of all of the listings" do
      user = FactoryBot.create(:user)
      sign_in user

      get :index
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["listings"][0]["title"]).to eq 'Test Listing'
      expect(returned_json["listings"][0]["description"]).to eq 'Giving away all the test listings'
      expect(returned_json["listings"][0]["postal_code"]).to eq '02111'
    end
  end
end
