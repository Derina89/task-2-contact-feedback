const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

const PORT = 3000;


// ------------------------------
// Middleware
// ------------------------------

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ------------------------------
// Serve frontend files
// ------------------------------

app.use(express.static(path.join(__dirname, "public")));


// ------------------------------
// JSON data file
// ------------------------------

const dataFile = path.join(
    __dirname,
    "data",
    "submissions.json"
);


// Create data folder and file if needed
function ensureDataFile() {

    const dataFolder = path.dirname(dataFile);

    if (!fs.existsSync(dataFolder)) {
        fs.mkdirSync(dataFolder, { recursive: true });
    }

    if (!fs.existsSync(dataFile)) {
        fs.writeFileSync(
            dataFile,
            JSON.stringify([], null, 2)
        );
    }
}


// Read saved submissions
function readSubmissions() {

    ensureDataFile();

    const data = fs.readFileSync(
        dataFile,
        "utf8"
    );

    return JSON.parse(data);
}


// Save submissions
function saveSubmissions(submissions) {

    fs.writeFileSync(
        dataFile,
        JSON.stringify(submissions, null, 2)
    );
}


// ==============================
// GET /api/submissions
// ==============================

app.get("/api/submissions", (req, res) => {

    try {

        const submissions = readSubmissions();

        res.json({
            success: true,
            submissions: submissions
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Unable to read submissions."
        });

    }

});


// ==============================
// POST /api/contact
// ==============================

app.post("/api/contact", (req, res) => {

    const {
        name,
        email,
        message
    } = req.body;


    // Validate name

    if (!name || !name.trim()) {

        return res.status(400).json({
            success: false,
            message: "Name is required."
        });

    }


    // Validate email

    if (!email || !email.trim()) {

        return res.status(400).json({
            success: false,
            message: "Email is required."
        });

    }


    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email.trim())) {

        return res.status(400).json({
            success: false,
            message: "Please enter a valid email address."
        });

    }


    // Validate message

    if (!message || !message.trim()) {

        return res.status(400).json({
            success: false,
            message: "Message is required."
        });

    }


    if (message.trim().length < 10) {

        return res.status(400).json({
            success: false,
            message: "Message must contain at least 10 characters."
        });

    }


    // Save contact submission

    try {

        const submissions = readSubmissions();

        const newSubmission = {

            id: Date.now(),

            type: "contact",

            name: name.trim(),

            email: email.trim(),

            message: message.trim(),

            createdAt: new Date().toISOString()

        };


        submissions.push(newSubmission);

        saveSubmissions(submissions);


        res.status(201).json({

            success: true,

            message:
                "Your contact message was submitted successfully."

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: "Unable to save your message."

        });

    }

});


// ==============================
// POST /api/feedback
// ==============================

app.post("/api/feedback", (req, res) => {

    const {
        name,
        email,
        rating,
        message
    } = req.body;


    // Validate name

    if (!name || !name.trim()) {

        return res.status(400).json({
            success: false,
            message: "Name is required."
        });

    }


    // Validate email

    if (!email || !email.trim()) {

        return res.status(400).json({
            success: false,
            message: "Email is required."
        });

    }


    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email.trim())) {

        return res.status(400).json({
            success: false,
            message: "Please enter a valid email address."
        });

    }


    // Validate rating

    if (!rating) {

        return res.status(400).json({
            success: false,
            message: "Please select a rating."
        });

    }


    // Validate feedback message

    if (!message || !message.trim()) {

        return res.status(400).json({
            success: false,
            message: "Feedback message is required."
        });

    }


    // Save feedback

    try {

        const submissions = readSubmissions();

        const newSubmission = {

            id: Date.now(),

            type: "feedback",

            name: name.trim(),

            email: email.trim(),

            rating: Number(rating),

            message: message.trim(),

            createdAt: new Date().toISOString()

        };


        submissions.push(newSubmission);

        saveSubmissions(submissions);


        res.status(201).json({

            success: true,

            message:
                "Thank you! Your feedback was submitted."

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: "Unable to save your feedback."

        });

    }

});


// ==============================
// Start server
// ==============================

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});