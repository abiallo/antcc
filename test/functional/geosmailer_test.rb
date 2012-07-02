require 'test_helper'

class GeosmailerTest < ActionMailer::TestCase
  test "email_geoscontact" do
    mail = Geosmailer.email_geoscontact
    assert_equal "Email user", mail.subject
    assert_equal ["to@example.org"], mail.to
    assert_equal ["from@example.com"], mail.from
    assert_match "Hi", mail.body.encoded
  end

end
