import React from "react";
import Chatbot from "../components/Chatbot";
import ChatSidebar from "../components/ChatSidebar";
import type { Course } from "../types";
import { useLocation } from "react-router-dom";

/**
 * Props for the ChatPage component.
 * @property {Course[]} courses - An array of available courses.
 * @property {(course: Course, analysis: string) => void} onSelectCourse - Callback function when a course is selected.
 */
interface ChatPageProps {
  courses: Course[];
  onSelectCourse: (course: Course, analysis: string) => void;
}

/**
 * ChatPage component renders the main chat interface.
 * It includes a sidebar for chat history and the main chat window.
 *
 * @param {ChatPageProps} props - The props for the component.
 * @returns {JSX.Element} The rendered ChatPage component.
 */
const ChatPage: React.FC<ChatPageProps> = ({ courses, onSelectCourse }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get("q");
  const initialMessage = location.state?.initialMessage || initialQuery;

  return (
    <div className="flex h-[calc(100vh-8rem)] overflow-hidden">
      {/* Sidebar for chat history and navigation */}
      <div className="w-80 p-4 border-r border-gray-200 dark:border-gray-700">
        <ChatSidebar />
      </div>
      {/* Main chat window */}
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
