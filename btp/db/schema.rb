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

ActiveRecord::Schema.define(:version => 20140331181840) do

  create_table "btus", :force => true do |t|
    t.string   "btuID"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.integer  "user_id"
    t.string   "title"
  end

  create_table "code_urls", :force => true do |t|
    t.string   "guid"
    t.datetime "created_at",                       :null => false
    t.datetime "updated_at",                       :null => false
    t.binary   "codetext",   :limit => 2147483647
  end

  create_table "codes", :force => true do |t|
    t.datetime "created_at",                        :null => false
    t.datetime "updated_at",                        :null => false
    t.binary   "codetext",    :limit => 2147483647
    t.integer  "user_id"
    t.string   "title"
    t.string   "description"
    t.string   "privacy"
  end

  add_index "codes", ["user_id", "created_at"], :name => "index_codes_on_user_id_and_created_at"

  create_table "friendships", :force => true do |t|
    t.integer "friendable_id"
    t.integer "friend_id"
    t.integer "blocker_id"
    t.boolean "pending",       :default => true
  end

  add_index "friendships", ["friendable_id", "friend_id"], :name => "index_friendships_on_friendable_id_and_friend_id", :unique => true

  create_table "users", :force => true do |t|
    t.boolean  "isTeacher"
    t.string   "email"
    t.string   "name"
    t.string   "school"
    t.datetime "created_at",                             :null => false
    t.datetime "updated_at",                             :null => false
    t.string   "encrypted_password",     :default => "", :null => false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          :default => 0,  :null => false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "about_me"
  end

  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true

  create_table "versions", :force => true do |t|
    t.string   "item_type",  :null => false
    t.integer  "item_id",    :null => false
    t.string   "event",      :null => false
    t.string   "whodunnit"
    t.text     "object"
    t.datetime "created_at"
  end

  add_index "versions", ["item_type", "item_id"], :name => "index_versions_on_item_type_and_item_id"

end
