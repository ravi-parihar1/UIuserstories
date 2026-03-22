// Hotel Reservation Management System JavaScript

// Global Variables
let currentUser = null;
let isAdmin = false;
let reservations = [];
let bookings = [];
let rooms = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Load data from localStorage
    loadDataFromStorage();
    
    // Check if user is logged in
    checkLoginStatus();
    
    // Initialize page-specific functionality
    initializePage();
}

function loadDataFromStorage() {
    // Load users
    const users = localStorage.getItem('hotelUsers');
    if (!users) {
        // Initialize with default admin user
        const defaultUsers = [
            {
                id: 1,
                username: 'admin',
                password: 'admin123',
                email: 'admin@hotel.com',
                firstName: 'Admin',
                lastName: 'User',
                role: 'admin'
            }
        ];
        localStorage.setItem('hotelUsers', JSON.stringify(defaultUsers));
    }
    
    // Load reservations
    const storedReservations = localStorage.getItem('hotelReservations');
    if (storedReservations) {
        reservations = JSON.parse(storedReservations);
    }
    
    // Load bookings
    const storedBookings = localStorage.getItem('hotelBookings');
    if (storedBookings) {
        bookings = JSON.parse(storedBookings);
    }
    
    // Load rooms
    const storedRooms = localStorage.getItem('hotelRooms');
    if (storedRooms) {
        rooms = JSON.parse(storedRooms);
    } else {
        // Initialize default rooms
        rooms = [
            { id: 101, type: 'Single', price: 100, status: 'available' },
            { id: 102, type: 'Single', price: 100, status: 'available' },
            { id: 201, type: 'Double', price: 150, status: 'available' },
            { id: 202, type: 'Double', price: 150, status: 'available' },
            { id: 301, type: 'Suite', price: 250, status: 'available' },
            { id: 302, type: 'Suite', price: 250, status: 'available' }
        ];
        localStorage.setItem('hotelRooms', JSON.stringify(rooms));
    }
}

function checkLoginStatus() {
    const loggedInUser = localStorage.getItem('hotelCurrentUser');
    if (loggedInUser) {
        currentUser = JSON.parse(loggedInUser);
        isAdmin = currentUser.role === 'admin';
        updateUIForLoggedInUser();
    }
}

function updateUIForLoggedInUser() {
    if (currentUser) {
        // Update welcome message
        const welcomeElements = document.querySelectorAll('.welcome-text');
        welcomeElements.forEach(element => {
            element.textContent = `Welcome ${currentUser.firstName}`;
        });
        
        // Show/hide admin-specific elements
        const adminElements = document.querySelectorAll('.admin-only');
        adminElements.forEach(element => {
            element.style.display = isAdmin ? 'block' : 'none';
        });
        
        const customerElements = document.querySelectorAll('.customer-only');
        customerElements.forEach(element => {
            element.style.display = !isAdmin ? 'block' : 'none';
        });
    }
}

// Registration Functions
function handleRegistration(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const userData = {
        id: Date.now(),
        username: formData.get('username'),
        password: formData.get('password'),
        email: formData.get('email'),
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        phone: formData.get('phone'),
        role: 'customer'
    };
    
    // Validate form data
    if (!validateRegistrationForm(userData)) {
        return;
    }
    
    // Check if username already exists
    const users = JSON.parse(localStorage.getItem('hotelUsers') || '[]');
    if (users.find(user => user.username === userData.username)) {
        showNotification('Username already exists!', 'error');
        return;
    }
    
    // Save new user
    users.push(userData);
    localStorage.setItem('hotelUsers', JSON.stringify(users));
    
    showNotification('Registration successful! Please login.', 'success');
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000);
}

function validateRegistrationForm(userData) {
    if (!userData.username || !userData.password || !userData.email || !userData.firstName || !userData.lastName) {
        showNotification('Please fill in all required fields!', 'error');
        return false;
    }
    
    if (userData.password.length < 6) {
        showNotification('Password must be at least 6 characters long!', 'error');
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
        showNotification('Please enter a valid email address!', 'error');
        return false;
    }
    
    return true;
}

// Login Functions
function handleLogin(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const password = formData.get('password');
    
    if (!username || !password) {
        showNotification('Please enter both username and password!', 'error');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('hotelUsers') || '[]');
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        currentUser = user;
        isAdmin = user.role === 'admin';
        localStorage.setItem('hotelCurrentUser', JSON.stringify(user));
        
        showNotification(`Login successful! Welcome ${user.firstName}`, 'success');
        
        // Redirect based on user role
        setTimeout(() => {
            if (isAdmin) {
                window.location.href = 'admin-home.html';
            } else {
                window.location.href = 'customer-home.html';
            }
        }, 1500);
    } else {
        showNotification('Invalid username or password!', 'error');
    }
}

