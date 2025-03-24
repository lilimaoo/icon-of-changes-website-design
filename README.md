# Icons of Change Website

This repository contains the source code for the official Icons of Change website.

## Project Description

Icons of Change is a platform dedicated to recognizing, empowering, and celebrating everyday trailblazers who create meaningful, lasting impact in their communities. This website aims to showcase the organization's mission, programs, and impact, and provides a platform for potential volunteers, partners, and community members to connect and engage.

## Features

- Responsive design, compatible with all devices (desktop, tablet, and mobile)
- Modern user interface with animations and interactive elements
- Multi-page structure including Home, About Us, Programs, Volunteer, News & Impact, Contact Us, etc.
- Social media integration
- Contact form
- Video gallery
- Events showcase
- FAQ section

## Tech Stack

- HTML5
- CSS3 (using CSS variables and Flexbox/Grid layouts)
- JavaScript (ES6+)
- Font Awesome icon library

## Directory Structure

```
icons-of-change/
├── index.html          # Home page
├── css/                # CSS stylesheets
│   └── style.css       # Main stylesheet
├── js/                 # JavaScript files
│   └── main.js         # Main script file
├── images/             # Image resources
│   ├── logo.png        # Website Logo
│   └── ...             # Other image resources
└── pages/              # Other pages
    ├── about.html      # About Us page
    ├── programs.html   # Programs page
    ├── volunteer.html  # Volunteer page
    ├── news.html       # News & Impact page
    ├── contact.html    # Contact Us page
    └── ...             # Other pages
```

## Installation and Setup

1. Clone this repository:
   ```
   git clone https://github.com/your-username/icons-of-change.git
   ```

2. Navigate to the project directory:
   ```
   cd icons-of-change
   ```

3. Open the `index.html` file in your browser or use a local server (e.g., Live Server) to run the website.

## Customization Guide

### Modifying Content

You can modify the website content by editing the respective HTML files. The main content areas are within the `<section>` tags on each page.

### Modifying Styles

Global styles are defined in the `css/style.css` file. This file uses CSS variables to define colors, font sizes, and other style properties, which you can find in the `:root` selector at the top of the file.

```css
:root {
    --primary-color: #F4B41A;
    --secondary-color: #143D59;
    /* Other variables... */
}
```

### Adding New Pages

1. Create a new HTML file in the `pages` directory
2. Copy the basic structure (header, footer, etc.) from an existing page
3. Add your specific content
4. Update the navigation links to include the new page

### Adding Company Logo

The website design includes a space for your company logo in the navigation bar and footer. To add your logo:

1. Prepare your logo image, recommended size 200x80 pixels, in PNG format (with transparent background)
2. Name the logo file `logo.png` and place it in the `images/` directory
3. The website will automatically load the logo and display it on all pages

## Browser Compatibility

The website is compatible with all modern browsers, including:

- Chrome (latest version)
- Firefox (latest version)
- Safari (latest version)
- Edge (latest version)
- Opera (latest version)

## Contribution Guidelines

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` file for more information.

## Contact Information

For any questions or suggestions, please contact: theiconsofchange@gmail.com 