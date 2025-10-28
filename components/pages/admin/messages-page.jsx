"use client";

import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import MessagesHeader from "./messages/messages-header";
import MessagesList from "./messages/messages-list";
import MessageDetail from "./messages/message-detail";
import ComposeModal from "./messages/compose-modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function AdminMessagesPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("inbox");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showCompose, setShowCompose] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState(SAMPLE_MESSAGES);

  // Filter messages based on tab and filters
  const filteredMessages = useMemo(() => {
    const filtered = messages.filter((msg) => {
      // Filter by tab
      if (activeTab === "inbox" && msg.status === "archived") return false;
      if (activeTab === "sent" && msg.direction !== "sent") return false;
      if (activeTab === "drafts" && msg.status !== "draft") return false;
      if (activeTab === "archived" && msg.status !== "archived") return false;

      // Filter by search term
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const matchesSearch =
          msg.subject.toLowerCase().includes(term) ||
          msg.message.toLowerCase().includes(term) ||
          msg.from.name.toLowerCase().includes(term) ||
          msg.to.some((r) => r.name.toLowerCase().includes(term));
        if (!matchesSearch) return false;
      }

      // Filter by status
      if (filterStatus !== "all" && msg.status !== filterStatus) return false;

      // Filter by type
      if (filterType !== "all" && msg.type !== filterType) return false;

      // Filter by priority
      if (filterPriority !== "all" && msg.priority !== filterPriority)
        return false;

      return true;
    });

    return filtered.sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );
  }, [
    messages,
    activeTab,
    searchTerm,
    filterStatus,
    filterType,
    filterPriority,
  ]);

  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
    if (message.status === "unread") {
      setMessages((prev) =>
        prev.map((m) => (m.id === message.id ? { ...m, status: "read" } : m))
      );
    }
  };

  const handleDeleteMessage = (messageId) => {
    setMessages((prev) => prev.filter((m) => m.id !== messageId));
    setSelectedMessage(null);
    toast({
      title: "Message deleted",
      description: "The message has been permanently deleted.",
    });
  };

  const handleArchiveMessage = (messageId) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === messageId ? { ...m, status: "archived" } : m))
    );
    setSelectedMessage(null);
    toast({
      title: "Message archived",
      description: "The message has been moved to archive.",
    });
  };

  const handleBulkDelete = () => {
    setMessages((prev) => prev.filter((m) => !selectedMessages.includes(m.id)));
    setSelectedMessages([]);
    toast({
      title: "Messages deleted",
      description: `${selectedMessages.length} message(s) have been deleted.`,
    });
  };

  const handleBulkArchive = () => {
    setMessages((prev) =>
      prev.map((m) =>
        selectedMessages.includes(m.id) ? { ...m, status: "archived" } : m
      )
    );
    setSelectedMessages([]);
    toast({
      title: "Messages archived",
      description: `${selectedMessages.length} message(s) have been archived.`,
    });
  };

  const handleSendMessage = (composeData) => {
    const newMessage = {
      id: messages.length + 1,
      from: {
        name: "Admin",
        email: "admin@school.com",
        role: "Admin",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      to: composeData.recipients,
      subject: composeData.subject,
      message: composeData.message,
      type: composeData.type,
      status: composeData.scheduledDate ? "scheduled" : "sent",
      priority: composeData.priority,
      timestamp: new Date().toISOString(),
      direction: "sent",
      attachments: composeData.attachments,
      scheduledDate: composeData.scheduledDate,
      template: composeData.template,
    };

    setMessages((prev) => [newMessage, ...prev]);
    setShowCompose(false);
    toast({
      title: composeData.scheduledDate ? "Message scheduled" : "Message sent",
      description: composeData.scheduledDate
        ? `Message will be sent on ${new Date(
            composeData.scheduledDate
          ).toLocaleDateString()}`
        : "Your message has been sent successfully.",
    });
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <MessagesHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterStatus={filterStatus}
        onFilterStatusChange={setFilterStatus}
        filterType={filterType}
        onFilterTypeChange={setFilterType}
        filterPriority={filterPriority}
        onFilterPriorityChange={setFilterPriority}
        selectedCount={selectedMessages.length}
        onBulkDelete={handleBulkDelete}
        onBulkArchive={handleBulkArchive}
      />

      <div className="flex-1 overflow-hidden">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="h-full flex flex-col"
        >
          <div className="border-b px-6 pt-4">
            <div className="flex items-center justify-between mb-4">
              <TabsList className="grid w-fit grid-cols-4">
                <TabsTrigger value="inbox">
                  Inbox
                  <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                    {
                      messages.filter(
                        (m) => m.status === "unread" && m.direction !== "sent"
                      ).length
                    }
                  </span>
                </TabsTrigger>
                <TabsTrigger value="sent">Sent</TabsTrigger>
                <TabsTrigger value="drafts">Drafts</TabsTrigger>
                <TabsTrigger value="archived">Archived</TabsTrigger>
              </TabsList>
              <Button onClick={() => setShowCompose(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                Compose
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-hidden flex gap-4 px-6 py-4">
            <div className="flex-1 overflow-auto">
              <MessagesList
                messages={filteredMessages}
                selectedMessages={selectedMessages}
                onSelectMessage={handleSelectMessage}
                onToggleSelect={(messageId) => {
                  setSelectedMessages((prev) =>
                    prev.includes(messageId)
                      ? prev.filter((id) => id !== messageId)
                      : [...prev, messageId]
                  );
                }}
                onSelectAll={() => {
                  setSelectedMessages(filteredMessages.map((m) => m.id));
                }}
                onDeselectAll={() => setSelectedMessages([])}
                isLoading={isLoading}
              />
            </div>

            {selectedMessage && (
              <div className="w-96 border-l overflow-auto">
                <MessageDetail
                  message={selectedMessage}
                  onDelete={() => handleDeleteMessage(selectedMessage.id)}
                  onArchive={() => handleArchiveMessage(selectedMessage.id)}
                  onReply={() => setShowCompose(true)}
                />
              </div>
            )}
          </div>

          <TabsContent value="inbox" className="hidden" />
          <TabsContent value="sent" className="hidden" />
          <TabsContent value="drafts" className="hidden" />
          <TabsContent value="archived" className="hidden" />
        </Tabs>
      </div>

      {showCompose && (
        <ComposeModal
          onClose={() => setShowCompose(false)}
          onSend={handleSendMessage}
          replyTo={selectedMessage}
        />
      )}
    </div>
  );
}

// Sample messages data for Edubora
const SAMPLE_MESSAGES = [
  {
    id: 1,
    from: {
      name: "John Kamau",
      email: "john.kamau@email.com",
      role: "Parent",
      avatar: "/parent-avatar.jpg",
    },
    to: [{ name: "Admin", email: "admin@school.com", role: "Admin" }],
    subject: "Inquiry about Grade 5 Mathematics Curriculum",
    message:
      "Dear Admin,\n\nI would like to inquire about the mathematics curriculum for Grade 5. My daughter Mary seems to be struggling with some concepts and I would like to understand what topics will be covered this term so I can provide additional support at home.\n\nThank you for your time.\n\nBest regards,\nJohn Kamau",
    type: "email",
    status: "unread",
    priority: "normal",
    timestamp: "2024-01-16T10:30:00Z",
    direction: "received",
    attachments: [],
  },
  {
    id: 2,
    from: {
      name: "Sarah Kipchoge",
      email: "sarah.kipchoge@school.com",
      role: "Teacher",
      avatar: "/teacher-avatar.jpg",
    },
    to: [{ name: "Admin", email: "admin@school.com", role: "Admin" }],
    subject: "Form 2 Biology Practicals Schedule",
    message:
      "Hi Admin,\n\nI need to schedule the Form 2 Biology practicals for next week. We need access to the science lab on Tuesday and Thursday afternoons. Please confirm availability.\n\nRegards,\nSarah",
    type: "email",
    status: "read",
    priority: "high",
    timestamp: "2024-01-15T14:20:00Z",
    direction: "received",
    attachments: [],
  },
  {
    id: 3,
    from: {
      name: "Admin",
      email: "admin@school.com",
      role: "Admin",
      avatar: "/admin-avatar.png",
    },
    to: [{ name: "All Parents", email: "parents@school.com", role: "Parents" }],
    subject: "Term 1 2024 - Important Dates and Announcements",
    message:
      "Dear Parents,\n\nWe are pleased to share the important dates for Term 1 2024:\n\n- School opens: January 8, 2024\n- Mid-term break: February 16-18, 2024\n- Term ends: March 29, 2024\n\nPlease ensure your child is back on time. For any queries, contact the office.\n\nBest regards,\nSchool Administration",
    type: "email",
    status: "read",
    priority: "high",
    timestamp: "2024-01-08T09:00:00Z",
    direction: "sent",
    attachments: [],
  },
  {
    id: 4,
    from: {
      name: "David Omondi",
      email: "david.omondi@email.com",
      role: "Parent",
      avatar: "/parent-avatar-2.jpg",
    },
    to: [{ name: "Admin", email: "admin@school.com", role: "Admin" }],
    subject: "Fee Payment Plan Request",
    message:
      "Hello,\n\nI would like to request a fee payment plan for my son's tuition. Due to some financial constraints, I cannot pay the full amount upfront. Could we arrange a payment schedule?\n\nThank you,\nDavid Omondi",
    type: "email",
    status: "unread",
    priority: "normal",
    timestamp: "2024-01-16T11:45:00Z",
    direction: "received",
    attachments: [],
  },
  {
    id: 5,
    from: {
      name: "Admin",
      email: "admin@school.com",
      role: "Admin",
      avatar: "/admin-avatar.png",
    },
    to: [
      { name: "All Teachers", email: "teachers@school.com", role: "Teachers" },
    ],
    subject: "Staff Meeting - January 17, 2024",
    message:
      "Dear Staff,\n\nPlease note that there will be a staff meeting on January 17, 2024 at 3:00 PM in the staff room. Topics to be discussed include:\n\n1. Term 1 performance review\n2. Curriculum updates\n3. Student welfare matters\n\nYour attendance is mandatory.\n\nRegards,\nAdministration",
    type: "email",
    status: "read",
    priority: "high",
    timestamp: "2024-01-16T08:30:00Z",
    direction: "sent",
    attachments: [],
  },
  {
    id: 6,
    from: {
      name: "Grace Mwangi",
      email: "grace.mwangi@school.com",
      role: "Teacher",
      avatar: "/teacher-avatar-2.jpg",
    },
    to: [{ name: "Admin", email: "admin@school.com", role: "Admin" }],
    subject: "Student Discipline Case - Form 1B",
    message:
      "Dear Admin,\n\nI am writing to report a discipline case involving a Form 1B student. The student was found with unauthorized materials during class. I have documented the incident and would like to discuss the appropriate action.\n\nPlease advise on the next steps.\n\nBest regards,\nGrace Mwangi",
    type: "email",
    status: "read",
    priority: "high",
    timestamp: "2024-01-14T15:10:00Z",
    direction: "received",
    attachments: [{ name: "incident-report.pdf", size: "245 KB" }],
  },
  {
    id: 7,
    from: {
      name: "Admin",
      email: "admin@school.com",
      role: "Admin",
      avatar: "/admin-avatar.png",
    },
    to: [
      { name: "Form 4 Students", email: "form4@school.com", role: "Students" },
    ],
    subject: "KCSE Examination Timetable Released",
    message:
      "Dear Form 4 Students,\n\nThe KCSE examination timetable has been released by KNEC. Please collect your copy from the office. Examination dates are from March 1-15, 2024.\n\nEnsure you are well-prepared and follow all examination rules and regulations.\n\nBest wishes,\nSchool Administration",
    type: "email",
    status: "read",
    priority: "high",
    timestamp: "2024-01-13T10:00:00Z",
    direction: "sent",
    attachments: [],
  },
  {
    id: 8,
    from: {
      name: "Admin",
      email: "admin@school.com",
      role: "Admin",
      avatar: "/admin-avatar.png",
    },
    to: [{ name: "All Staff", email: "staff@school.com", role: "Staff" }],
    subject: "Draft: Staff Welfare Program 2024",
    message:
      "Dear Team,\n\nThis is a draft message regarding the proposed staff welfare program for 2024. We are considering the following initiatives:\n\n1. Health insurance coverage\n2. Professional development allowance\n3. Annual team building activities\n\nPlease provide feedback by January 20.\n\nRegards,\nAdministration",
    type: "email",
    status: "draft",
    priority: "normal",
    timestamp: "2024-01-16T16:00:00Z",
    direction: "sent",
    attachments: [],
  },
];
