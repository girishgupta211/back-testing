"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { FileUp, CheckCircle2, AlertCircle, Sparkles, FileText, Upload, Eye, Clock, RefreshCw } from "lucide-react"

export function KYCAutomation() {
  const [activeTab, setActiveTab] = useState("upload")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [extractedData, setExtractedData] = useState<Record<string, string> | null>(null)
  const [complianceIssues, setComplianceIssues] = useState<string[]>([])

  // Sample KYC data for demonstration
  const sampleKYCData = {
    "Full Name": "Rahul Sharma",
    "Date of Birth": "15/05/1980",
    "PAN Number": "ABCPS1234D",
    "Aadhaar Number": "1234 5678 9012",
    Address: "123, Park Street, Bandra West, Mumbai - 400050, Maharashtra",
    "Mobile Number": "+91 98765 43210",
    Email: "rahul.sharma@example.com",
    Occupation: "Business Owner",
    "Annual Income": "₹25,00,000 - ₹50,00,000",
    "Source of Wealth": "Business Income, Investments",
    "Risk Profile": "Moderate",
    "Politically Exposed Person": "No",
    "Bank Account Number": "1234567890",
    "IFSC Code": "SBIN0001234",
    "Bank Name": "State Bank of India",
    "Nominee Name": "Priya Sharma",
    "Nominee Relationship": "Spouse",
  }

  const sampleComplianceIssues = [
    "Address proof document is more than 3 months old",
    "Signature on form doesn't match signature on PAN card",
    "Income proof document missing",
  ]

  const handleUpload = () => {
    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setIsProcessing(true)

          // Simulate processing time
          setTimeout(() => {
            setIsProcessing(false)
            setIsComplete(true)
            setExtractedData(sampleKYCData)
            setComplianceIssues(sampleComplianceIssues)
            setActiveTab("review")
          }, 3000)

          return 100
        }
        return prev + 5
      })
    }, 150)
  }

  const handleReset = () => {
    setIsUploading(false)
    setUploadProgress(0)
    setIsProcessing(false)
    setIsComplete(false)
    setExtractedData(null)
    setComplianceIssues([])
    setActiveTab("upload")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#0496ff]" /> AI-Powered KYC Automation
          </h2>
          <p className="text-sm text-muted-foreground">Streamline client onboarding with AI document processing</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload">Upload Documents</TabsTrigger>
          <TabsTrigger value="review" disabled={!isComplete}>
            Review & Edit
          </TabsTrigger>
          <TabsTrigger value="submit" disabled={!isComplete}>
            Submit & Verify
          </TabsTrigger>
        </TabsList>

        {/* Upload Tab */}
        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload KYC Documents</CardTitle>
              <CardDescription>
                Upload client KYC documents for AI processing. Supported formats: PDF, JPG, PNG.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="client-name">Client Name</Label>
                  <Input id="client-name" placeholder="Enter client name" />
                </div>

                <div className="grid gap-3">
                  <Label>Document Type</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="pan-card" className="rounded border-gray-400" />
                      <Label htmlFor="pan-card" className="font-normal">
                        PAN Card
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="aadhaar" className="rounded border-gray-400" />
                      <Label htmlFor="aadhaar" className="font-normal">
                        Aadhaar Card
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="address-proof" className="rounded border-gray-400" />
                      <Label htmlFor="address-proof" className="font-normal">
                        Address Proof
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="income-proof" className="rounded border-gray-400" />
                      <Label htmlFor="income-proof" className="font-normal">
                        Income Proof
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="bank-statement" className="rounded border-gray-400" />
                      <Label htmlFor="bank-statement" className="font-normal">
                        Bank Statement
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="photo" className="rounded border-gray-400" />
                      <Label htmlFor="photo" className="font-normal">
                        Photograph
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="grid gap-3">
                  <Label>Upload Documents</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                    <FileUp className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-1">Drag and drop files here or click to browse</p>
                    <p className="text-xs text-muted-foreground">
                      Supported formats: PDF, JPG, PNG (Max 10MB per file)
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={handleUpload}
                      disabled={isUploading || isProcessing}
                    >
                      <Upload className="h-4 w-4 mr-2" /> Select Files
                    </Button>
                  </div>
                </div>

                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Uploading documents...</span>
                      <span className="text-sm">{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}

                {isProcessing && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        <span className="text-sm">Processing documents with AI...</span>
                      </div>
                    </div>
                    <Progress value={100} className="h-2 animate-pulse" />
                  </div>
                )}

                {isComplete && (
                  <Alert className="bg-green-500/10 border-green-500/30">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <AlertTitle className="text-green-500">Processing Complete</AlertTitle>
                    <AlertDescription>
                      Documents have been processed successfully. Please review the extracted information.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleReset} disabled={isUploading || isProcessing}>
                Reset
              </Button>
              <Button
                onClick={() => isComplete && setActiveTab("review")}
                disabled={!isComplete || isUploading || isProcessing}
              >
                {isUploading || isProcessing ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 mr-2" />
                    Review Data
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Review Tab */}
        <TabsContent value="review" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Review Extracted Data</CardTitle>
              <CardDescription>
                AI has extracted the following information from the uploaded documents. Please review and edit if
                necessary.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {extractedData && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(extractedData).map(([key, value]) => (
                      <div key={key} className="space-y-2">
                        <Label htmlFor={key.toLowerCase().replace(/\s+/g, "-")}>{key}</Label>
                        <Input id={key.toLowerCase().replace(/\s+/g, "-")} defaultValue={value} />
                      </div>
                    ))}
                  </div>

                  {complianceIssues.length > 0 && (
                    <Alert className="bg-amber-500/10 border-amber-500/30 mt-6">
                      <AlertCircle className="h-4 w-4 text-amber-500" />
                      <AlertTitle className="text-amber-500">Compliance Issues Detected</AlertTitle>
                      <AlertDescription>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                          {complianceIssues.map((issue, index) => (
                            <li key={index} className="text-sm">
                              {issue}
                            </li>
                          ))}
                        </ul>
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea id="notes" placeholder="Add any additional notes or instructions here..." rows={3} />
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("upload")}>
                Back
              </Button>
              <Button onClick={() => setActiveTab("submit")}>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Proceed to Submit
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Submit Tab */}
        <TabsContent value="submit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Submit KYC Information</CardTitle>
              <CardDescription>Review the final information before submitting to regulatory systems.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Alert className="bg-blue-500/10 border-blue-500/30">
                  <FileText className="h-4 w-4 text-blue-500" />
                  <AlertTitle className="text-blue-500">Submission Ready</AlertTitle>
                  <AlertDescription>
                    The KYC information is ready to be submitted to regulatory systems. This will initiate the
                    verification process.
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="confirm-accuracy" className="rounded border-gray-400" />
                    <Label htmlFor="confirm-accuracy" className="font-normal text-sm">
                      I confirm that all information is accurate and verified
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="confirm-consent" className="rounded border-gray-400" />
                    <Label htmlFor="confirm-consent" className="font-normal text-sm">
                      I confirm that client has provided consent for data processing
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="confirm-documents" className="rounded border-gray-400" />
                    <Label htmlFor="confirm-documents" className="font-normal text-sm">
                      I confirm that all required documents have been collected
                    </Label>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="text-sm font-medium mb-2">Submission Timeline</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-7 w-7 rounded-full bg-green-500/20 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Document Processing</p>
                        <p className="text-xs text-muted-foreground">Completed</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="h-7 w-7 rounded-full bg-green-500/20 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Data Extraction</p>
                        <p className="text-xs text-muted-foreground">Completed</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="h-7 w-7 rounded-full bg-amber-500/20 flex items-center justify-center">
                        <Clock className="h-4 w-4 text-amber-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Regulatory Submission</p>
                        <p className="text-xs text-muted-foreground">Pending</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Verification</p>
                        <p className="text-xs text-muted-foreground">Pending</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("review")}>
                Back
              </Button>
              <Button>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Submit KYC Information
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
