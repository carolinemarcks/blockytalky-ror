class AddDescriptionToCodes < ActiveRecord::Migration
  def change
    add_column :codes, :description, :string
  end
end
