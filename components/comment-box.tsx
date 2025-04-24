"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"

interface CommentBoxProps {
  comment: string
  isLoading: boolean
  error: string | null
}

export function CommentBox({ comment, isLoading, error }: CommentBoxProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    if (!comment) return

    navigator.clipboard.writeText(comment)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <div className="relative mt-6">
      <div className="border border-[#e5e7eb] rounded-lg p-4 min-h-[120px] relative">
        {comment && (
          <Button
            onClick={copyToClipboard}
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 text-gray-500 hover:text-[#cc31e0] hover:bg-transparent"
          >
            {copied ? <span className="text-[#cc31e0] text-xs font-medium">Copied!</span> : <Copy size={16} />}
          </Button>
        )}

        <div className="text-[#1c1c1e] pr-8">
          {isLoading ? (
            <p className="text-gray-500">Generating...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : comment ? (
            <p>{comment}</p>
          ) : (
            <p className="text-gray-400">Your generated comment will appear here.</p>
          )}
        </div>
      </div>
    </div>
  )
}
