"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, FileText, Save, Plus, Trash2 } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function NotesModal({ subject, onClose }) {
  const { toast } = useToast()
  const [notes, setNotes] = useState(subject?.notes || "")
  const [newNoteTitle, setNewNoteTitle] = useState("")
  const [newNoteContent, setNewNoteContent] = useState("")
  const [savedNotes, setSavedNotes] = useState([
    { id: 1, title: "Key Concepts", content: "Important definitions and theories for the subject." },
    { id: 2, title: "Exam Prep", content: "Topics to focus on for the upcoming exam." },
  ])

  if (!subject) return null

  const handleSaveNotes = () => {
    // In a real app, this would save to a backend
    toast({
      title: "Notes Saved",
      description: "Your personal notes have been updated.",
    })
  }

  const handleAddNote = () => {
    if (newNoteTitle.trim() && newNoteContent.trim()) {
      const newNote = {
        id: savedNotes.length + 1,
        title: newNoteTitle.trim(),
        content: newNoteContent.trim(),
      }
      setSavedNotes([...savedNotes, newNote])
      setNewNoteTitle("")
      setNewNoteContent("")
      toast({
        title: "Note Added",
        description: `"${newNote.title}" has been added to your notes.`,
      })
    } else {
      toast({
        title: "Missing Information",
        description: "Please enter both title and content for the new note.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteNote = (id) => {
    setSavedNotes(savedNotes.filter((note) => note.id !== id))
    toast({
      title: "Note Deleted",
      description: "The note has been removed.",
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Notes for {subject.name}
            </CardTitle>
            <CardDescription>Your personal notes and study materials for this subject.</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Notes</CardTitle>
              <CardDescription>Jot down quick thoughts or reminders.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Type your notes here..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={6}
              />
              <Button onClick={handleSaveNotes} className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Save Quick Notes
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Saved Notes</CardTitle>
              <CardDescription>Organized notes for specific topics.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {savedNotes.length > 0 ? (
                <div className="space-y-3">
                  {savedNotes.map((note) => (
                    <div key={note.id} className="p-3 border rounded-lg bg-muted/50">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold text-md">{note.title}</h4>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteNote(note.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">{note.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground">No saved notes yet.</div>
              )}

              <div className="space-y-2 pt-4 border-t">
                <h4 className="font-medium">Add New Note</h4>
                <Label htmlFor="new-note-title">Title</Label>
                <Input
                  id="new-note-title"
                  placeholder="e.g., Chapter 3 Summary"
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                />
                <Label htmlFor="new-note-content">Content</Label>
                <Textarea
                  id="new-note-content"
                  placeholder="Detailed notes for this topic..."
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  rows={4}
                />
                <Button onClick={handleAddNote} className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Note
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={onClose}>Close</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
