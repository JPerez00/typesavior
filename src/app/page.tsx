'use client';

import { AnchorHTMLAttributes, ClassAttributes, useState } from 'react';
import { ModelDropDown } from '../components/ModelDropDown';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import ReactMarkdown from 'react-markdown';
import { Copy, Check } from 'lucide-react';
import Image from 'next/image';

function Pin(
  props: JSX.IntrinsicAttributes & ClassAttributes<HTMLAnchorElement> & AnchorHTMLAttributes<HTMLAnchorElement>
) {
  return (
    <a
      {...props}
      target="_blank"
      className="mr-0.5 ml-0.5 inline-flex items-center rounded-md border p-1 text-sm leading-4 no-underline border-white/30 bg-zinc-800 text-zinc-200 shadow"
    />
  );
}

export default function Home() {
  const [jsCode, setJsCode] = useState('// Write or paste your JavaScript code here');
  const [tsCode, setTsCode] = useState('// Get your TypeScript code here');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gpt-3.5-turbo');
  const [conversionComplete, setConversionComplete] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleConvert = async () => {
    setLoading(true);
    setConversionComplete(false);

    try {
      const response = await fetch('/api/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: jsCode, model: selectedModel }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setTsCode(data.tsCode);
      setSummary(data.summary);
      setConversionComplete(true);
    } catch (error) {
      console.error(error);
      setSummary('An error occurred during conversion.');
    }
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(tsCode).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
      (err) => {
        console.error('Failed to copy text: ', err);
      }
    );
  };

  return (
    <div className="w-full flex flex-col items-center mb-20 bg-gradient-to-b from-sky-950 from-10% via-teal-900 via-35% to-zinc-950 to-80% rounded-t-3xl">
      <div className="container mx-auto px-2 py-10">
        {/* Header Section */}
        <div className="text-center mb-6">
          <h1 className="mb-4 text-5xl md:text-7xl leading-tight md:leading-tight tracking-tighter font-extrabold bg-gradient-to-br from-white from-40% to-gray-400 to-80% bg-clip-text text-transparent">
            Say Goodbye To Your Untyped Mess
          </h1>
          <p className="text-balance md:text-xl text-zinc-300">
            Switching to{' '}
            <Pin href="https://www.typescriptlang.org/">
              <Image
                alt="TS logomark"
                src="/ts-logo.svg"
                className="!mr-1"
                width="12"
                height="12"
              />
              TypeScript
            </Pin>{' '}
            can be tough. This tool simplifies the process by explaining each change. Select an{' '}
            <Pin href="https://openai.com/">
              <Image
                alt="OpenAI logomark"
                src="/openai-logomark.svg"
                className="!mr-1"
                width="12"
                height="12"
              />
              Open AI
            </Pin>{' '}
            model, paste your JavaScript, and convert it to TypeScript. Review the summary for
            changes and type safety improvements.
          </p>
        </div>

        {/* Model Selector */}
        <div className="flex justify-center mb-6 gap-x-2 relative z-50">
          <label className="text-zinc-300 text-center font-semibold text-lg mt-1.5">
            Select Your Model:
          </label>
          <ModelDropDown selectedModel={selectedModel} setSelectedModel={setSelectedModel} />
        </div>

        {/* Editors */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-6">
          {/* JavaScript Editor */}
          <div
            className="flex-1 min-w-0 bg-zinc-900 rounded-lg border border-white/15 shadow-lg p-2"
            style={{ height: '520px' }}
          >
            <div className="flex space-x-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <h2 className="font-bold mb-2 text-lg text-zinc-300">JavaScript Terminal</h2>
            <div className="overflow-auto h-full">
              <CodeMirror
                value={jsCode}
                height="440px"
                extensions={[javascript({ typescript: false })]}
                theme={oneDark}
                onChange={(value) => setJsCode(value)}
                editable={!loading}
                className="border border-white/15"
              />
            </div>
          </div>
          {/* TypeScript Editor */}
          <div
            className="flex-1 min-w-0 bg-zinc-900 rounded-lg border border-white/15 shadow-lg p-2"
            style={{ height: '520px' }}
          >
            <div className="flex space-x-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <h2 className="font-semibold mb-2 text-lg text-zinc-300">TypeScript Terminal</h2>
            {loading ? (
              <div className="text-white p-2 h-full overflow-auto flex">
                <svg
                  className="animate-spin mt-1.5 mr-3 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <p className="text-lg font-semibold animate-pulse">Converting...</p>
              </div>
            ) : (
              <div className="relative">
                <div className="overflow-auto h-full">
                  <CodeMirror
                    value={tsCode}
                    height="440px"
                    extensions={[javascript({ typescript: true })]}
                    theme={oneDark}
                    readOnly
                    className="border border-white/15"
                  />
                </div>
                <button
                  onClick={copyToClipboard}
                  className="absolute top-1 right-2 text-zinc-300 hover:text-white bg-gray-700 p-1 shadow-md rounded-md ring-1 ring-white/20 transition-colors z-10"
                  aria-label="Copy to clipboard"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Convert Button */}
        <div className="text-center my-10">
          <button
            className="inline-flex items-center rounded-lg bg-slate-800 py-4 px-8 text-lg font-semibold text-white shadow-inner shadow-white/20 focus:outline-none hover:bg-slate-700"
            onClick={handleConvert}
            disabled={loading}
          >
            {loading && (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {loading ? 'Converting...' : 'Convert to TypeScript'}
          </button>
        </div>

        {/* Summary */}
        {conversionComplete && (
          <div className="mt-10 mb-20 max-w-5xl mx-auto w-full py-2 px-4 bg-zinc-900 rounded-lg border border-white/10 shadow-md p-2">
            <div className="flex space-x-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <h2 className="font-bold text-xl tracking-tight mb-2">Reasoning Behind The Conversion & Summary:</h2>
            <div className="max-w-5xl mx-auto w-full px-2.5 md:px-6 py-4 bg-gray-700/40 text-white prose prose-invert border border-white/5">
              <ReactMarkdown>{summary}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
