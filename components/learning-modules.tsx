"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, BookOpen, Video, FileText, Filter } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface LearningModule {
  id: string
  title: string
  description: string
  type: "course" | "video" | "article"
  duration: string
  level: "beginner" | "intermediate" | "advanced"
  tags: string[]
  progress?: number
  instructor?: string
  rating?: number
}

const learningModules: LearningModule[] = [
  {
    id: "1",
    title: "Fundamentals of Mutual Fund Distribution",
    description: "Learn the basics of mutual fund distribution, regulatory framework, and client management.",
    type: "course",
    duration: "4 hours",
    level: "beginner",
    tags: ["basics", "regulation", "client-management"],
    progress: 75,
    instructor: "Rajesh Kumar",
    rating: 4.8,
  },
  {
    id: "2",
    title: "Advanced Tax Planning Strategies",
    description: "Master advanced tax planning techniques for high-net-worth individuals using mutual funds.",
    type: "course",
    duration: "6 hours",
    level: "advanced",
    tags: ["tax-planning", "HNI", "strategies"],
    progress: 30,
    instructor: "Priya Singh",
    rating: 4.9,
  },
  {
    id: "3",
    title: "Digital Marketing for Financial Advisors",
    description: "Learn how to leverage digital marketing to grow your mutual fund distribution business.",
    type: "course",
    duration: "5 hours",
    level: "intermediate",
    tags: ["marketing", "digital", "growth"],
    instructor: "Amit Patel",
    rating: 4.7,
  },
  {
    id: "4",
    title: "Understanding SEBI's New Mutual Fund Regulations",
    description: "A comprehensive overview of the latest SEBI regulations affecting mutual fund distributors.",
    type: "video",
    duration: "45 minutes",
    level: "intermediate",
    tags: ["regulation", "SEBI", "compliance"],
    instructor: "Neha Gupta",
    rating: 4.6,
  },
  {
    id: "5",
    title: "Client Psychology: Managing Investor Behavior During Market Volatility",
    description: "Strategies to help clients make rational decisions during market downturns and volatility.",
    type: "video",
    duration: "30 minutes",
    level: "intermediate",
    tags: ["psychology", "behavior", "volatility"],
    progress: 50,
    instructor: "Vikram Mehta",
    rating: 4.8,
  },
  {
    id: "6",
    title: "Building a Referral Network: Strategies for Organic Growth",
    description: "Learn proven techniques to generate quality referrals and grow your client base organically.",
    type: "article",
    duration: "15 minutes",
    level: "beginner",
    tags: ["referrals", "growth", "networking"],
    instructor: "Ananya Desai",
    rating: 4.5,
  },
  {
    id: "7",
    title: "Portfolio Construction: Balancing Risk and Return",
    description: "Advanced techniques for constructing well-balanced portfolios for different client risk profiles.",
    type: "article",
    duration: "20 minutes",
    level: "advanced",
    tags: ["portfolio", "risk-management", "asset-allocation"],
    instructor: "Suresh Reddy",
    rating: 4.7,
  },
]

