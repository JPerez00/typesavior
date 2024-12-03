# TypeSavior

![TypeSavior Hero Banner](/public/ts-hero-banner.png)

Your AI JavaScript to TypeScript Converter.

Simplify your transition to TypeScript by converting your JavaScript code to TypeScript and providing detailed summaries explaining the changes made and the type safety improvements.

You can dive deeper and follow the step-by-step guide and reasoning [here](https://www.jorge-perez.dev/blog/typesavior-ai-converter).

## Live Project

[https://typesavior.vercel.app/](https://typesavior.vercel.app/)

## Features

- **Code Conversion**: Paste your JavaScript code and receive the TypeScript version.
- **Detailed Summaries**: Get concise explanations of the changes made, helping you learn TypeScript.
- **Model Selection**: Choose between different OpenAI models for code conversion.
- **Copy to Clipboard**: Easily copy the converted TypeScript code for use in your projects.
- **User-Friendly Interface**: Simple and intuitive design for ease of use.

## How It Works

TypeSavior uses the power of OpenAI's language models to convert your JavaScript code to TypeScript. By selecting a model and typing or pasting your code, the app sends a request to the OpenAI API, processes the response, and displays the converted code along with a helpful summary, a way to help people learn about type safety.

## Privacy & Security

All code processing occurs securely through API calls to OpenAI. This means:

- **No Data Storage**: Your code is not stored on any servers. All conversions are done in real-time.
- **Secure API Communication**: Communication with the OpenAI API is encrypted, ensuring your code remains confidential.
- **Local Processing**: The application runs in your browser, and your code is only sent to OpenAI for conversion.

## Ease of Use

TypeSavior is designed with developers in mind. The interface is simple, intuitive, and easy to navigate, ensuring that you can access the tools you need without any hassle.

## The Goal

The goal is to create a project that helps developers transition to TypeScript smoothly. We welcome feedback, suggestions, and contributions from the community to shape its future.

More features and improvements will be added over time.

## Getting Started

First, clone the repository and install the dependencies:

```bash
git clone https://github.com/JPerez00/typesavior
cd typesavior
npm install
```

Or

```bash
npx create-next-app --example https://github.com/JPerez00/typesavior [Your-Project-Name-Here]
cd [Your-Project-Name-Here]
```

### Setting Up Environment Variables

To run the project locally, create a `.env.local` file in the root directory and add your OpenAI API key as shown below:

```env
OPENAI_API_KEY=your-api-key-here
```

When deploying to Vercel, ensure you configure the same environment variables in your project's settings under the `Environment Variables` section.

```bash
key=OPENAI_API_KEY
value=your-api-key-here
```

### Running the Server

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Learn More

To learn more about Next.js and building AI-powered applications, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Vercel AI SDK Documentation](https://sdk.vercel.ai/docs/introduction) - Explore how to build AI applications with the Vercel AI SDK.
- [OpenAI API Documentation](https://platform.openai.com/docs/introduction) - Learn about OpenAI's API and how to integrate it.

## Deploy on Vercel

The easiest way to deploy your Next.js application is to use the [Vercel Platform](https://vercel.com/).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.