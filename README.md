# Zawadi Haven - Premium Ladies Fashion E-commerce Platform

![Zawadi Haven Banner](https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80)

## Table of Contents
- [Project Description](#project-description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Key Functionalities](#key-functionalities)
- [Kenyan Market Adaptations](#kenyan-market-adaptations)
- [Deployment](#deployment)
- [Testing](#testing)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)

## Project Description

Zawadi Haven is a responsive e-commerce website specializing in premium ladies' fashion for the Kenyan market. The name "Zawadi" (meaning "gift" in Swahili) reflects our mission to provide Kenyan women with beautifully crafted clothing and accessories that make them feel special.

This project demonstrates comprehensive web development skills including:
- Semantic HTML5 structure
- Advanced CSS3 styling and animations
- Interactive JavaScript functionality
- Responsive design principles
- Form validation
- Shopping cart system
- Localized content for Kenya

## Features

### Core Features
✅ **Responsive Design** - Fully responsive across all devices (mobile, tablet, desktop)  
✅ **Multi-page Navigation** - 5 interconnected pages with consistent UI  
✅ **Product Catalog** - Filterable and sortable product display  
✅ **Shopping Cart** - Add/remove items, quantity adjustment, real-time totals  
✅ **Form Validation** - Client-side validation for contact and newsletter forms  

### Technical Features
✨ **Modern CSS** - Variables, Grid, Flexbox, and animations  
✨ **JavaScript Interactivity** - Dynamic content loading, event handling  
✨ **Local Storage** - Persistent cart data between sessions  
✨ **Performance Optimized** - Efficient code and image optimization  

### User Experience
🛍️ **Intuitive Navigation** - Consistent header/footer across pages  
🔔 **Interactive Notifications** - Visual feedback for user actions  
📱 **Touch-friendly** - Larger tap targets for mobile users  

## Technologies Used

### Frontend
- **HTML5** - Semantic markup and document structure
- **CSS3** - Styling, animations, and responsive design
- **JavaScript** - Interactive functionality and dynamic content
- **Font Awesome** - Icon library for UI elements

### Development Tools
- **Git** - Version control
- **GitHub Pages** - Deployment platform
- **VS Code** - Code editor with Emmet and Live Server

## Installation

To run this project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/zawadi-haven.git
   ```
2. Navigate to project directory:
   ```bash
   cd zawadi-haven
   ```
3. Open in your preferred code editor
4. Launch with Live Server or open `index.html` directly in a browser

## Project Structure

```
zawadi-haven/
├── index.html              # Home page
├── products.html           # Product listing page
├── about.html              # About Us page
├── contact.html            # Contact page
├── cart.html               # Shopping cart page
├── css/
│   ├── style.css           # Main stylesheet
│   ├── responsiveness.css  # Responsive styles
│   └── animations.css      # Animation styles
├── js/
│   ├── main.js             # Shared functionality
│   ├── cart.js             # Cart operations
│   └── form-validation.js  # Form validation logic
├                        
└── README.md               # Project documentation
```

## Key Functionalities

### Shopping Cart System
- **Add/Remove Items**: Products can be added from catalog and removed individually
- **Quantity Adjustment**: Increase/decrease item quantities with +/- buttons
- **Bulk Removal**: "Remove All" button clears entire cart
- **Real-time Calculation**: Subtotal, delivery fee, and total update automatically
- **Persistent Storage**: Cart contents saved to localStorage

```javascript
// Example cart functionality
function addToCart(id, name, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Cart logic here
}
```

### Product Filtering
- Filter by category (Dresses, Accessories, Bags)
- Sort by price (low-high, high-low) and newest
- Responsive grid layout adjusts to screen size

### Form Validation
- Contact form with:
  - Name validation (min 3 chars)
  - Email format validation
  - Kenyan phone number validation
  - Required subject selection
  - Message length validation
- Newsletter signup with email validation

## Kenyan Market Adaptations

### Localization Features
- **Currency**: All prices displayed in KSh (Kenyan Shillings)
- **Payment Methods**: M-Pesa integration alongside cards
- **Delivery Rules**: Free delivery for orders over KSh 3,000
- **Contact Information**: Kenyan phone numbers (+254) and Nairobi address
- **Cultural Relevance**: Swahili brand name and locally-inspired designs

### Performance Considerations
- Optimized for lower bandwidth scenarios
- Limited external dependencies for faster loading
- Local storage instead of cookies for better performance

## Deployment

### GitHub Pages Deployment
1. Push your code to a GitHub repository
2. Go to Repository Settings > Pages
3. Select "main" branch and root folder
4. Save - your site will be live at `https://username.github.io/repository-name`

### Alternative Deployment Options
- **Netlify**: Drag-and-drop deployment
- **Vercel**: Optimized for static sites
- **Shared Hosting**: Upload via FTP/cPanel

## Testing

### Manual Testing Performed
1. **Cross-browser Testing**:
   - Chrome, Firefox, Safari, Edge
2. **Device Testing**:
   - Mobile (360px-768px)
   - Tablet (768px-1024px)
   - Desktop (1024px+)
3. **Functionality Testing**:
   - Form submissions
   - Cart operations
   - Navigation
   - Image loading

### Recommended Tests Before Deployment
- [ ] Verify all links work properly
- [ ] Test form submissions
- [ ] Check cart persistence across pages
- [ ] Validate responsive behavior

## Future Improvements

### Planned Enhancements
- User accounts and login system
- Product search functionality
- Wishlist feature
- Product reviews and ratings
- Integration with Kenyan payment gateways
- Swahili language option

### Technical Roadmap
- Convert to React/Vue.js for better state management
- Implement a backend with Node.js
- Add database integration
- Create admin dashboard

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Contact**: For any questions, please https://github.com/WinnieMwangi-dot

**Live Demo**: [https://username.github.io/zawadi-haven](https://username.github.io/zawadi-haven)
