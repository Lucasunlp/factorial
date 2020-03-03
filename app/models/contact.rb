class Contact < ApplicationRecord
  validates :first_name, :last_name, :phone, :email, presence: true
  validates :email, uniqueness: true
end
