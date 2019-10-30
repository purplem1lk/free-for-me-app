require 'spec_helper'

RSpec.describe Listing, type: :model do
  before do
    @user = FactoryBot.create(:user)
    @listing = FactoryBot.create(:listing)
  end

  subject { @listing }

  it { should have_valid(:title).when("Test Listing") }
  it { should_not have_valid(:title).when(nil, "") }

  it { should have_valid(:description).when("123 Example Ave.") }
  it { should_not have_valid(:description).when(nil, "") }

  it { should have_valid(:postal_code).when("02111") }
  it { should_not have_valid(:postal_code).when(nil, "") }
end
