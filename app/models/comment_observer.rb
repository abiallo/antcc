class CommentObserver < ActiveRecord::Observer
    def after_create(comment)
       puts "We will notify #{article.user.email} in Chapter 9"
    end
end
