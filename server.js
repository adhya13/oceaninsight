const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const path = require('path'); // Import path module

const app = express();

// MySQL Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',               // Ensure this is your correct username
    password: '271123Aryan@23', // Your MySQL password
    database: 'mydatabase'      // Change this to the name of the database you just created
});


// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to the MySQL database.');
});

// Secret for JWT
const secret = 'your_jwt_secret_key';

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory

// Validation Middleware for Signup
const signupValidation = [
    body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long.'),
    body('email').isEmail().withMessage('Please provide a valid email address.'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
];

// Sample endpoint to handle sign-up
app.post('/signup', signupValidation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    // Hash the password
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({ message: 'Error hashing password', error: err });
        }

        // Store user data in the database with the hashed password
        const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        db.query(query, [username, email, hash], (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Error during sign-up', error: err });
            }
            res.status(201).json({ message: 'User signed up successfully!', user: { username, email } });
        });
    });
});

// Sample endpoint for login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ?';

    db.query(query, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error during login', error: err });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = results[0];

        // Compare the password with the hashed password
        bcrypt.compare(password, user.password, (err, match) => {
            if (err) {
                return res.status(500).json({ message: 'Error comparing passwords', error: err });
            }
            if (!match) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            // Generate a JWT token
            const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1h' });

            return res.json({ message: 'Login successful!', token });
        });
    });
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

