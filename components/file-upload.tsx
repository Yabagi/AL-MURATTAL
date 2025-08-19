"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, File, X, CheckCircle, AlertCircle, ImageIcon, FileText, Download } from "lucide-react"

interface FileUploadProps {
  title?: string
  description?: string
  acceptedTypes?: string[]
  maxFileSize?: number // in MB
  maxFiles?: number
  onFilesUploaded?: (files: UploadedFile[]) => void
  existingFiles?: UploadedFile[]
}

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  url?: string
  uploadProgress?: number
  status: "uploading" | "completed" | "error"
  error?: string
}

export function FileUpload({
  title = "Upload Files",
  description = "Drag and drop files here or click to browse",
  acceptedTypes = ["image/*", "application/pdf", ".doc", ".docx"],
  maxFileSize = 10,
  maxFiles = 5,
  onFilesUploaded,
  existingFiles = [],
}: FileUploadProps) {
  const [files, setFiles] = useState<UploadedFile[]>(existingFiles)
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return

    const newFiles: UploadedFile[] = []

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i]

      // Check file size
      if (file.size > maxFileSize * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is ${maxFileSize}MB.`)
        continue
      }

      // Check file type
      const isValidType = acceptedTypes.some((type) => {
        if (type.includes("*")) {
          return file.type.startsWith(type.replace("*", ""))
        }
        return file.type === type || file.name.toLowerCase().endsWith(type)
      })

      if (!isValidType) {
        alert(`File ${file.name} is not a supported file type.`)
        continue
      }

      // Check max files limit
      if (files.length + newFiles.length >= maxFiles) {
        alert(`Maximum ${maxFiles} files allowed.`)
        break
      }

      const uploadedFile: UploadedFile = {
        id: `file_${Date.now()}_${i}`,
        name: file.name,
        size: file.size,
        type: file.type,
        uploadProgress: 0,
        status: "uploading",
      }

      newFiles.push(uploadedFile)
    }

    if (newFiles.length > 0) {
      setFiles((prev) => [...prev, ...newFiles])

      // Simulate file upload
      newFiles.forEach((file) => {
        simulateUpload(file)
      })
    }
  }

  const simulateUpload = async (file: UploadedFile) => {
    // Simulate upload progress
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200))

      setFiles((prev) => prev.map((f) => (f.id === file.id ? { ...f, uploadProgress: progress } : f)))
    }

    // Simulate upload completion
    const success = Math.random() > 0.1 // 90% success rate

    setFiles((prev) =>
      prev.map((f) =>
        f.id === file.id
          ? {
              ...f,
              status: success ? "completed" : "error",
              error: success ? undefined : "Upload failed. Please try again.",
              url: success ? `https://example.com/files/${file.id}` : undefined,
            }
          : f,
      ),
    )

    // Call callback if provided
    if (success && onFilesUploaded) {
      const completedFiles = files.filter((f) => f.status === "completed")
      onFilesUploaded(completedFiles)
    }
  }

  const removeFile = (fileId: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId))
  }

  const retryUpload = (file: UploadedFile) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === file.id ? { ...f, status: "uploading", uploadProgress: 0, error: undefined } : f)),
    )
    simulateUpload(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return ImageIcon
    if (type.includes("pdf") || type.includes("document")) return FileText
    return File
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragOver ? "border-primary bg-primary/5" : "border-gray-300 hover:border-gray-400"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-lg font-medium mb-2">Drop files here</p>
          <p className="text-gray-600 mb-4">or</p>
          <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
            Browse Files
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={acceptedTypes.join(",")}
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
          />
          <p className="text-xs text-gray-500 mt-4">
            Supported: {acceptedTypes.join(", ")} • Max {maxFileSize}MB per file • Up to {maxFiles} files
          </p>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium">
              Uploaded Files ({files.length}/{maxFiles})
            </h4>
            {files.map((file) => {
              const FileIcon = getFileIcon(file.type)

              return (
                <div key={file.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  <FileIcon className="h-8 w-8 text-gray-500 flex-shrink-0" />

                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{file.name}</p>
                    <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>

                    {file.status === "uploading" && (
                      <div className="mt-2">
                        <Progress value={file.uploadProgress} className="h-2" />
                        <p className="text-xs text-gray-500 mt-1">Uploading... {file.uploadProgress}%</p>
                      </div>
                    )}

                    {file.status === "error" && (
                      <Alert className="mt-2">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription className="text-sm">{file.error}</AlertDescription>
                      </Alert>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {file.status === "completed" && (
                      <>
                        <Badge variant="default" className="bg-green-100 text-green-700">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Uploaded
                        </Badge>
                        {file.url && (
                          <Button size="sm" variant="outline" asChild>
                            <a href={file.url} target="_blank" rel="noopener noreferrer">
                              <Download className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </>
                    )}

                    {file.status === "error" && (
                      <Button size="sm" variant="outline" onClick={() => retryUpload(file)}>
                        Retry
                      </Button>
                    )}

                    <Button size="sm" variant="ghost" onClick={() => removeFile(file.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
