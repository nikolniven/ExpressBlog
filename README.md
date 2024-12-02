**MySQL Blog Project**

This is a CRUD-based blog application built using Node.js, Express, and MySQL. It allows users to create, read, update, and delete blog posts. The project is designed with a clean and maintainable code structure to make it easy for developers and readers to understand. Can work as a base to build up more complex blogs 😸

**Features**

**➡️Post Management**: Create, view, edit, and delete blog posts.

**➡️Author Selection**: Associate posts with specific authors.

**➡️Dynamic Templates**: Renders pages dynamically using EJS.

**➡️Error Handling**: Displays custom error pages (e.g., 404 for missing resources).


**Tech Stack**

- **Frontend**: HTML, CSS
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Templating Engine**: EJS
- **Version Control**: Git and GitHub


**Prerequisites**

- Node.js installed on your machine
- MySQL server installed and running
  
**Steps**

1. Clone the repository:
2. Install dependencies
3. Configure the database:
    - Create a MySQL database and import the provided `.sql` file.
    - Update the `database.js` configuration file with your MySQL credentials.
4. Start the application:
5. Open your browser and visit: `http://localhost:3000`
   

**Usage**

- Navigate to `/new-post` to create a blog post.
- View all posts on the `/posts` page.
- Edit or delete posts via the options on each post.

**Folder Structure**

📦 Blog Project
├── 📂 routes         # Contains route definitions for Express
├── 📂 views          # EJS templates for rendering
├── 📂 public         # Static assets (CSS, JS, images)
├── 📂 data           # Database connection configuration
└── index.js          # Main application entry point

