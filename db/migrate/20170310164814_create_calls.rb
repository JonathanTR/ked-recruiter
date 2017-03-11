class CreateCalls < ActiveRecord::Migration[5.0]
  def change
    create_table :calls do |t|
      t.integer :person_id
      t.timestamps
    end
    add_foreign_key :calls, :people, on_delete: :cascade
  end
end
