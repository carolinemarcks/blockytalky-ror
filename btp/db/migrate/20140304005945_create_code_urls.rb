class CreateCodeUrls < ActiveRecord::Migration
  def change
    create_table :code_urls, force: true do |t|
      t.string :guid, index: true
      t.references :code

      t.timestamps
    end
  end
end
