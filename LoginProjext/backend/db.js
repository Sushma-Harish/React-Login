const express = require("express")
const collection = require("./mongo")
const cors = require("cors")
const app = express()
const bcrypt = require('bcrypt');
const PORT = 5000;
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())



app.get("/",cors(),(req,res)=>{

})

// Define User schema

app.use(cors());
app.use(express.json());

// Register endpoint
app.post('/register', async (req, res) => {
  try {
    const { fullName, companyName, mobileNumber, username, password } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      fullName,
      companyName,
      mobileNumber,
      username,
      password: hashedPassword
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while registering the user' });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while logging in' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



