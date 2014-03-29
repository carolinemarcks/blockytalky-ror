class AddCodeVersionToCodeUrl < ActiveRecord::Migration
  def change
      add_column :code_urls, :code_version, :integer
  end
end
