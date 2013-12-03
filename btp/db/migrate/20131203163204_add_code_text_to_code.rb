class AddCodeTextToCode < ActiveRecord::Migration
  def change
    add_column :codes, :codetext, :string
  end
end
