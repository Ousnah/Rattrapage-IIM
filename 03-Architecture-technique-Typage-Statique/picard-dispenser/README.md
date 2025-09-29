📦 Picard Dispenser – Product Management

A front-end React + TypeScript application to manage products and stocks in Picard distributors.
It allows adding, editing, and deleting products, with image upload and live preview support.

🚀 Installation & Setup
1. Clone the repository
git clone https://github.com/Ousnah/Rattrapage-IIM.git
cd https://github.com/Ousnah/Rattrapage-IIM.git

2. Install dependencies
npm install


or with Yarn:

yarn install

3. Run the development server
npm run dev


👉 Then open your browser at the provided address (default: http://localhost:5173
).

4. Build for production
npm run build


This will generate optimized files inside the dist/ folder.

📂 Project Structure
src/
 ├── components/        # Reusable components (ProductCard, AddProduct, etc.)
 ├── hooks/             # Custom hooks if needed
 ├── pages/             # Application pages (Home, Products, etc.)
 ├── types/             # TypeScript interfaces & types (Product.ts, etc.)
 ├── App.tsx            # Main app entry
 ├── main.tsx           # React bootstrap
 └── index.css          # Global styles

✅ Features

Add a new product with:

Name, description, price, quantity

Rating, availability

Image upload (with preview)

Expiration date

Manage stock (+1, -1, delete)

Product display in cards

Form validation for required fields

🛠️ Technologies

React
 + TypeScript

Vite
 (fast build & dev server ⚡)

React Router
 (page navigation)

Tailwind CSS
 (utility-first styling)

https://youtu.be/OO5XzAQEdvg
