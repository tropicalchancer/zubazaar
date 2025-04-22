"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { submitItem } from "@/app/actions/submitItem"

const TRACK_OPTIONS = [
  "d/acc",
  "privacy",
  "biotech",
  "social innovation",
  "deep tech",
  "network states",
  "Other"
] as const

export default function SimpleSubmitForm() {
  const [open, setOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    await submitItem(formData)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#25ff61] text-black hover:bg-[#25ff61]/90">Submit Project</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Submit a new project</DialogTitle>
            <DialogDescription>Share your project with the Zuzalu community.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter project name"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Briefly describe what this project does"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="url">Project URL</Label>
              <Input
                id="url"
                name="url"
                type="url"
                placeholder="https://example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="track">Track</Label>
              <Select name="track">
                <SelectTrigger>
                  <SelectValue placeholder="Select a track" />
                </SelectTrigger>
                <SelectContent>
                  {TRACK_OPTIONS.map((track) => (
                    <SelectItem key={track} value={track}>
                      {track}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                name="tags"
                placeholder="Enter tags separated by commas"
              />
              <span className="text-xs text-muted-foreground">
                Separate tags with commas (e.g., blockchain, web3, community)
              </span>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-[#25ff61] text-black hover:bg-[#25ff61]/90">
              Submit Project
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
