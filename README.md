# url-shortener-api
This project is a powerful URL shortener API that provides functionalities like URL shortening, redirection with advanced tracking, URL analytics, and support for custom short codes and expiration. The project is built with Node.js, Express, MongoDB, Redis, and features API rate limiting and real-time analytics.

Table of Contents
Features
Prerequisites
Installation
API Endpoints
Request and Response Formats
Database Schema
Security Features
Background Jobs
Postman Collection
Sample Data Script

Features
URL Shortening: Shortens URLs and stores the mapping in MongoDB.
Redirection with Advanced Tracking: Tracks each visit with details like timestamp, user agent, IP, and device type.
URL Analytics: Provides analytics such as:
Original URL
Total number of visits
Unique visitors
Device type breakdown
Top referring websites
Time series data of visits
Custom Short Codes: Users can create custom short codes for their URLs.
URL Expiration: Optionally expire shortened URLs after a specific timeframe.

Prerequisites
Make sure you have the following installed:
Node.js
MongoDB
Redis
Postman

Steps
Clone the repository: git clone https://github.com/prachik167/url-shortener-api.git

Navigate to the project directory: cd url-shortener-api

Install dependencies: npm install

Set up environment variables:
Create a .env file in the root of your project and configure the following environment variables:
MONGO_URI=mongodb://localhost:27017/urlshortener 
REDIS_URL=redis://localhost:6379
PORT=3000 

Start the server:npm start


