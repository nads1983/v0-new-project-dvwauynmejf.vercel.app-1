"use client"

import type React from "react"
import { useState } from "react"
import { ToneSelector } from "@/components/tone-selector"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { generateComment } from "@/app/actions"
import Link from "next/link"
import { StripeBuyButton } from "@/components/stripe"

type Tone = "professional" | "thoughtful" | "informative"

export default function Home() {
  const [post, setPost] = useState("")
  const [tone, setTone] = useState<Tone>("professional")
  const [comment, setComment] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isCopied, setIsCopied] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!post.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      const generatedComment = await generateComment(post, tone)
      setComment(generatedComment)
    } catch (err) {
      setError("Failed to generate comment. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  // Function to copy the comment to clipboard
  const copyToClipboard = () => {
    if (!comment) return
    
    navigator.clipboard.writeText(comment)
      .then(() => {
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000) // Reset the copied state after 2 seconds
      })
      .catch(err => {
        console.error('Failed to copy: ', err)
      })
  }


  const CustomCommentBox = ({ comment, isLoading, error }: { comment: string, isLoading: boolean, error: string | null }) => {
    if (isLoading) {
      return (
        <div className="mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200 flex justify-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500 mb-2"></div>
            <p className="text-gray-500">Generating your comment...</p>
          </div>
        </div>
      )
    }

    if (error) {
      return (
        <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
          <p className="text-red-600">{error}</p>
        </div>
      )
    }

    if (!comment) {
      return (
        <div className="mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200 text-center">
          <p className="text-gray-400">Your generated comment will appear here.</p>
        </div>
      )
    }

    return (
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 relative">
        <div className="absolute top-3 right-3">
          <button 
            onClick={copyToClipboard} 
            className="bg-white hover:bg-gray-100 text-gray-600 p-2 rounded-md border border-gray-200 transition-all hover:shadow-md"
            title="Copy to clipboard"
          >
            {isCopied ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>
        </div>
        <h3 className="font-medium text-gray-700 mb-2">Generated Comment:</h3>
        <p className="text-gray-600 whitespace-pre-wrap pr-10">{comment}</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-br from-purple-50 to-indigo-50 relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-purple-200 to-pink-200 opacity-30 rounded-b-full transform -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-indigo-200 to-purple-200 opacity-20 rounded-full transform translate-x-1/3 translate-y-1/4"></div>
      
      {/* Main content */}
      <div className="w-full max-w-xl mx-auto space-y-8 p-8 md:p-12 bg-white/90 backdrop-blur-sm shadow-xl rounded-xl mt-24 mb-24 relative z-10 border border-gray-100">
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-full shadow-lg">
          <div className="bg-white rounded-full p-2">
            <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"></path>
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-gray-800 mt-4">LinkedIn Comment </h1>
        <p className="text-center text-gray-500">Generate thoughtful comments for LinkedIn posts</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="post" className="text-gray-700 font-medium">
              Enter LinkedIn Post URL
            </Label>
            <Textarea
              id="post"
              value={post}
              onChange={(e) => setPost(e.target.value)}
              placeholder="Paste the LinkedIn post you want to comment on..."
              className="min-h-[150px] border border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-gray-800 shadow-sm"
            />
          </div>

          <ToneSelector selectedTone={tone} onToneChange={setTone} />

          <Button
            type="submit"
            disabled={isLoading || !post.trim()}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </div>
            ) : (
              "Generate Comment"
            )}
          </Button>
        </form>

        <CustomCommentBox comment={comment} isLoading={isLoading} error={error} />

        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">Want to Support?</h2>
          <p className="text-center text-gray-500 mb-6">Help us keep this tool free and improve it further</p>
          
          <div id="stripe-buy-button-container" className="flex justify-center">
            <script async src="https://js.stripe.com/v3/buy-button.js"></script>
            <StripeBuyButton />
          </div>
        </div>


<div className="text-center mt-6">
  <p className="text-sm text-gray-500 mb-2">Powered by</p>
  <Link
    href="https://nadinesbrandbuilders.com/"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center text-white gap-2 px-4 py-1.5 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 hover:from-purple-500 hover:via-pink-500 hover:to-indigo-600 border border-gray-200 rounded-full text-sm font-medium shadow-sm hover:bg-gray-50 hover:shadow-md transition-all duration-500"
    >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    Nadine's Brand Builders
  </Link>
</div>
        
        {/* Footer */}
        <div className="text-center text-gray-400 text-sm mt-8">
          <p>© {new Date().getFullYear()} LinkedIn Comment . All rights reserved.</p>
        </div>
      </div>
    </main>
  )
}
