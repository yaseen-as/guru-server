db dessighn code

title Mentorship Platform Schema

// define tables
users [icon: user, color: yellow]{
  id string pk
  username string
  email string
  password string
  role_id string
  team_id string
  firstName string
  lastName string
  profilePicture string
  phoneNumber string
  timezone string
  createdAt timestamp
  lastActive timestamp
  isVerified boolean
}

roles [icon: key, color: green]{
  id string pk
  role_name string
  description string
}

teams [icon: users, color: blue]{
  id string pk
  team_name string
  description string
}
mentor_profiles [icon: briefcase, color: purple] {
  
  user_id string
  title string
  bio string
  expertise string[]
  yearsOfExperience int
  hourlyRate float
  education string[]
  certifications string[]
  averageRating float
  totalRatings int
}
availabilities [icon: calendar, color: orange] {
  
  mentor_id string
  dayOfWeek int
  startTime string
  endTime string
  isRecurring boolean
  specificDate date
}
appointments [icon: clock, color: red] {
  
  mentor_id string
  student_id string
  startTime timestamp
  endTime timestamp
  status string
  topic string
  description string
  meetingLink string
  cancellationReason string
  cancelledBy string
  reminderSent boolean
}
ratings [icon: star, color: gold] {
  
  appointment_id string
  mentor_id string
  student_id string
  rating int
  review string
  isPublic boolean
}
notifications [icon: bell, color: teal] {
  
  recipient_id string
  type string
  title string
  message string
  relatedTo string
  onModel string
  isRead boolean
}






// define relationships
users.role_id > roles.id
users.team_id > teams.id
mentor_profiles.user_id > users.id
availabilities.mentor_id > users.id
appointments.mentor_id > users.id
appointments.student_id > users.id
ratings.appointment_id > appointments.id
ratings.mentor_id > users.id
ratings.student_id > users.id
notifications.recipient_id > users.id