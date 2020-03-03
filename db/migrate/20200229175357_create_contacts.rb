class CreateContacts < ActiveRecord::Migration[6.0]
  def change
    create_table :contacts do |t|
      t.text :first_name
      t.text :last_name
      t.string :email
      t.string :phone

      t.timestamps
    end
  end
end
