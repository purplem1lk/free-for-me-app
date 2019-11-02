Aws.config.update({
  region: 'us-east-1', #NOTE: Your region may differ
  credentials: Aws::Credentials.new(ENV['AWS_ACCESS_KEY_ID'], ENV['AWS_SECRET_ACCESS_KEY'])
  })
  S3_BUCKET = Aws::S3::Resource.new.bucket(ENV['S3_BUCKET'])

#This is needed to set up an initial configuration for AWS since it's a different call than Carrierwave.
