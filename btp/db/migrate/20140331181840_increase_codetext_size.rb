class IncreaseCodetextSize < ActiveRecord::Migration
    def change
        change_column :codes, :codetext, :binary, :limit => 16.megabyte
    end
end
