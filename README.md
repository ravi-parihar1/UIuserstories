# Hotel Reservation Management System

A comprehensive hotel reservation management system built with HTML, CSS, and JavaScript that provides complete functionality for both customers and administrators.

## 📋 Project Overview

This system implements all 16 user stories from the UI backlog, providing a full-featured hotel reservation platform with customer self-service capabilities and comprehensive admin management tools.

## 🎯 Features Implemented

### Customer Features (US001-US016)
- **Registration (US001)**: Customer self-registration with form validation
- **Login (US002)**: Secure customer login system
- **Customer Homepage (US004)**: Dashboard with navigation menu and quick stats
- **Reservation System (US006)**: Complete booking workflow with room selection
- **Billing & Checkout (US008)**: Bill generation and payment processing
- **Booking History (US010)**: View previous booking records
- **Payment Processing (US014)**: Secure payment gateway with multiple methods
- **My Bookings (US015)**: View upcoming reservations
- **Customer Support (US016)**: Comprehensive help and contact system

### Admin Features (US003-US012)
- **Admin Login (US003)**: Secure administrator access
- **Admin Dashboard (US005)**: Complete management overview
- **Reservation Management (US007)**: Approve/reject customer reservations
- **Admin Billing (US009)**: Invoice generation and payment tracking
- **Booking History Management (US011)**: Access all booking records
- **Room Status Tracking (US012)**: Monitor and manage room availability

### System Features (US013)
- **Notification System (US013)**: Real-time pop-up notifications
- **Data Export**: Export functionality for reports and analytics
- **Responsive Design**: Mobile-friendly interface
- **Local Storage**: Persistent data management

## 🏗️ Project Structure

```
Hotel Reservation System/
├── index.html                 # Entry point (redirects to login)
├── registration.html          # Customer registration (US001)
├── login.html                 # Login page for both users (US002, US003)
├── customer-home.html         # Customer dashboard (US004)
├── admin-home.html           # Admin dashboard (US005)
├── reservation.html          # Customer reservation form (US006)
├── admin-reservations.html   # Admin reservation management (US007)
├── billing.html              # Customer billing page (US008)
├── admin-billing.html       # Admin billing management (US009)
├── history.html              # Customer booking history (US010)
├── admin-history.html       # Admin booking history (US011)
├── room-status.html          # Room status management (US012)
├── bookings.html             # Customer bookings view (US015)
├── payment.html              # Payment processing (US014)
├── support.html              # Customer support page (US016)
├── styles.css               # Global styling
├── script.js                # Core JavaScript functionality
└── README.md               # This documentation
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional but recommended)

### Installation

1. **Clone or Download** the project files to your local machine
2. **Open** the project folder in your preferred code editor
3. **Launch** a local web server (optional):
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

4. **Access** the application:
   - If using a web server: `http://localhost:8000`
   - If opening directly: Double-click `login.html`

### Default Admin Account
- **Username**: `admin`
- **Password**: `admin123`

## 📱 User Guide

### For Customers

1. **Registration**: Click "Register here" on the login page to create a new account
2. **Login**: Use your credentials to access the system
3. **Make Reservation**: Navigate to "Reservation" from the dashboard menu
4. **View Bookings**: Check your upcoming and past reservations
5. **Payment**: Pay bills through the billing section
6. **Get Support**: Access help through the support page

### For Administrators

1. **Admin Login**: Use admin credentials to access the admin dashboard
2. **Manage Reservations**: Review and approve customer booking requests
3. **Room Management**: Update room status and availability
4. **Billing**: Generate invoices and track payments
5. **Reports**: View analytics and export data
6. **Customer Support**: Handle customer inquiries

## 🛠️ Technical Implementation

### Frontend Technologies
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with animations and responsive design
- **JavaScript (ES6+):** Core functionality and data management

### Key Features Implementation

#### Data Management
- **LocalStorage**: Persistent data storage for users, reservations, bookings, and bills
- **JSON**: Data serialization and storage format
- **State Management**: Client-side state handling

#### User Interface
- **Responsive Design**: Mobile-first approach with media queries
- **Modern CSS**: Flexbox and Grid layouts
- **Animations**: Smooth transitions and micro-interactions
- **Component-based**: Reusable UI components

#### Security
- **Input Validation**: Client-side form validation
- **Data Sanitization**: Input cleaning and validation
- **Session Management**: User authentication state

## 📊 Data Model

### User Schema
```javascript
{
  id: Number,
  username: String,
  password: String,
  email: String,
  firstName: String,
  lastName: String,
  phone: String,
  role: String // 'customer' or 'admin'
}
```

### Reservation Schema
```javascript
{
  id: Number,
  userId: Number,
  username: String,
  checkIn: String,
  checkOut: String,
  roomType: String,
  guests: Number,
  specialRequests: String,
  status: String, // 'pending', 'approved', 'rejected'
  createdAt: String
}
```

