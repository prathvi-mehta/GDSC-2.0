import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../Components/HomePageComponents/Nav";
import Footer from "../Components/HomePageComponents/Footer";
import "./ScannerPage.css";

const ScannerPage = () => {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const url = "https://gdsc-2-0-backend.onrender.com";

  // Generate particles for background effect
  const particles = Array.from({ length: 15 }, (_, index) => ({
    id: index,
    size: Math.random() * 10 + 5,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 10
  }));

  useEffect(() => {
    return () => {
      // Clean up video stream when component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const startScanner = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraPermission(true);
        setScanning(true);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      setCameraPermission(false);
    }
  };

  const stopScanner = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setScanning(false);
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Get image data and convert to file
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "captured-image.png", { type: "image/png" });
          handleImageAnalysis([file]);
        }
      }, "image/png");
    }
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0 && files.length <= 3) {
      setUploadedImages(files);
    } else if (files.length > 3) {
      alert("You can upload a maximum of 3 images");
    }
  };

  const handleImageAnalysis = async (imagesToAnalyze) => {
    // Display processing state
    setResult({ status: "processing" });
    setIsUploading(true);
    
    try {
      const formData = new FormData();
      
      // Add each image to the form data
      imagesToAnalyze.forEach((file, index) => {
        formData.append('images', file);
      });
      
      console.log(`Sending ${imagesToAnalyze.length} images to the server for analysis...`);
      
      // Send to API endpoint with explicit CORS settings
      const response = await fetch(`${url}/api/analyze`, {
        method: 'POST',
        body: formData,
        // Don't set Content-Type header for FormData - browser sets it automatically with boundary
        headers: {
          // Including standard CORS headers
          'Accept': 'application/json',
        },
        // Ensure credentials are included if needed (e.g., for cookies)
        credentials: 'same-origin'
      });
      
      console.log('Server response status:', response.status);
      
      if (!response.ok) {
        // Try to get more detailed error information
        let errorDetail;
        try {
          const errorData = await response.json();
          errorDetail = errorData.message || errorData.error || `Status: ${response.status}`;
        } catch (e) {
          errorDetail = `Status code: ${response.status}`;
        }
        throw new Error(`API request failed: ${errorDetail}`);
      }
      
      const data = await response.json();
      console.log('Analysis results received:', data);
      
      // Set results
      setResult({
        status: "complete",
        data: data
      });
      
      // Stop the scanner if using camera
      if (scanning) {
        stopScanner();
      }
      
    } catch (error) {
      console.error("Error analyzing images:", error);
      
      // Show detailed error message
      setResult({
        status: "error",
        message: `Failed to analyze images: ${error.message || "Connection error"}. Please check your internet connection and try again.`
      });
      
      // Stop the scanner if using camera
      if (scanning) {
        stopScanner();
      }
    } finally {
      setIsUploading(false);
      setUploadedImages([]);
    }
  };

  const processUploadedImages = () => {
    if (uploadedImages.length > 0) {
      handleImageAnalysis(uploadedImages);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  // Function to render result data from Gemini API
  const renderResultData = (data) => {
    // Add safety check for missing data structure
    if (!data || !data.device || !data.sustainability || !data.safety || 
        !data.disposal || !data.value) {
      return (
        <div className="result-container">
          <h3>Scan Results</h3>
          <div className="result-card">
            <div className="error-message">
              <i className="fas fa-exclamation-triangle"></i>
              <p>The analysis result is incomplete or in an unexpected format. Please try scanning again.</p>
              <pre style={{ textAlign: 'left', fontSize: '0.8rem', maxHeight: '200px', overflow: 'auto' }}>
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      );
    }
    
    // Helper function to render a list of items 
    const renderList = (items, emptyMessage = "None specified") => {
      if (!Array.isArray(items) || items.length === 0) {
        return <p className="empty-list">{emptyMessage}</p>;
      }
      return (
        <ul className="result-list">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
    };
    
    // Choose icon based on device type
    const getDeviceIcon = () => {
      const deviceType = data.device?.type?.toLowerCase() || '';
      
      if (deviceType.includes('phone') || deviceType.includes('iphone')) 
        return "fas fa-mobile-alt";
      if (deviceType.includes('tablet') || deviceType.includes('ipad')) 
        return "fas fa-tablet-alt";
      if (deviceType.includes('laptop')) 
        return "fas fa-laptop";
      if (deviceType.includes('desktop') || deviceType.includes('computer')) 
        return "fas fa-desktop";
      if (deviceType.includes('monitor') || deviceType.includes('display')) 
        return "fas fa-tv";
      if (deviceType.includes('printer')) 
        return "fas fa-print";
      if (deviceType.includes('camera')) 
        return "fas fa-camera";
      if (deviceType.includes('router') || deviceType.includes('modem')) 
        return "fas fa-wifi";
      if (deviceType.includes('battery')) 
        return "fas fa-battery-full";
      if (deviceType.includes('circuit') || deviceType.includes('board')) 
        return "fas fa-microchip";
      if (deviceType.includes('keyboard')) 
        return "fas fa-keyboard";
      if (deviceType.includes('mouse')) 
        return "fas fa-mouse";
      if (deviceType.includes('speaker') || deviceType.includes('audio')) 
        return "fas fa-volume-up";
      
      // Default icon
      return "fas fa-hdd";
    };
    
    // Calculate recyclability score color
    const getScoreColor = (score) => {
      if (score >= 80) return "#4CAF50"; // Green
      if (score >= 60) return "#8BC34A"; // Light green
      if (score >= 40) return "#FFC107"; // Amber
      if (score >= 20) return "#FF9800"; // Orange
      return "#F44336"; // Red
    };
    
    const scoreColor = getScoreColor(data.sustainability?.recyclability_score || 0);

    // Navigate to schedule pickup page
    const navigateToSchedulePickup = () => {
      window.location.href = "/schedule-pickup";
    };
    
    return (
      <div className="result-container">
        <h3>E-Waste Analysis Results</h3>
        
        {/* Device Information Section */}
        <div className="result-card">
          <div className="result-header">
            <div className="result-icon">
              <i className={getDeviceIcon()}></i>
            </div>
            <div className="device-info">
              <h4>{data.device.type || "Unknown Device"}</h4>
              {data.device.manufacturer && 
                <p className="manufacturer">{data.device.manufacturer}</p>
              }
              {data.device.model && 
                <p className="model-info">{data.device.model}</p>
              }
              {data.device.year_estimate && 
                <p className="year-info">Circa {data.device.year_estimate}</p>
              }
            </div>
          </div>
          
          {/* Specifications */}
          {data.device.specifications && data.device.specifications.length > 0 && (
            <div className="specs-section">
              <h5>Specifications</h5>
              {renderList(data.device.specifications)}
            </div>
          )}
        </div>
        
        {/* Sustainability Section with Score Circle */}
        <div className="result-card">
          <div className="sustainability-header">
            <div className="score-circle" style={{ 
              background: `conic-gradient(${scoreColor} ${data.sustainability?.recyclability_score || 0}%, #e0e0e0 0)` 
            }}>
              <div className="score-inner">
                <span className="score-text">{data.sustainability?.recyclability_score || 0}%</span>
                <span className="score-label">Recyclable</span>
              </div>
            </div>
            
            <div className="sustainability-details">
              <h4>Sustainability Assessment</h4>
              <div className="rating-item">
                <span className="rating-label">Complexity:</span>
                <div className="rating-value">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <i 
                      key={i} 
                      className={`fas fa-circle ${i < (data.sustainability?.complexity_rating || 0) ? 'active' : ''}`