import { useState, useEffect } from "react"
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
  initialData?: {
    data: Post[]
    pagination: {
      next_offset: number
      total: number
      next_url: string
    }
  }
}


export default function SocialWall({ initialData }: SocialWallProps) {
  
  const defaultFeedUrl =  'https://feed.contentfry.com/' + (['cats', 'auto', 'demo'][Math.floor(Math.random() * 3)])
  const params = new URLSearchParams(window.location.search);  
  const [feedUrl, setFeedUrl] = useState(params.get('feedUrl') || defaultFeedUrl)
  const [payload, setPayload] = useState(initialData)
  const [loading, setLoading] = useState(!initialData)
  const [error, setError] = useState(null)


  const handleFeedChange = () => {
    setFeedUrl(feedUrl)
    setPayload({data: [], pagination: {next_offset: 0, total: 0, next_url: ""}})
    handleLoadMore(feedUrl)
    setLoading(false)
  }

  const handleLoadMore = async (url: string) => {
    if (!url) {
      return
    }
    try {
      const response = await axios.get(url);
      const newData = response.data;
      setPayload(prevData => {
        if (!prevData) {
          return {
            data: newData.data,
            pagination: newData.pagination,
            meta: newData.meta
          };
        }
        return {
          ...prevData,
          data: [...prevData.data, ...newData.data],
          pagination: newData.pagination
        };
      });
      } catch (error) {
        setError("Failed to fetch feed")
        console.error('Failed to fetch more posts:', error);
      }
  }
  

  useEffect(() => {
    if (!initialData) {
      // This would be where you'd fetch the data if not provided as props      
      handleFeedChange()
    }
  }, [initialData])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-4 mb-8">
      <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Social Wall</h1>
          <Button
            asChild
            variant="outline"
            className="gap-2"
          >
            <a
              href="https://github.com/contentfry/contentfry-starter/tree/main/examples/react-social-wall" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>View source code</span>
            </a>
          </Button>
        </div>
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


      {error && <div className="text-red-500">{error}</div> }

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {payload.data.map((post, index) => (
          <Card key={index} className="overflow-hidden py-4 gap-2">
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
                    <a
                      href={post.connection?.link || post.link || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-medium hover:underline"
                    >
                      {post.user_name || post.connection?.name}
                    </a>
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
                      <a href={post.link} target="_blank" className="flex w-full">
                        View original post
                      </a>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative aspect-square" style={{backgroundColor: post.color ? `hsl(${post.color.h}, ${post.color.s}%, ${post.color.l}%)` : 'transparent'}}>
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.description?.split("#")[0] || "Instagram post"}
                  className="object-cover w-full h-full"
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

      {payload.pagination && payload.pagination.next_url && (
        <div className="flex justify-center mt-8">
          <Button 
            variant="outline" 
            onClick={() => handleLoadMore(payload.pagination.next_url)}
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  )
}
