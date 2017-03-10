class ChangeCheckedOutToDatetime < ActiveRecord::Migration[5.0]
  def change
    remove_column :people, :checked_out, :boolean
    add_column :people, :checked_out_at, :timestamp
  end
end