export function LearningModules() {
  const getModuleIcon = (type: LearningModule["type"]) => {
    switch (type) {
      case "course":
        return <BookOpen className="h-5 w-5" />
      case "video":
        return <Video className="h-5 w-5" />
      case "article":
        return <FileText className="h-5 w-5" />
      default:
        return <BookOpen className="h-5 w-5" />
    }
  }

  const getLevelBadge = (level: LearningModule["level"]) => {
    switch (level) {
      case "beginner":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-800/20 dark:text-green-400">
            Beginner
          </Badge>
        )
      case "intermediate":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-800/20 dark:text-blue-400">
            Intermediate
          </Badge>
        )
      case "advanced":
        return (
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 dark:bg-purple-800/20 dark:text-purple-400">
            Advanced
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Learning Modules</h2>
          <p className="text-sm text-muted-foreground">Enhance your skills and knowledge</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search modules..." className="pl-8 w-[200px] md:w-[300px]" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="courses" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" /> Courses
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex items-center gap-2">
            <Video className="h-4 w-4" /> Videos
          </TabsTrigger>
          <TabsTrigger value="articles" className="flex items-center gap-2">
            <FileText className="h-4 w-4" /> Articles
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {learningModules.map((module) => (
              <Card key={module.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getModuleIcon(module.type)}
                        <span className="text-xs text-muted-foreground">{module.type}</span>
                      </div>
                      {getLevelBadge(module.level)}
                    </div>
                    <h3 className="font-medium mb-1">{module.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{module.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                      <span>{module.duration}</span>
                      {module.instructor && <span>By {module.instructor}</span>}
                    </div>
                    {module.progress !== undefined && (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span>Progress</span>
                          <span>{module.progress}%</span>
                        </div>
                        <Progress value={module.progress} className="h-1" />
                      </div>
                    )}
                  </div>
                  <div className="border-t p-3 bg-muted/30 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {module.rating && (
                        <>
                          <span className="text-yellow-500">★</span>
                          <span className="text-sm">{module.rating}</span>
                        </>
                      )}
                    </div>
                    <Button size="sm">
                      {module.progress !== undefined && module.progress > 0 ? "Continue" : "Start"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="courses" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {learningModules
              .filter((module) => module.type === "course")
              .map((module) => (
                <Card key={module.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getModuleIcon(module.type)}
                          <span className="text-xs text-muted-foreground">{module.type}</span>
                        </div>
                        {getLevelBadge(module.level)}
                      </div>
                      <h3 className="font-medium mb-1">{module.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{module.description}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                        <span>{module.duration}</span>
                        {module.instructor && <span>By {module.instructor}</span>}
                      </div>
                      {module.progress !== undefined && (
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span>Progress</span>
                            <span>{module.progress}%</span>
                          </div>
                          <Progress value={module.progress} className="h-1" />
                        </div>
                      )}
                    </div>
                    <div className="border-t p-3 bg-muted/30 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {module.rating && (
                          <>
                            <span className="text-yellow-500">★</span>
                            <span className="text-sm">{module.rating}</span>
                          </>
                        )}
                      </div>
                      <Button size="sm">
                        {module.progress !== undefined && module.progress > 0 ? "Continue" : "Start"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="videos" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {learningModules
              .filter((module) => module.type === "video")
              .map((module) => (
                <Card key={module.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getModuleIcon(module.type)}
                          <span className="text-xs text-muted-foreground">{module.type}</span>
                        </div>
                        {getLevelBadge(module.level)}
                      </div>
                      <h3 className="font-medium mb-1">{module.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{module.description}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                        <span>{module.duration}</span>
                        {module.instructor && <span>By {module.instructor}</span>}
                      </div>
                      {module.progress !== undefined && (
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span>Progress</span>
                            <span>{module.progress}%</span>
                          </div>
                          <Progress value={module.progress} className="h-1" />
                        </div>
                      )}
                    </div>
                    <div className="border-t p-3 bg-muted/30 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {module.rating && (
                          <>
                            <span className="text-yellow-500">★</span>
                            <span className="text-sm">{module.rating}</span>
                          </>
                        )}
                      </div>
                      <Button size="sm">
                        {module.progress !== undefined && module.progress > 0 ? "Continue" : "Start"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="articles" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {learningModules
              .filter((module) => module.type === "article")
              .map((module) => (
                <Card key={module.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getModuleIcon(module.type)}
                          <span className="text-xs text-muted-foreground">{module.type}</span>
                        </div>
                        {getLevelBadge(module.level)}
                      </div>
                      <h3 className="font-medium mb-1">{module.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{module.description}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                        <span>{module.duration}</span>
                        {module.instructor && <span>By {module.instructor}</span>}
                      </div>
                    </div>
                    <div className="border-t p-3 bg-muted/30 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {module.rating && (
                          <>
                            <span className="text-yellow-500">★</span>
                            <span className="text-sm">{module.rating}</span>
                          </>
                        )}
                      </div>
                      <Button size="sm">Read</Button>
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
