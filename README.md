# E-Waste Analyzer

## 🌟 Team Regeni

- **Prithvi Mehta** (Team Leader)
- **Pranshul Mishra**
- **Rahul Shukla**
- **Shaurya Srivastava**

## 🌍 Problem Statement: The Growing Crisis of E-waste

Electronic waste (e-waste) is the fastest-growing waste stream globally, with millions of tons of discarded electronics ending up in landfills each year. This leads to:

- Toxic chemicals and heavy metals leaching into soil and water
- Loss of valuable recyclable materials
- Health hazards for communities near informal recycling sites
- Significant carbon footprint from improper disposal

## 💡 Our Solution: E-Waste Analyzer

Our application addresses the e-waste crisis through an AI-powered platform that empowers users to make informed decisions about their electronic waste. The solution offers:

1. **AI Image Analysis**: Upload images of e-waste devices to receive comprehensive information about:
   - Device identification and specifications
   - Recyclability assessment and environmental impact
   - Safety information and hazard warnings
   - Detailed disposal guidelines
   - Resource recovery value estimates

2. **E-waste Management Features**:
   - Schedule pickups for proper disposal
   - Locate nearby drop-off points
   - Track recycling progress
   - Earn rewards for responsible disposal

3. **Environmental Education**:
   - Awareness resources on e-waste impact
   - Step-by-step instructions for safe handling
   - Community engagement through feedback

## 🚀 Technology Stack

- **Frontend**: React.js with Vite, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express.js
- **AI Integration**: Google Gemini AI (gemini-2.0-flash model)
- **Authentication**: Firebase Authentication
- **Maps Integration**: Google Maps API
- **Hosting**: Frontend (Vercel), Backend (Render)

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- Git

### Step 1: Clone the Repository
```bash
git clone https://github.com/your-repo/GDSC-2.0.git
cd GDSC-2.0
```

### Step 2: Set Up the Backend
```bash
cd server
npm install
```

Create a `.env` file in the server directory with:
```
GOOGLE_API_KEY=your_gemini_api_key
PORT=5000
```

### Step 3: Set Up the Frontend
```bash
cd ../hackblitz
npm install
```

Create a `.env` file in the hackblitz directory with:
```
VITE_BACKEND_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

### Step 4: Run the Application
To run the backend server:
```bash
cd server
npm run dev
```

In a separate terminal, to run the frontend:
```bash
cd hackblitz
npm run dev
```

The application will be available at `http://localhost:5173`

## 📱 Features & Usage

1. **Home Page**: Introduction to the application and navigation to all features
2. **Scanner**: Upload or capture images of electronic devices for AI analysis
3. **Results View**: Comprehensive breakdown of the device's:
   - Identification and specifications
   - Recyclability score and environmental impact
   - Safety information and handling precautions
   - Disposal guidelines with step-by-step instructions
   - Resource recovery value estimation
4. **Schedule Pickup**: Request collection of your e-waste
5. **Drop Points**: Find nearby e-waste collection centers
6. **Rewards**: Track and claim rewards for responsible disposal
7. **Awareness**: Educational resources about e-waste management

## 🔒 Privacy & Data Security

We prioritize user privacy and data security:
- Images are processed securely and not stored permanently
- User authentication ensures data protection
- Personal information is used only for the intended services

## 🤝 Contributing

We welcome contributions to improve the project! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- Google Developer Student Clubs for the opportunity
- Google Generative AI for providing the AI capabilities
- Our mentors and advisors for their guidance
- The open-source community for the incredible tools and libraries
