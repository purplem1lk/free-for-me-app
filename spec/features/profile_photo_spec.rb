require "rails_helper"

feature "profile photo" do
  scenario "user uploads a profile photo" do
    visit root_path
    click_link "Sign Up"

    fill_in "Username:", with: "testaccount"
    fill_in "Email:", with: "ash@s-mart.com"
    fill_in "Password:", with: "boomstick!3vilisd3ad"
    fill_in "Password confirmation:", with: "boomstick!3vilisd3ad"
    attach_file "Upload Profile Photo", "#{Rails.root}/spec/support/images/oliver.jpg"
    click_button "Sign up"

    expect(page).to have_content("Sign Out")
    expect(page).to have_css("img[src*='oliver.jpg']")
  end
end
