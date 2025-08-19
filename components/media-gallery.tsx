"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageIcon, Video, Upload, Eye, Download, Share } from "lucide-react"

interface MediaItem {
  id: string
  title: string
  type: "image" | "video"
  url: string
  thumbnail: string
  event: string
  school: string
  uploadDate: string
  views: number
  size: string
}

export default function MediaGallery() {
  const [mediaItems] = useState<MediaItem[]>([
    {
      id: "1",
      title: "Quran Competition Finals",
      type: "video",
      url: "/quran-competition-video.png",
      thumbnail: "/quran-competition-thumbnail.png",
      event: "International Musabaqah 2024",
      school: "Global Event",
      uploadDate: "2024-08-10",
      views: 1250,
      size: "45.2 MB",
    },
    {
      id: "2",
      title: "Graduation Ceremony Photos",
      type: "image",
      url: "/graduation-ceremony.png",
      thumbnail: "/graduation-ceremony.png",
      event: "Annual Graduation",
      school: "Madrasa Al-Noor",
      uploadDate: "2024-07-30",
      views: 890,
      size: "2.1 MB",
    },
    {
      id: "3",
      title: "Teacher Training Workshop",
      type: "video",
      url: "/teacher-training-session.png",
      thumbnail: "/teacher-training-session.png",
      event: "Professional Development",
      school: "Regional Training Center",
      uploadDate: "2024-08-20",
      views: 567,
      size: "128.5 MB",
    },
    {
      id: "4",
      title: "New Campus Opening",
      type: "image",
      url: "/campus-opening.png",
      thumbnail: "/campus-opening.png",
      event: "Campus Inauguration",
      school: "Dar Al-Uloom Cairo",
      uploadDate: "2024-08-05",
      views: 432,
      size: "3.7 MB",
    },
  ])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Media Gallery</h2>
          <p className="text-muted-foreground">Photos and videos from events and activities</p>
        </div>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Upload Media
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Media</CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">1,247</div>
            <p className="text-xs text-muted-foreground">Photos & videos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Photos</CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">1,089</div>
            <p className="text-xs text-muted-foreground">Image files</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Videos</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">158</div>
            <p className="text-xs text-muted-foreground">Video files</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">45.2K</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Media</TabsTrigger>
          <TabsTrigger value="images">Photos</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mediaItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="relative">
                  <img
                    src={item.thumbnail || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant={item.type === "video" ? "default" : "secondary"}>
                      {item.type === "video" ? (
                        <Video className="h-3 w-3 mr-1" />
                      ) : (
                        <ImageIcon className="h-3 w-3 mr-1" />
                      )}
                      {item.type.toUpperCase()}
                    </Badge>
                  </div>
                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/50 rounded-full p-3">
                        <Video className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  )}
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base line-clamp-2">{item.title}</CardTitle>
                  <CardDescription>
                    <div className="space-y-1">
                      <p>{item.event}</p>
                      <p className="text-xs">{item.school}</p>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center text-xs text-muted-foreground mb-3">
                    <span>{new Date(item.uploadDate).toLocaleDateString()}</span>
                    <span>{item.views} views</span>
                    <span>{item.size}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Share className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
