class AddCodetextToCodeUrls < ActiveRecord::Migration
  def change
      add_column :code_urls, :codetext, :binary, :limit => 16.megabyte
      remove_column :code_urls, :code_version
      remove_column :code_urls, :code_id
  end
end
