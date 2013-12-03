class AddCodeTextToCode < ActiveRecord::Migration
  def change
    add_column :codes, :codetext, :blob
  end
end
