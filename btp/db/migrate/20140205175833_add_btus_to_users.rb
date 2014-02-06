class AddBtusToUsers < ActiveRecord::Migration
  def change
    add_column :btus, :user_id, :integer
  end
end
