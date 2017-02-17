class CreatePeople < ActiveRecord::Migration[5.0]
  def change
    create_table :people do |t|
      t.string :action_network_id, null: false, unique: true
      t.boolean :checked_out, default: false
      t.timestamps
    end
    add_index :people, :action_network_id, unique: true
  end
end
