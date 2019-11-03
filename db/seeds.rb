# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(
  username: "purplem1lk",
  email: "masusan29@gmail.com",
  password: "password"
)

User.create(
  username: "testaccount",
  email: "test@test.com",
  password: "password"
)

Listing.create(
  title: "Like New Kitchen Blender",
  description: "This kitchen blender was given to me as a gift, but has only been used a handful of times. Like new, many parts still in their original wrapping. Only previously used for fruit/veggie smoothies.",
  postal_code: "02111",
  photo: "https://images.unsplash.com/photo-1571942788045-dea101c00210?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1101&q=80",
  user_id: 1
)

Listing.create(
  title: "Toddler Toys",
  description: "Two trash bags full of toddler toys that have been sanitized and not used for a number of years. Toys include lego blocks, picture books, and many dragon plushies. Looking for a good home with kids to enjoy!",
  postal_code: "02119",
  photo: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1654&q=80",
  user_id: 1
)

Listing.create(
  title: "Extra Halloween Decorations: Outdoor Skeletons",
  description: "Our family will be moving to a smaller place and won't be able to use these outdoor skeletons for Halloween anymore! Looking to give these to a fun home who celebrates the holiday as much as we do.",
  postal_code: "02129",
  photo: "https://images.unsplash.com/photo-1509557965875-b88c97052f0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
  user_id: 1
)

Listing.create(
  title: "Office Chair - Lightly Used",
  description: "I have an extra office chair that was used a few times in my home office. I will be moving soon and do not plan to take this item with me. Must pick up from me directly, please!",
  postal_code: "02129",
  user_id: 2
)

Listing.create(
  title: "8 Foot Ladder with Grips",
  description: "I've acquired a new ladder so I will no be needing my older 8 foot ladder. This has grips for easy navigation, even after fairly regular use. Great for indoor or outdoor and stores great in a basement or garage. Looking to get rid of asap.",
  postal_code: "02205",
  user_id: 2
)

Listing.create(
  title: "Old Leather Couch",
  description: "Looking to get rid of an older leather couch for some new furniture. Size of a loveseat with minor scratches on the seats. Comes from a smoke-free, pet-free home.",
  postal_code: "02284",
  user_id: 2
)

Listing.create(
  title: "SO MUCH YARN",
  description: "Decluttering my grandma's house and found boxes and boxes of unused yarn. Hoping to give to a good home or crochet club that can re-use these items and find happy homes for them. Please bring your own bags/boxes, as the current ones have dirty bottoms. Please reach out if you have any questions, thanks!!",
  postal_code: "02293",
  user_id: 2
)
