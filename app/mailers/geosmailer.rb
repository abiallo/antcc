class Geosmailer < ActionMailer::Base
  default :from => "from@example.com"

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.geosmailer.email_geoscontact.subject
  #


  def email_geoscontact(receiver_email, sender_name, sender_email, subject, email_body)
   @sender_name = sender_name
   @email_body = email_body
   mail :to => receiver_email, :reply_to=> sender_email, :subject=> subject, :from=> sender_email
  end
end
