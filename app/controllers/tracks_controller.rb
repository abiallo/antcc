class TracksController < ApplicationController
  def new
    @track = Track.new
  end

end
