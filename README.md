# Setup & Running Instructions
### Prerequisites
Ensure you have Node.js (>= 18) and npm or yarn installed.

### 1️. Clone the Repository
```sh
git clone https://github.com/your-username/client-app.git
cd client-app
```
### 2. Install Dependencies Using npm:
```sh
npm install
```

### 3. Start the Development Server
```sh
npm run dev
```
This will start the Next.js server at ```http://localhost:3000```.

### 4. Build for Production
```sh
npm run build
```
To start the production server:
```sh
npm run start
```
<br/>

## Libraries & Tools Used

| Library                  | Purpose                                      |
|--------------------------|----------------------------------------------|
| **Next.js 15**           | Server-side rendering & static site generation |
| **React 19**             | UI development                              |
| **Tailwind CSS**         | Utility-first styling                       |
| **ShadCN UI**             | Accessible UI components                    |
| **React Dropzone**       | File uploads                                |
| **PDF.js, pdf-lib, jspdf** | Handling and generating PDFs               |
| **React Signature Canvas** | Signature input functionality              |
| **React  Icons**         | Lightweight SVG icons                       |

<br/>

## Challenges & Solutions
### 1. React 19 Compatibility Issues
* Some older packages like react-canvas-draw didn't support React 19.
* Solution: Removed it and used react-signature-canvas instead.

### 2. Peer Dependency Conflicts
* Errors related to react@19 vs. packages expecting React 16/17.
* Solution: Used --legacy-peer-deps when installing or found updated versions of libraries.