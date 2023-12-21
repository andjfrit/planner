const mongoose = require('mongoose');

const hourSchema = new mongoose.Schema({
  hour: String, // Representing the hour of the day (e.g., "08:00", "09:00")
  tasks: [String] // Array of tasks or appointments for this hour
});

const daySchema = new mongoose.Schema({
  date: Date, // Represents the specific day
  hours: [hourSchema] // Array of hour objects for the day
});

const Day = mongoose.model('Day', daySchema);

module.exports = Day;