// Logout Function
function handleLogout() {
    localStorage.removeItem('hotelCurrentUser');
    currentUser = null;
    isAdmin = false;
    
    showNotification('Logged out successfully!', 'success');
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1000);
}

// Reservation Functions
function handleReservation(event) {
    event.preventDefault();
    
    if (!currentUser) {
        showNotification('Please login to make a reservation!', 'error');
        return;
    }
    
    const formData = new FormData(event.target);
    const reservation = {
        id: Date.now(),
        userId: currentUser.id,
        username: currentUser.username,
        checkIn: formData.get('checkIn'),
        checkOut: formData.get('checkOut'),
        roomType: formData.get('roomType'),
        guests: formData.get('guests'),
        specialRequests: formData.get('specialRequests'),
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    
    // Validate dates
    if (new Date(reservation.checkIn) >= new Date(reservation.checkOut)) {
        showNotification('Check-out date must be after check-in date!', 'error');
        return;
    }
    
    reservations.push(reservation);
    localStorage.setItem('hotelReservations', JSON.stringify(reservations));
    
    showNotification('Reservation submitted successfully!', 'success');
    event.target.reset();
    
    // Update reservation display
    if (typeof displayReservations === 'function') {
        displayReservations();
    }
}

// Admin Reservation Management
function updateReservationStatus(reservationId, newStatus) {
    const reservation = reservations.find(r => r.id === reservationId);
    if (reservation) {
        reservation.status = newStatus;
        localStorage.setItem('hotelReservations', JSON.stringify(reservations));
        
        // Create booking if approved
        if (newStatus === 'approved') {
            createBookingFromReservation(reservation);
        }
        
        showNotification(`Reservation ${newStatus} successfully!`, 'success');
        displayReservations();
    }
}

function createBookingFromReservation(reservation) {
    // Find available room
    const availableRoom = rooms.find(r => r.type === reservation.roomType && r.status === 'available');
    
    if (availableRoom) {
        const booking = {
            id: Date.now(),
            reservationId: reservation.id,
            userId: reservation.userId,
            username: reservation.username,
            roomId: availableRoom.id,
            roomType: reservation.roomType,
            checkIn: reservation.checkIn,
            checkOut: reservation.checkOut,
            guests: reservation.guests,
            status: 'confirmed',
            createdAt: new Date().toISOString()
        };
        
        // Update room status
        availableRoom.status = 'occupied';
        localStorage.setItem('hotelRooms', JSON.stringify(rooms));
        
        bookings.push(booking);
        localStorage.setItem('hotelBookings', JSON.stringify(bookings));
    }
}

// Billing Functions
function generateBill(bookingId) {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) {
        showNotification('Booking not found!', 'error');
        return;
    }
    
    const room = rooms.find(r => r.id === booking.roomId);
    if (!room) {
        showNotification('Room not found!', 'error');
        return;
    }
    
    // Calculate nights and total amount
    const checkIn = new Date(booking.checkIn);
    const checkOut = new Date(booking.checkOut);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    const totalAmount = nights * room.price;
    
    const bill = {
        id: Date.now(),
        bookingId: booking.id,
        userId: booking.userId,
        username: booking.username,
        roomId: booking.roomId,
        roomType: booking.roomType,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        nights: nights,
        roomRate: room.price,
        totalAmount: totalAmount,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    
    // Save bill to localStorage
    const bills = JSON.parse(localStorage.getItem('hotelBills') || '[]');
    bills.push(bill);
    localStorage.setItem('hotelBills', JSON.stringify(bills));
    
    displayBillDetails(bill);
}

function displayBillDetails(bill) {
    const billDetails = document.getElementById('billDetails');
    if (billDetails) {
        billDetails.innerHTML = `
            <div class="card">
                <h3>Bill Details</h3>
                <div class="grid grid-2">
                    <div>
                        <p><strong>Bill ID:</strong> #${bill.id}</p>
                        <p><strong>Room:</strong> ${bill.roomType} (Room ${bill.roomId})</p>
                        <p><strong>Check-in:</strong> ${bill.checkIn}</p>
                        <p><strong>Check-out:</strong> ${bill.checkOut}</p>
                        <p><strong>Nights:</strong> ${bill.nights}</p>
                    </div>
                    <div>
                        <p><strong>Room Rate:</strong> $${bill.roomRate}/night</p>
                        <p><strong>Total Amount:</strong> $${bill.totalAmount}</p>
                        <p><strong>Status:</strong> <span class="status-badge status-pending">${bill.status}</span></p>
                    </div>
                </div>
                <div class="btn-group">
                    <button class="btn btn-success" onclick="processPayment(${bill.id})">Pay Now</button>
                    <button class="btn btn-secondary" onclick="printBill(${bill.id})">Print Bill</button>
                </div>
            </div>
        `;
    }
}

function processPayment(billId) {
    const bills = JSON.parse(localStorage.getItem('hotelBills') || '[]');
    const bill = bills.find(b => b.id === billId);
    
    if (bill) {
        bill.status = 'paid';
        bill.paidAt = new Date().toISOString();
        localStorage.setItem('hotelBills', JSON.stringify(bills));
        
        // Update room status to available
        const booking = bookings.find(b => b.id === bill.bookingId);
        if (booking) {
            const room = rooms.find(r => r.id === booking.roomId);
            if (room) {
                room.status = 'available';
                localStorage.setItem('hotelRooms', JSON.stringify(rooms));
            }
        }
        
        showNotification('Payment processed successfully!', 'success');
        showCheckoutNotification();
        
        // Redirect to home
        setTimeout(() => {
            window.location.href = 'customer-home.html';
        }, 3000);
    }
}

function showCheckoutNotification() {
    showNotification('Thank you for choosing us a trusted hotel. For more details contact the customer support', 'success');
}

// Display Functions
function displayReservations() {
    const container = document.getElementById('reservationsList');
    if (!container) return;
    
    let filteredReservations = reservations;
    
    // Filter by user if not admin
    if (!isAdmin && currentUser) {
        filteredReservations = reservations.filter(r => r.userId === currentUser.id);
    }
    
    if (filteredReservations.length === 0) {
        container.innerHTML = '<p>No reservations found.</p>';
        return;
    }
    
    let html = '<div class="table-container"><table>';
    html += '<thead><tr>';
    html += '<th>ID</th><th>User</th><th>Room Type</th><th>Check-in</th><th>Check-out</th><th>Guests</th><th>Status</th>';
    if (isAdmin) {
        html += '<th>Actions</th>';
    }
    html += '</tr></thead><tbody>';
    
    filteredReservations.forEach(reservation => {
        html += '<tr>';
        html += `<td>${reservation.id}</td>`;
        html += `<td>${reservation.username}</td>`;
        html += `<td>${reservation.roomType}</td>`;
        html += `<td>${reservation.checkIn}</td>`;
        html += `<td>${reservation.checkOut}</td>`;
        html += `<td>${reservation.guests}</td>`;
        html += `<td><span class="status-badge status-${reservation.status}">${reservation.status}</span></td>`;
        
        if (isAdmin) {
            html += '<td>';
            if (reservation.status === 'pending') {
                html += `<button class="btn btn-success" onclick="updateReservationStatus(${reservation.id}, 'approved')">Approve</button>`;
                html += `<button class="btn btn-danger" onclick="updateReservationStatus(${reservation.id}, 'rejected')">Reject</button>`;
            }
            html += '</td>';
        }
        
        html += '</tr>';
    });
    
    html += '</tbody></table></div>';
    container.innerHTML = html;
}

function displayBookings() {
    const container = document.getElementById('bookingsList');
    if (!container) return;
    
    let filteredBookings = bookings;
    
    // Filter by user if not admin
    if (!isAdmin && currentUser) {
        filteredBookings = bookings.filter(b => b.userId === currentUser.id);
    }
    
    if (filteredBookings.length === 0) {
        container.innerHTML = '<p>No bookings found.</p>';
        return;
    }
    
    let html = '<div class="table-container"><table>';
    html += '<thead><tr>';
    html += '<th>Booking ID</th><th>Room</th><th>Check-in</th><th>Check-out</th><th>Guests</th><th>Status</th>';
    if (!isAdmin) {
        html += '<th>Actions</th>';
    }
    html += '</tr></thead><tbody>';
    
    filteredBookings.forEach(booking => {
        html += '<tr>';
        html += `<td>${booking.id}</td>`;
        html += `<td>${booking.roomType} (Room ${booking.roomId})</td>`;
        html += `<td>${booking.checkIn}</td>`;
        html += `<td>${booking.checkOut}</td>`;
        html += `<td>${booking.guests}</td>`;
        html += `<td><span class="status-badge status-${booking.status}">${booking.status}</span></td>`;
        
        if (!isAdmin) {
            html += '<td>';
            html += `<button class="btn btn-primary" onclick="generateBill(${booking.id})">Generate Bill</button>`;
            html += '</td>';
        }
        
        html += '</tr>';
    });
    
    html += '</tbody></table></div>';
    container.innerHTML = html;
}

function displayRoomStatus() {
    const container = document.getElementById('roomStatusList');
    if (!container) return;
    
    let html = '<div class="table-container"><table>';
    html += '<thead><tr>';
    html += '<th>Room Number</th><th>Type</th><th>Price/Night</th><th>Status</th><th>Actions</th>';
    html += '</tr></thead><tbody>';
    
    rooms.forEach(room => {
        html += '<tr>';
        html += `<td>${room.id}</td>`;
        html += `<td>${room.type}</td>`;
        html += `<td>$${room.price}</td>`;
        html += `<td><span class="status-badge status-${room.status}">${room.status}</span></td>`;
        html += '<td>';
        html += `<button class="btn btn-secondary" onclick="toggleRoomStatus(${room.id})">Toggle Status</button>`;
        html += '</td>';
        html += '</tr>';
    });
    
    html += '</tbody></table></div>';
    container.innerHTML = html;
}

function toggleRoomStatus(roomId) {
    const room = rooms.find(r => r.id === roomId);
    if (room) {
        room.status = room.status === 'available' ? 'maintenance' : 'available';
        localStorage.setItem('hotelRooms', JSON.stringify(rooms));
        displayRoomStatus();
        showNotification(`Room ${roomId} status updated to ${room.status}`, 'success');
    }
}

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification-popup notification-${type}`;
    notification.innerHTML = `
        <button class="notification-close" onclick="closeNotification(this)">&times;</button>
        <p>${message}</p>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 5000);
}

