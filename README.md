# Clinical Trial Chat Agent

A web application that allows users to chat with GPT and access clinical trial information from Excel files.

## Features

- Chat interface powered by GPT-4
- Excel file upload for clinical trial data
- Automatic data retrieval when querying about clinical trials
- Modern, responsive UI

## Requirements

- Node.js (v14 or higher)
- npm (v6 or higher)
- OpenAI API key

## Setup

1. Clone the repository:
   ```
   git clone <repository-url>
   cd clinical-trial-chat-agent
   ```

2. Install backend dependencies:
   ```
   npm install
   ```

3. Install frontend dependencies:
   ```
   npm run client-install
   ```

4. Create a `.env` file in the root directory with the following variables:
   ```
   NODE_ENV=development
   PORT=5000
   OPENAI_API_KEY=your_openai_api_key_here
   ```
   
   Replace `your_openai_api_key_here` with your actual OpenAI API key.

## Running the Application

1. For development (running both frontend and backend):
   ```
   npm run dev
   ```

2. For backend only:
   ```
   npm run server
   ```

3. For frontend only:
   ```
   npm run client
   ```

## How to Use

1. Start the application and open it in your browser.
2. Upload an Excel file containing clinical trial data using the upload form.
3. Once uploaded, you can start chatting with the assistant.
4. Ask questions about clinical trials, and the assistant will reference the uploaded Excel data.
5. You can also ask general questions not related to the clinical trials.

## Excel File Format

The application expects the Excel file to contain clinical trial data in a structured format. Each row should represent a different trial or patient, and columns should represent different data points. The first row should contain column headers.

## License

MIT 