class CreateBtus < ActiveRecord::Migration
  def change
    create_table :btus do |t|
      t.string :id
      t.string :btuID

      t.timestamps
    end
  end
end
