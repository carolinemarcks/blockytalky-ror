class AddIndexToCodes < ActiveRecord::Migration
  def change
    add_index :codes, [:user_id, :created_at]
  end
end