### Booking Schema
```javascript
{
  id: Number,
  reservationId: Number,
  userId: Number,
  username: String,
  roomId: Number,
  roomType: String,
  checkIn: String,
  checkOut: String,
  guests: Number,
  status: String, // 'confirmed', 'cancelled'
  createdAt: String
}
```

### Bill Schema
```javascript
{
  id: Number,
  bookingId: Number,
  userId: Number,
  username: String,
  roomId: Number,
  roomType: String,
  checkIn: String,
  checkOut: String,
  nights: Number,
  roomRate: Number,
  totalAmount: Number,
  status: String, // 'pending', 'paid'
  createdAt: String,
  paidAt: String
}
```

### Room Schema
```javascript
{
  id: Number,
  type: String, // 'Single', 'Double', 'Suite'
  price: Number,
  status: String // 'available', 'occupied', 'maintenance'
}
```

## 🔧 Configuration

### Room Types and Pricing
- **Single Room**: $100/night
- **Double Room**: $150/night
- **Suite**: $250/night

### System Settings
- **Check-in Time**: 2:00 PM
- **Check-out Time**: 11:00 AM
- **Cancellation Policy**: 
  - Full refund: 24+ hours before check-in
  - 50% refund: 12-24 hours before check-in
  - No refund: Less than 12 hours before check-in

## 🧪 Testing

### Manual Testing Checklist

#### Registration Flow
- [ ] User can register with valid information
- [ ] Form validation works correctly
- [ ] Duplicate usernames are rejected
- [ ] Email validation works

#### Login Flow
- [ ] Valid credentials allow login
- [ ] Invalid credentials are rejected
- [ ] Admin and customer roles work correctly
- [ ] Logout functionality works

#### Reservation Flow
- [ ] Customer can create reservation
- [ ] Date validation works
- [ ] Price calculation is accurate
- [ ] Admin can approve/reject reservations

#### Billing Flow
- [ ] Bills are generated correctly
- [ ] Payment processing works
- [ ] Room status updates after payment
- [ ] Invoice generation works

#### Room Management
- [ ] Admin can view room status
- [ ] Room status can be updated
- [ ] New rooms can be added
- [ ] Room availability is tracked

## 🚀 Deployment

### Production Deployment

1. **Web Server Setup**: Configure Apache/Nginx to serve static files
2. **HTTPS**: Enable SSL/TLS for secure connections
3. **Backend Integration**: Replace LocalStorage with proper database
4. **API Integration**: Connect to payment gateways and email services
5. **Performance**: Optimize assets and implement caching

### Environment Variables
```javascript
// Configuration for different environments
const config = {
  development: {
    apiEndpoint: 'http://localhost:3000/api',
    paymentGateway: 'test'
  },
  production: {
    apiEndpoint: 'https://api.hotel.com',
    paymentGateway: 'live'
  }
};
```

## 🔮 Future Enhancements

### Planned Features
- **Real Database Integration**: MongoDB/PostgreSQL backend
- **Payment Gateway Integration**: Stripe, PayPal, Square
- **Email Notifications**: Automated booking confirmations
- **Mobile App**: React Native or Flutter application
- **Advanced Analytics**: Business intelligence dashboard
- **Multi-language Support**: Internationalization
- **Advanced Search**: Filter and sorting capabilities
- **Review System**: Customer feedback and ratings

### Technical Improvements
- **Progressive Web App**: PWA capabilities
- **Offline Support**: Service workers for offline functionality
- **Performance Optimization**: Lazy loading and code splitting
- **Accessibility**: WCAG 2.1 compliance
- **Testing**: Unit and integration tests
- **CI/CD**: Automated deployment pipeline

## 🤝 Contributing

### Development Guidelines
1. **Code Style**: Follow consistent indentation and naming conventions
2. **Comments**: Document complex logic and functions
3. **Testing**: Test new features thoroughly
4. **Responsive**: Ensure mobile compatibility
5. **Accessibility**: Include ARIA labels and semantic HTML

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "Add new feature description"

# Push and create pull request
git push origin feature/new-feature
```

## 📞 Support

### Contact Information
- **Email**: support@hotel-reservation.com
- **Phone**: +1 (555) 123-4567
- **Documentation**: Available in this README file
- **Issues**: Report through project issue tracker

### Troubleshooting

#### Common Issues
1. **Data Not Saving**: Check browser LocalStorage permissions
2. **Login Issues**: Verify admin credentials are correct
3. **Payment Errors**: Ensure all required fields are filled
4. **Navigation Problems**: Check JavaScript console for errors

#### Browser Compatibility
- **Chrome**: Full support (recommended)
- **Firefox**: Full support
- **Safari**: Full support
- **Edge**: Full support
- **Internet Explorer**: Not supported

## 📄 License

This project is licensed under the MIT License. See LICENSE file for details.

## 🙏 Acknowledgments

- **Font Awesome**: Icon library used throughout the application
- **Google Fonts**: Typography and web fonts
- **MDN Web Docs**: Technical documentation and references
- **Stack Overflow**: Community support and solutions

---

**Version**: 1.0.0  
**Last Updated**: March 2026  
**Developer**: Hotel Reservation System Team
