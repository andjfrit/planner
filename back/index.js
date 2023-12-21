const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
app.use(cors());
const Day = require('./models/day'); // Assuming you have a Day model
app.use(express.json()); // for parsing application/json
const dayRoutes = require('./routes/day'); // Adjust the path as necessary
app.use(dayRoutes);
app.use('/api/days', dayRoutes); // Example route



mongoose.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
}).on('error', (error) => {
  console.log('Connection error:', error);
});

function generateMonthDays() {
    const year = new Date().getFullYear();
    const month = new Date().getMonth(); // 0 for January, 1 for February, etc.
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dates =  Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1));
    const endOfMonth = new Date(year, month, daysInMonth);

    // Add days to include the first week of the next month
    let nextMonthDay = new Date(endOfMonth);
    while (nextMonthDay.getDay() !== 0) { // 0 is Sunday
        nextMonthDay.setDate(nextMonthDay.getDate() + 1);
        dates.push(new Date(nextMonthDay));
    }

    return dates;


}

async function createDayRecordsIfNeeded() {
    const days = generateMonthDays();

    for (const day of days) {
        const dateStr = day.toISOString().split('T')[0]; // Format date to YYYY-MM-DD
        let dayRecord = await Day.findOne({ date: dateStr });

        if (!dayRecord) {
            dayRecord = new Day({ date: dateStr, hours: [] }); // Assuming 'hours' is part of your schema
            await dayRecord.save();
        }
    }

    console.log("Monthly day records checked/created.");
}



    app.post('/create-day-records', async (req, res) => {
        try {
            await createDayRecordsIfNeeded();
            res.status(200).send('Day records created/updated successfully.');
        } catch (error) {
            console.error('Error creating day records:', error);
            res.status(500).send('Error creating day records');
        }
    });


    const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});