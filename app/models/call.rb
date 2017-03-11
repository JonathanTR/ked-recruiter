class Call < ApplicationRecord
  belongs_to :person
  validates :person_id, presence: true
end
