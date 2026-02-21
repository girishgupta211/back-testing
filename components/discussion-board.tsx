"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MessageSquare, ThumbsUp, MessageCircle, Share2, Plus, Filter } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Post {
  id: string
  title: string
  content: string
  author: {
    name: string
    avatar: string
    role: string
  }
  category: string
  tags: string[]
  likes: number
  comments: number
  timestamp: string
  isLiked: boolean
}

const initialPosts: Post[] = [
  {
    id: "1",
    title: "Best practices for client onboarding?",
    content:
      "I'm looking to streamline my client onboarding process. What tools and templates do you use to make this efficient while still collecting all necessary information?",
    author: {
      name: "Rahul Sharma",
      avatar: "/avatars/01.png",
      role: "Mutual Fund Distributor",
    },
    category: "best-practices",
    tags: ["onboarding", "client-management"],
    likes: 24,
    comments: 12,
    timestamp: "2 hours ago",
    isLiked: false,
  },
  {
    id: "2",
    title: "SEBI's new mutual fund regulations - Impact analysis",
    content:
      "SEBI has introduced new regulations for mutual fund distributors. Let's discuss how these changes will affect our business and what steps we should take to adapt.",
    author: {
      name: "Priya Patel",
      avatar: "/avatars/02.png",
      role: "Senior Financial Advisor",
    },
    category: "regulatory",
    tags: ["SEBI", "regulations", "compliance"],
    likes: 56,
    comments: 28,
    timestamp: "1 day ago",
    isLiked: true,
  },
  {
    id: "3",
    title: "Handling client objections about market volatility",
    content:
      "With recent market fluctuations, many clients are getting nervous. What strategies are you using to reassure clients and prevent panic selling?",
    author: {
      name: "Amit Singh",
      avatar: "/avatars/03.png",
      role: "Wealth Manager",
    },
    category: "client-service",
    tags: ["market-volatility", "client-psychology"],
    likes: 42,
    comments: 19,
    timestamp: "3 days ago",
    isLiked: false,
  },
  {
    id: "4",
    title: "Tax-efficient investment strategies for HNI clients",
    content:
      "Looking for advanced tax planning strategies for high-net-worth individuals. What approaches have worked well for your HNI clients?",
    author: {
      name: "Neha Gupta",
      avatar: "/avatars/04.png",
      role: "Tax Planning Specialist",
    },
    category: "investment-strategies",
    tags: ["tax-planning", "HNI", "wealth-management"],
    likes: 38,
    comments: 15,
    timestamp: "5 days ago",
    isLiked: false,
  },
]

export function DiscussionBoard() {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showNewPostForm, setShowNewPostForm] = useState(false)
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "general",
    tags: "",
  })

  const filteredPosts = posts.filter((post) => {
    // Filter by tab
    if (activeTab !== "all" && post.category !== activeTab) {
      return false
    }

    // Filter by search query
    if (
      searchQuery &&
      !post.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !post.content.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    return true
  })

  const handleLike = (id: string) => {
    setPosts(
      posts.map((post) =>
        post.id === id
          ? {
              ...post,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              isLiked: !post.isLiked,
            }
          : post,
      ),
    )
  }

  const handleSubmitPost = () => {
    const newPostObj: Post = {
      id: Date.now().toString(),
      title: newPost.title,
      content: newPost.content,
      author: {
        name: "You",
        avatar: "/avatars/01.png",
        role: "Mutual Fund Distributor",
      },
      category: newPost.category,
      tags: newPost.tags.split(",").map((tag) => tag.trim()),
      likes: 0,
      comments: 0,
      timestamp: "Just now",
      isLiked: false,
    }

    setPosts([newPostObj, ...posts])
    setNewPost({
      title: "",
      content: "",
      category: "general",
      tags: "",
    })
    setShowNewPostForm(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Discussion Board</h2>
          <p className="text-sm text-muted-foreground">Connect with other distributors and share insights</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search discussions..."
              className="pl-8 w-[200px] md:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
          <Button onClick={() => setShowNewPostForm(true)}>
            <Plus className="h-4 w-4 mr-2" /> New Post
          </Button>
        </div>
      </div>

      {showNewPostForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Post</CardTitle>
            <CardDescription>Share your thoughts or questions with the community</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Input
                placeholder="Post title"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Textarea
                placeholder="Write your post here..."
                rows={5}
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Tabs value={newPost.category} onValueChange={(value) => setNewPost({ ...newPost, category: value })}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="question">Question</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div className="space-y-2">
                <Input
                  placeholder="Tags (comma separated)"
                  value={newPost.tags}
                  onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setShowNewPostForm(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitPost} disabled={!newPost.title || !newPost.content}>
              Post
            </Button>
          </CardFooter>
        </Card>
      )}

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Posts</TabsTrigger>
          <TabsTrigger value="best-practices">Best Practices</TabsTrigger>
          <TabsTrigger value="regulatory">Regulatory</TabsTrigger>
          <TabsTrigger value="investment-strategies">Investment Strategies</TabsTrigger>
          <TabsTrigger value="client-service">Client Service</TabsTrigger>
        </TabsList>

        <div className="space-y-4 mt-6">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-10 border rounded-md">
              <MessageSquare className="h-10 w-10 mx-auto text-muted-foreground" />
              <p className="mt-2 text-muted-foreground">No discussions found. Start a new conversation!</p>
              <Button className="mt-4" onClick={() => setShowNewPostForm(true)}>
                <Plus className="h-4 w-4 mr-2" /> New Post
              </Button>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <Card key={post.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={post.author.avatar} alt={post.author.name} />
                        <AvatarFallback>
                          {post.author.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{post.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm font-medium">{post.author.name}</span>
                          <span className="text-xs text-muted-foreground">• {post.timestamp}</span>
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <circle cx="12" cy="12" r="1" />
                            <circle cx="12" cy="5" r="1" />
                            <circle cx="12" cy="19" r="1" />
                          </svg>
                          <span className="sr-only">More</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Save Post</DropdownMenuItem>
                        <DropdownMenuItem>Report</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm">{post.content}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`flex items-center gap-1 ${post.isLiked ? "text-primary" : ""}`}
                      onClick={() => handleLike(post.id)}
                    >
                      <ThumbsUp className="h-4 w-4" />
                      <span>{post.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>{post.comments}</span>
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Trending Topics</CardTitle>
          <CardDescription>Popular discussions in the community</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <MessageSquare className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium">Impact of Budget 2023 on Mutual Fund Industry</p>
                <p className="text-xs text-muted-foreground">56 comments • 120 likes • Started by Rajesh Kumar</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <MessageSquare className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium">Digital Tools for Client Portfolio Management</p>
                <p className="text-xs text-muted-foreground">42 comments • 98 likes • Started by Ananya Desai</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <MessageSquare className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium">Strategies for Acquiring HNI Clients</p>
                <p className="text-xs text-muted-foreground">38 comments • 85 likes • Started by Vikram Mehta</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
