"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { MoreHorizontal } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import axios from "axios"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Post {
  id: string
  user_name: string
  user_real_name: string
  user_profile_image_url: string
  description: string
  image: string,
  color: {h: number, s: number, l: number},
  connection: {
    id: string,
    name: string,
    source: string,
    link: string,
  },
  image_size: {
    width: number
    height: number
  }
  posted_at: string
  hashtags: string[]
  link: string
}

interface SocialWallProps {
  feedUrl: string
  initialData?: {
    data: Post[]
    pagination: {
      next_offset: number
      total: number
      next_url: string
    }
  }
}

export default function SocialWall({ initialData, feedUrl: initialFeedUrl }: SocialWallProps) {
  const [feedUrl, setFeedUrl] = useState(initialFeedUrl)  
  const [data, setData] = useState(initialData)
  const [loading, setLoading] = useState(!initialData)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!initialData) {
      // This would be where you'd fetch the data if not provided as props      
    }
  }, [initialData])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-4 text-center">
        <h3 className="text-xl font-semibold mb-2">Unable to load posts</h3>
        <p className="text-muted-foreground">{error || "No data available"}</p>
      </div>
    )
  }

  const handleFeedChange = () => {
    setFeedUrl(feedUrl)
    setData({data: [], pagination: {next_offset: 0, total: 0, next_url: ""}})
    handleLoadMore(feedUrl)
  }
  const handleLoadMore = async (url: string) => {
    if (!url) {
      return
    }
    try {
      const response = await axios.get(url);
      const newData = response.data;
      setData(prevData => {
        if (!prevData) {
          return {
            data: newData.data,
            pagination: newData.pagination
          };
        }
        return {
          ...prevData,
          data: [...prevData.data, ...newData.data],
          pagination: newData.pagination
        };
      });
    } catch (error) {
      console.error('Failed to fetch more posts:', error);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-4 mb-8">
        <h1 className="text-3xl font-bold">Social Wall</h1>
        <div className="flex gap-2">
          <Input
            type="url"
            placeholder="Enter feed URL"
            value={feedUrl}
            onChange={(e) => setFeedUrl(e.target.value)}
            className="max-w-md"
          />
          <Button onClick={handleFeedChange}>Load Feed</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.data.map((post) => (
          <Card key={post.id} className="overflow-hidden py-4 gap-2">
            <CardHeader className="space-y-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {post.user_profile_image_url && <Avatar className="w-8 h-8 border">
                    <AvatarImage src={post.user_profile_image_url} alt={post.user_name} />
                    <AvatarFallback>{post.user_name?.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>}
                  {!post.user_profile_image_url && <Avatar className="w-8 h-8 border">
                    <AvatarFallback>{(post.user_name)?.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>}
                  <div>
                    <Link
                      href={post.connection?.link || post.link || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-medium hover:underline"
                    >
                      {post.user_name || post.connection?.name}
                    </Link>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">More options</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Link href={post.link} target="_blank" className="flex w-full">
                        View original post
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative aspect-square" style={{backgroundColor: post.color ? `hsl(${post.color.h}, ${post.color.s}%, ${post.color.l}%)` : 'transparent'}}>
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.description?.split("#")[0] || "Instagram post"}
                  fill
                  className="object-cover"
                  unoptimized={true}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start p-4 space-y-3">
            
              <div className="text-base">
                <p className="line-clamp-2">
                  {post.user_name && <span className="font-semibold mr-1">{post.user_name}</span>}
                  {post.description?.split("#")[0]}
                </p>
                <div className="mt-1 text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(post.posted_at), { addSuffix: true })}
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {post.hashtags?.slice(0, 3).map((tag, index) => (
                  <span key={index} className="text-sm text-primary hover:underline">
                    #{tag}
                  </span>
                ))}
                {post.hashtags?.length > 3 && (
                  <span className="text-sm text-muted-foreground">+{post.hashtags.length - 3} more</span>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {data.pagination && data.pagination.next_url && (
        <div className="flex justify-center mt-8">
          <Button 
            variant="outline" 
            onClick={() => handleLoadMore(data.pagination.next_url)}
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  )
}

