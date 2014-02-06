class AddTitleToBtus < ActiveRecord::Migration
  def change
    add_column :btus, :title, :string
  end
end
