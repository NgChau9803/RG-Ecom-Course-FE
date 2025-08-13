import React from "react";
import Chatbot from "../components/Chatbot";
import ChatSidebar from "../components/ChatSidebar";
import type { Course } from "../types";
import { useLocation } from "react-router-dom";

interface ChatPageProps {
  courses: Course[];
  onSelectCourse: (course: Course, analysis: string) => void;
}

const ChatPage: React.FC<ChatPageProps> = ({ courses, onSelectCourse }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get("q");
  const initialMessage = location.state?.initialMessage || initialQuery;

  return (
    <div className="flex h-[calc(100vh-8rem)] overflow-hidden">
      <div className="w-80 p-4 border-r border-gray-200 dark:border-gray-700">
        <ChatSidebar />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center w-full p-4">
        <div className="w-full h-full max-w-none mx-auto">
          <Chatbot
            courses={courses}
            onSelectCourse={onSelectCourse}
            initialMessage={initialMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
