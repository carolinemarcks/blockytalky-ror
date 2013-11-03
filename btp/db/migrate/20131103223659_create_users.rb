class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.boolean :isTeacher
      t.string :email
      t.string :name
      t.string :school

      t.timestamps
    end
  end
end
