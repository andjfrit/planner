const express = require('express');
const router = express.Router();
const Day = require('../models/day'); // Adjust the path according to your project structure


router.post('/add-task', async (req, res) => {
    try {
      const { date, task } = req.body;
      let day = await Day.findOne({ date: new Date(date) });
  
      if (!day) {
        day = new Day({ date: new Date(date), hours: [] });
      }
  
      // Assuming 'hours' is an array of objects { hour: String, tasks: [String] }
      day.hours.push({ hour: task.hour, tasks: [task.description] });
  
      await day.save();
      res.status(201).json(day);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });


router.post('/days', async (req, res) => {
    const newDay = new Day({
      date: req.body.date,
      hours: req.body.hours
    });
  
    try {
      const savedDay = await newDay.save();
      res.status(201).json(savedDay);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  

  router.get('/days/:date', async (req, res) => {
    try {
      const day = await Day.findOne({ date: req.params.date });
      if (!day) return res.status(404).json({ message: "Day not found" });
      res.json(day);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  

  router.put('/days/:date', async (req, res) => {
    try {
      const updatedDay = await Day.findOneAndUpdate(
        { date: req.params.date },
        { $set: req.body },
        { new: true } // Return the updated object
      );
      res.json(updatedDay);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  

  router.delete('/days/:date', async (req, res) => {
    try {
      const deletedDay = await Day.findOneAndDelete({ date: req.params.date });
      if (!deletedDay) return res.status(404).json({ message: "Day not found" });
      res.json({ message: "Day deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  module.exports = router;
