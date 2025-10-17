CREATE DATABASE IF NOT EXISTS event_booking;
USE event_booking;

CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255) NOT NULL,
    date DATETIME NOT NULL,
    total_seats INT NOT NULL,
    available_seats INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    img VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    mobile VARCHAR(20),
    quantity INT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('confirmed', 'cancelled', 'pending') DEFAULT 'confirmed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

INSERT INTO events (title, description, location, date, total_seats, available_seats, price, img) VALUES
('Tech Conference 2025', 'Join the biggest tech conference of the year with industry leaders sharing insights on AI, ML, and future technologies.', 'New York', '2025-11-20 09:00:00', 100, 45, 2999, '/assets/tech.png'),
('Art Exhibition', 'Experience the world of colors, creativity, and imagination at our Art Exhibition!', 'San Francisco', '2025-12-05 10:00:00', 50, 15, 1999, '/assets/art.png'),
('Music Concert', 'Feel the rhythm, lose yourself in the beats, join us for an unforgettable Music Concert!', 'Online', '2025-12-15 18:00:00', 200, 0, 1499, '/assets/music.png'),
('Dance Battle', 'Clash of moves, fire of rhythm, witness the ultimate Dance Battle where every step tells a story!', 'New York', '2025-11-25 14:00:00', 80, 5, 2499, '/assets/dance.png'),
('Treasure Hunt', 'Decode the clues, chase the thrill, embark on an adventurous Treasure Hunt where only the sharpest minds win!', 'San Francisco', '2025-12-10 11:00:00', 60, 25, 1799, '/assets/treasure.png'),
('Gaming Tournament', 'Gear up, level up, and battle it out — join the ultimate Gaming Tournament for glory and victory!', 'Online', '2025-12-20 16:00:00', 150, 8, 1299, '/assets/gaming.png');