function closeNotification(button) {
    const notification = button.parentNode;
    if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
    }
}

// Utility Functions
function initializePage() {
    const currentPage = window.location.pathname.split('/').pop();
    
    switch(currentPage) {
        case 'registration.html':
            // Registration page specific initialization
            break;
        case 'login.html':
            // Login page specific initialization
            break;
        case 'customer-home.html':
        case 'admin-home.html':
            // Home page specific initialization
            updateUIForLoggedInUser();
            break;
        case 'reservation.html':
            displayReservations();
            break;
        case 'bookings.html':
            displayBookings();
            break;
        case 'room-status.html':
            displayRoomStatus();
            break;
        case 'billing.html':
            // Billing page specific initialization
            break;
        case 'history.html':
            displayBookings();
            break;
        case 'support.html':
            // Support page specific initialization
            break;
    }
}

// Navigation Functions
function navigateTo(page) {
    window.location.href = page;
}

// Form Validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#ff4757';
        } else {
            input.style.borderColor = '#e1e8ed';
        }
    });
    
    return isValid;
}

// Date validation
function validateDates(checkInId, checkOutId) {
    const checkIn = document.getElementById(checkInId);
    const checkOut = document.getElementById(checkOutId);
    
    if (!checkIn || !checkOut) return true;
    
    const checkInDate = new Date(checkIn.value);
    const checkOutDate = new Date(checkOut.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (checkInDate < today) {
        showNotification('Check-in date cannot be in the past!', 'error');
        return false;
    }
    
    if (checkOutDate <= checkInDate) {
        showNotification('Check-out date must be after check-in date!', 'error');
        return false;
    }
    
    return true;
}

// Print function
function printBill(billId) {
    window.print();
}

// Export functions for global access
window.handleRegistration = handleRegistration;
window.handleLogin = handleLogin;
window.handleLogout = handleLogout;
window.handleReservation = handleReservation;
window.updateReservationStatus = updateReservationStatus;
window.generateBill = generateBill;
window.processPayment = processPayment;
window.displayReservations = displayReservations;
window.displayBookings = displayBookings;
window.displayRoomStatus = displayRoomStatus;
window.toggleRoomStatus = toggleRoomStatus;
window.showNotification = showNotification;
window.closeNotification = closeNotification;
window.navigateTo = navigateTo;
window.validateForm = validateForm;
window.validateDates = validateDates;
window.printBill = printBill;
