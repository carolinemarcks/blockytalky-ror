class AddSensor1AndSensor2AndSensor3AndSensor4ToCode < ActiveRecord::Migration
  def change
    add_column :codes, :sensor1, :string
    add_column :codes, :sensor2, :string
    add_column :codes, :sensor3, :string
    add_column :codes, :sensor4, :string
  end
end
