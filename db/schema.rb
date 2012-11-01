# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20121028121559) do

  create_table "air_functions", :force => true do |t|
    t.string   "name"
    t.string   "symbol"
    t.string   "code"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "aircraft_classes", :force => true do |t|
    t.string   "name"
    t.string   "aircrafttype"
    t.string   "country"
    t.string   "image"
    t.integer  "observationair"
    t.integer  "observationsurf"
    t.integer  "observationunder"
    t.integer  "fireair"
    t.integer  "fireland"
    t.integer  "firesurf"
    t.integer  "fireunder"
    t.integer  "maxspeed"
    t.integer  "cruisespeed"
    t.integer  "crew"
    t.string   "function"
    t.text     "note"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "articles", :force => true do |t|
    t.string   "title"
    t.text     "body"
    t.datetime "published_at"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "excerpt"
    t.string   "location"
    t.integer  "user_id"
  end

  create_table "articles_categories", :id => false, :force => true do |t|
    t.integer "article_id"
    t.integer "category_id"
  end

  create_table "categories", :force => true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "comments", :force => true do |t|
    t.integer  "article_id"
    t.string   "name"
    t.string   "email"
    t.text     "body"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "geoscircles", :force => true do |t|
    t.string   "name"
    t.float    "lat"
    t.float    "lng"
    t.integer  "radius"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "geoscircles_geosmaps", :id => false, :force => true do |t|
    t.integer "geoscircle_id"
    t.integer "geosmap_id"
  end

  create_table "geoscois", :force => true do |t|
    t.string   "name"
    t.text     "note"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "geoscois_geosmaps", :id => false, :force => true do |t|
    t.integer "geoscoi_id"
    t.integer "geosmap_id"
  end

  create_table "geoscois_users", :id => false, :force => true do |t|
    t.integer "geoscoi_id"
    t.integer "user_id"
  end

  create_table "geosconnections", :force => true do |t|
    t.string   "email"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "geosmaps", :force => true do |t|
    t.float    "centerlat"
    t.float    "centerlng"
    t.string   "name"
    t.integer  "zoom"
    t.string   "maptype"
    t.string   "milflag"
    t.integer  "user_id"
    t.text     "note"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "geosmaps_geosmarkers", :id => false, :force => true do |t|
    t.integer "geosmap_id"
    t.integer "geosmarker_id"
  end

  create_table "geosmaps_geospolygons", :id => false, :force => true do |t|
    t.integer "geosmap_id"
    t.integer "geospolygon_id"
  end

  create_table "geosmaps_geospolylines", :id => false, :force => true do |t|
    t.integer "geosmap_id"
    t.integer "geospolyline_id"
  end

  create_table "geosmaps_geosrectangles", :id => false, :force => true do |t|
    t.integer "geosmap_id"
    t.integer "geosrectangle_id"
  end

  create_table "geosmaps_tracks", :id => false, :force => true do |t|
    t.integer "geosmap_id"
    t.integer "track_id"
  end

  create_table "geosmaps_users", :id => false, :force => true do |t|
    t.integer "geosmap_id"
    t.integer "user_id"
  end

  create_table "geosmarkers", :force => true do |t|
    t.string   "name"
    t.float    "lat"
    t.float    "lng"
    t.string   "icon"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "address"
  end

  create_table "geospolygons", :force => true do |t|
    t.string   "name"
    t.string   "geometry"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "geospolylines", :force => true do |t|
    t.string   "name"
    t.string   "geometry"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "geosrectangles", :force => true do |t|
    t.string   "name"
    t.float    "latSW"
    t.float    "lngSW"
    t.float    "latNE"
    t.float    "lngNE"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "ground_functions", :force => true do |t|
    t.string   "name"
    t.string   "symbol"
    t.string   "code"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "profiles", :force => true do |t|
    t.integer  "user_id"
    t.string   "name"
    t.date     "birthday"
    t.text     "bio"
    t.string   "color"
    t.string   "twitter"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "seasub_functions", :force => true do |t|
    t.string   "name"
    t.string   "symbol"
    t.string   "code"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "seasurf_functions", :force => true do |t|
    t.string   "name"
    t.string   "symbol"
    t.string   "code"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "sessions", :force => true do |t|
    t.string   "session_id", :null => false
    t.text     "data"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "sessions", ["session_id"], :name => "index_sessions_on_session_id"
  add_index "sessions", ["updated_at"], :name => "index_sessions_on_updated_at"

  create_table "ship_classes", :force => true do |t|
    t.string   "name"
    t.string   "shiptype"
    t.string   "country"
    t.string   "image"
    t.integer  "observationair"
    t.integer  "observationsurf"
    t.integer  "observationunders"
    t.integer  "fireair"
    t.integer  "fireland"
    t.integer  "firesurf"
    t.integer  "fireunder"
    t.integer  "maxspeed"
    t.integer  "cruisespeed"
    t.integer  "crew"
    t.string   "function"
    t.text     "note"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "sub_classes", :force => true do |t|
    t.string   "name"
    t.string   "subtype"
    t.string   "country"
    t.string   "image"
    t.integer  "observationair"
    t.integer  "observationsurf"
    t.integer  "observationunder"
    t.integer  "fireair"
    t.integer  "fireland"
    t.integer  "firesurf"
    t.integer  "fireunder"
    t.integer  "maxspeed"
    t.integer  "cruisespeed"
    t.integer  "crew"
    t.string   "function"
    t.text     "note"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "tracks", :force => true do |t|
    t.float    "lat"
    t.float    "long"
    t.string   "cstId"
    t.string   "cstName"
    t.string   "icon"
    t.string   "category"
    t.decimal  "course"
    t.decimal  "speed"
    t.datetime "postime"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "size"
    t.integer  "height"
    t.integer  "platform_id"
    t.integer  "report_to"
    t.integer  "function_id"
    t.string   "function_txt"
  end

  create_table "users", :force => true do |t|
    t.string   "email"
    t.string   "hashed_password"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "name"
    t.integer  "geosmap_id"
  end

  create_table "vehicle_models", :force => true do |t|
    t.string   "name"
    t.string   "vehicletype"
    t.string   "country"
    t.string   "image"
    t.integer  "observation"
    t.integer  "fireair"
    t.integer  "fireland"
    t.integer  "maxspeed"
    t.integer  "cruisespeed"
    t.integer  "crew"
    t.string   "function"
    t.text     "note"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
