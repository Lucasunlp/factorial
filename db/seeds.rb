9.times do |i|
  Contact.create(
    first_name: "Contact #{i + 1}",
    last_name: "Contact surname #{i + 1}",
    email: 'lucas'"#{i + 1}"'@gmail.com',
    phone: '1234'
  )
end
