Backend Setup
bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Setup environment variables
Create .env file with:
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASS=your_mysql_password
DB_NAME=event_booking
PORT=5000

# Start backend server
npm start

Frontend Setup
bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start React development server
npm start

🗄️ Database Schema
Events Table
sql
CREATE TABLE events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(255),
  date DATETIME,
  total_seats INT,
  available_seats INT,
  price DECIMAL(10,2),
  img VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
Bookings Table
sql
CREATE TABLE bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  event_id INT,
  user_name VARCHAR(255),
  user_email VARCHAR(255),
  tickets INT,
  total_price DECIMAL(10,2),
  booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (event_id) REFERENCES events(id)
);
