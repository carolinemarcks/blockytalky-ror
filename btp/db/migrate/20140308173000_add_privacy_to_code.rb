class AddPrivacyToCode < ActiveRecord::Migration
  def change
    add_column :codes, :privacy, :string
  end
end
